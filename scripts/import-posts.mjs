import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

// One-time Hugo migration. Refuse to overwrite existing articles.
const source = path.resolve(process.argv[2] || '');
if (!process.argv[2]) throw new Error('Usage: node scripts/import-posts.mjs <old-repository> [--write]');
const write = process.argv.includes('--write');
const root = path.join(source, 'content/post');
const destination = path.resolve('src/content/posts');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const records = [];
const used = new Set(walk(destination).filter(f => path.basename(f) === 'index.md').map(f => path.basename(path.dirname(f))));
for (const file of walk(root).filter(f => path.basename(f) === 'index.md').sort()) {
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').trimStart().replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter: ${file}`);
  const data = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
  const date = String(data.date).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid date: ${file}`);
  const event = String(data.title).match(/(?:DEIM|BESC|WISS|NTCIR|MIRU|MVA|ISIS|SNL|DIA|ICSIE|ICIET|CHIIR|BigComp|WebDB|DBWS|ERDSE|NICOGRAPH|iiWAS|MoMM|SIGGRAPH|AAI|IDR|NLP|SoC|IR Reading)\s*(?:Asia\s*)?\d*/i);
  const description = event ? event[0].trim().toLowerCase().replace(/\s+/g, '-') : 'lab-news';
  let slug = `${date}-${description}`;
  if (used.has(slug)) slug += `-${path.basename(path.dirname(file))}`;
  if (used.has(slug)) throw new Error(`Duplicate slug: ${slug}`);
  used.add(slug);
  const folder = path.join(destination, date.slice(0, 4), slug);
  const assets = new Map();
  const missingImages = [];
  const addAsset = relative => {
    const decoded = decodeURIComponent(relative).replace(/^\.\//, '');
    const asset = path.resolve(path.dirname(file), decoded);
    if (!asset.startsWith(path.dirname(file) + path.sep) || !fs.existsSync(asset)) throw new Error(`Missing/invalid asset: ${file}: ${relative}`);
    assets.set(decoded, { source: asset, sha256: hash(asset) });
    return './' + decoded.split('/').map(s => encodeURIComponent(s).replaceAll('(', '%28').replaceAll(')', '%29')).join('/');
  };
  let body = match[2].replace(/<!--[\s\S]*?-->/g, '').trim();
  body = body.replace(/\{\{<\s*gallery\s*>\}\}/g, () => {
    const gallery = path.join(path.dirname(file), 'gallery');
    if (!fs.existsSync(gallery)) throw new Error(`Missing gallery: ${file}`);
    return walk(gallery).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f)).sort().map(f => `![${data.title}の写真](${addAsset(path.relative(path.dirname(file), f).replaceAll('\\', '/'))})`).join('\n\n');
  });
  if (/\{\{[<%]/.test(body)) throw new Error(`Unsupported Hugo syntax: ${file}`);
  body = body.replace(/(!?\[[^\]]*\]\()([^\s)]+)([^)]*\))/g, (whole, prefix, url, suffix) => {
    if (/^(?:https?:|mailto:|#)/i.test(url)) return whole;
    if (prefix.startsWith('!') && !fs.existsSync(path.resolve(path.dirname(file), decodeURIComponent(url)))) {
      missingImages.push(url);
      return '';
    }
    return prefix + addAsset(url) + suffix;
  });
  const featured = fs.readdirSync(path.dirname(file)).find(f => /^featured\.(jpg|jpeg|png|webp|gif)$/i.test(f));
  if (featured && !assets.has(featured)) body = `![${data.title}の写真](${addAsset(featured)})\n\n${body}`;
  const metadata = { title: data.title, description: String(data.summary || data.title), publishedDate: date, tags: data.tags || [], draft: data.draft === true };
  const output = `---\n${yaml.dump(metadata, { lineWidth: -1, quotingType: '"' })}---\n\n${body}\n`;
  records.push({ source: path.relative(source, file).replaceAll('\\', '/'), sourceSha256: hash(file), slug, date, title: data.title, draft: metadata.draft, missingImages, images: [...assets].map(([name, a]) => ({ name, sha256: a.sha256 })) });
  if (write) {
    if (fs.existsSync(folder)) throw new Error(`Destination exists: ${folder}`);
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'index.md'), output);
    for (const [name, asset] of assets) {
      const target = path.join(folder, name);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(asset.source, target);
    }
  }
}
const commit = execFileSync('git', ['-c', `safe.directory=${source.replaceAll('\\', '/')}`, '-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (write) fs.writeFileSync('docs/posts-migration-manifest.json', JSON.stringify({ repository: 'https://github.com/ohshimalab/ohshimalab.github.io', commit, records }, null, 2) + '\n');
console.log(JSON.stringify({ articles: records.length, images: records.reduce((n, r) => n + r.images.length, 0), drafts: records.filter(r => r.draft).length, write }));
console.log(JSON.stringify(records.filter(r => r.missingImages.length).map(r => ({ source: r.source, missing: r.missingImages }))));

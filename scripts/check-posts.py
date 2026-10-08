"""Verify migrated articles and locally built image/link targets."""
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.images = []
        self.image_attrs = []
        self.text = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'img':
            self.images.append(attrs['src'])
            self.image_attrs.append(attrs)

    def handle_data(self, data):
        self.text.append(data)


manifest = json.loads(Path('docs/posts-migration-manifest.json').read_text(encoding='utf-8'))
index = Page(Path('dist/posts/index.html').read_text(encoding='utf-8'))
records = manifest['records']
assert len(records) == 121
slugs = [r['slug'] for r in records]
assert len(set(slugs)) == len(slugs)
image_count = 0
for record in records:
    folder = Path('src/content/posts') / record['date'][:4] / record['slug']
    html = Path('dist/posts') / record['slug'] / 'index.html'
    page = Page(html.read_text(encoding='utf-8'))
    assert record['title'] in ''.join(page.text), record['slug']
    assert any(link.endswith('/posts/' + record['slug'] + '/') for link in index.links), record['slug']
    assert '{{<' not in html.read_text(encoding='utf-8'), record['slug']
    for image in record['images']:
        assert hashlib.sha256((folder / image['name']).read_bytes()).hexdigest() == image['sha256'], image
    image_count += len(record['images'])
    assert len(page.images) >= len(record['images']), record['slug']
for html in Path('dist/posts').rglob('index.html'):
    page = Page(html.read_text(encoding='utf-8'))
    for url in page.images + page.links:
        parsed = urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        route = unquote(parsed.path).removeprefix('/ohshimalab-new.github.io/')
        target = Path('dist') / route if parsed.path.startswith('/') else html.parent / route
        assert target.is_file() or (target / 'index.html').is_file(), (html, url)
assert len(list(Path('dist/posts').glob('*/index.html'))) == 130
thumbnails = [p for p in Path('src/content/posts').rglob('index.md') if '\nthumbnail:' in p.read_text(encoding='utf-8')]
assert len(index.images) == len(thumbnails), (len(index.images), len(thumbnails))
for image in index.image_attrs:
    assert 'alt' in image and not image['alt'] and image['loading'] == 'lazy'
    # Astro caps candidates at the original width instead of enlarging small images.
    widths = [int(candidate.strip().split()[1].removesuffix('w')) for candidate in image['srcset'].split(',')]
    assert widths and all(0 < width <= 400 for width in widths), image
    for candidate in image['srcset'].split(','):
        url = candidate.strip().split()[0]
        target = Path('dist') / unquote(url).removeprefix('/ohshimalab-new.github.io/')
        assert target.is_file(), url
print(f'Verified: {len(thumbnails)} thumbnails with responsive images and lazy loading')
print(f'Verified: {len(records)} migrated articles, {image_count} source images, 130 article routes and local image/link targets')

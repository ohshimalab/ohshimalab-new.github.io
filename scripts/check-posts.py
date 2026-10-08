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
        self.text = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'img':
            self.images.append(attrs['src'])

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
print(f'Verified: {len(records)} migrated articles, {image_count} source images, 130 article routes and local image/link targets')

"""Run after build from the project root. Uses only Python's standard library."""
import json
from pathlib import Path
from html.parser import HTMLParser

data = json.loads(Path('src/data/publications.json').read_text(encoding='utf-8'))
records = {r['id']: r for r in data['records']}

class Check(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.anchors, self.seen = set(), [], []
        self.groups, self.dates = {}, []
        self.category, self.record, self.field = None, None, None
        self.number, self.parts = 1, []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            assert a['id'] not in self.ids
            self.ids.add(a['id'])
        if tag == 'a' and a.get('href', '').startswith('#'):
            self.anchors.append(a['href'][1:])
        if a.get('class') == 'publication-group':
            assert self.dates == sorted(self.dates, reverse=True)
            self.category, self.number, self.dates = a['id'], 1, []
            self.groups[self.category] = 0
        if tag == 'ol':
            assert int(a['start']) == self.number
        if tag == 'li' and a.get('id', '').startswith('publication-'):
            key = a['id'].removeprefix('publication-')
            self.record = records[key]
            assert self.record['category'] == self.category
            self.seen.append(key)
            self.number += 1
            self.groups[self.category] += 1
            r = self.record
            self.dates.append((r['year'], r['month'] or 0, r['day'] or 0))
        if tag == 'p' and a.get('class') in ('paper-title', 'authors'):
            self.field = 'title' if a['class'] == 'paper-title' else 'authors'
            self.parts = []

    def handle_data(self, text):
        if self.field:
            self.parts.append(text)

    def handle_endtag(self, tag):
        if tag == 'p' and self.field:
            assert ''.join(self.parts) == self.record[self.field]
            self.field = None

check = Check()
check.feed(Path('dist/publications/index.html').read_text(encoding='utf-8'))
assert check.dates == sorted(check.dates, reverse=True)
assert len(check.seen) == len(set(check.seen)) == len(records)
assert set(check.seen) == set(records)
assert all(anchor in check.ids for anchor in check.anchors)
print('PASS: all entries, titles, authors, categories, dates, numbering and anchors', check.groups)

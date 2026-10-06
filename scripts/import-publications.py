"""Read the research-outputs summary workbooks and export public bibliographic data.

Usage: python scripts/import-publications.py C:/usr/Dev/research-outputs/!summary
Requires openpyxl. The input workbooks are never modified.
"""
import hashlib
import json
import sys
from pathlib import Path

import openpyxl

SOURCE = Path(sys.argv[1])
DEST = Path(__file__).resolve().parents[1] / 'src/data/publications.json'
SOURCES = [('1論文誌.xlsx', 'journals'), ('2国際会議.xlsx', 'conferences'),
           ('3国内会議.xlsx', 'domestic'), ('4国内講演.xlsx', 'talks')]


def text(value):
    return '' if value is None or isinstance(value, bool) else str(value).strip()


def first(row, *keys):
    return next((text(row.get(key)) for key in keys if text(row.get(key))), '')


records, sources = [], []
for filename, category in SOURCES:
    path = SOURCE / filename
    book = openpyxl.load_workbook(path, read_only=True, data_only=True)
    count = 0
    for sheet in book:
        rows = iter(sheet.values)
        headers = [text(v).lower() for v in next(rows)]
        for number, cells in enumerate(rows, 2):
            if not any(v is not None for v in cells):
                continue
            row = dict(zip(headers, cells))
            title = first(row, 'title', 'title_ja', 'title_en')
            if not title or not row.get('id') or not row.get('date_year'):
                raise ValueError(f'Incomplete record: {filename}/{sheet.title}/{number}')
            def flag(key):
                value = row.get(key)
                if value is not None and not isinstance(value, bool):
                    raise ValueError(f'Invalid {key}: {row["id"]}')
                return value
            records.append(dict(
                id=text(row['id']), category=category, title=title,
                authors=first(row, 'authors', 'authors_ja', 'authors_en'),
                year=int(row['date_year']), month=int(row['date_month']) if row.get('date_month') else None,
                day=int(row['date_day']) if row.get('date_day') else None,
                venue=first(row, 'journal_ja', 'journal_en', 'conference_name', 'workshop_name'),
                abbreviation=first(row, 'journal_abbrev', 'conference_abbrev', 'workshop_abbrev'),
                volume=text(row.get('vol')), issue=text(row.get('no')), pages=text(row.get('page')),
                series=text(row.get('lncs')), doi=text(row.get('doi')), url=text(row.get('url')),
                reviewed=flag('reviewed'), invited=flag('invited'), award=text(row.get('award')),
            ))
            count += 1
    book.close()
    sources.append(dict(file=filename, count=count, sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
ids = [r['id'] for r in records]
if len(ids) != len(set(ids)):
    raise ValueError('Duplicate publication IDs')
records.sort(key=lambda r: (-r['year'], -(r['month'] or 0), -(r['day'] or 0), r['id']))
DEST.write_text(json.dumps(dict(sources=sources, records=records), ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(sources, ensure_ascii=False))

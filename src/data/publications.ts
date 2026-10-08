import data from './publications.json';
export type Publication = (typeof data.records)[number];
export const publicationGroups = [
  { id: 'journals', title: '論文誌', english: 'Journal articles' },
  { id: 'conferences', title: '国際会議', english: 'International conferences' },
  { id: 'domestic', title: '国内会議', english: 'Domestic conferences' },
  { id: 'talks', title: '国内講演', english: 'Talks' },
].map(group => {
  const papers = data.records.filter(p => p.category === group.id)
    .sort((a, b) => b.year - a.year || (b.month ?? 0) - (a.month ?? 0) || (b.day ?? 0) - (a.day ?? 0) || a.id.localeCompare(b.id));
  let start = 1;
  const years = [...new Set(papers.map(p => p.year))].map(year => {
    const entries = papers.filter(p => p.year === year);
    const result = { year, start, papers: entries };
    start += entries.length;
    return result;
  });
  return { ...group, papers, years };
}).filter(group => group.papers.length);

export function publicationDate(p: Publication) {
  return `${p.year}年${p.month ? `${p.month}月` : ''}`;
}
export function publicationDetails(p: Publication) {
  return [p.venue,
    p.category !== 'journals' && p.abbreviation && !p.venue.includes(p.abbreviation) ? `(${p.abbreviation})` : '',
    p.series, p.volume ? `Vol. ${p.volume}` : '', p.issue ? `No. ${p.issue}` : '',
    // Article IDs and full citations must not be mistaken for page ranges.
    /^\d+\s*[-–]\s*\d+$/.test(p.pages) ? `pp. ${p.pages}` : p.pages,
  ].filter(Boolean).join(', ');
}
export function publicationLinks(p: Publication) {
  const links: { label: string; url: string }[] = [];
  const doi = p.doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
  if (/^10\.\d{4,9}\//.test(doi)) links.push({ label: 'DOI', url: `https://doi.org/${doi}` });
  if (/^https?:\/\//i.test(p.url) && !links.some(link => link.url === p.url)) links.push({ label: '関連ページ', url: p.url });
  return links;
}

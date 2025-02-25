export interface ISelectedData {
  title: string;
  artist_title: string;
  image_id: string;
  url?: string;
}

export const downloadCsv = (
  selectedCards: ISelectedData[],
  filename?: string
) => {
  if (selectedCards.length === 0) {
    alert('No data');
    return;
  }

  const headers = ['name', 'artist', 'image_id', 'url'];
  const csvRows = selectedCards.map((card) => [
    card.title,
    card.artist_title,
    card.image_id,
    `https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`,
  ]);

  const csvContent = [
    headers.join(','),
    ...csvRows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${selectedCards.length}_artworks.csv`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

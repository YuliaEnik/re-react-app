import { stringify } from 'csv-stringify/browser/esm';
import { saveAs } from 'file-saver';

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
  const csvData = selectedCards.map((card) => ({
    name: card.title,
    artist: card.artist_title,
    image_id: card.image_id,
    url: `https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`,
  }));

  stringify(csvData, { header: true }, (err, output) => {
    if (err) {
      console.error('Error generating CSV:', err);
      alert('Failed to create CSV file.');
      return;
    }

    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });

    const finalFilename = filename || `${selectedCards.length}_artworks.csv`;

    saveAs(blob, finalFilename);
  });
};

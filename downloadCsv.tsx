import { stringify } from 'csv-stringify';
import { saveAs } from 'file-saver';

export const downloadCsv = (selectedCards, filename) => {
  stringify(selectedCards, { header: true }, (err, output) => {
    if (err) {
      console.error('Error generating CSV:', err);
      return;
    }
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  });
};

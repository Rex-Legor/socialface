const download = (data: string) => {
  const blob = new Blob([data], { type: 'text/csv' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = 'download.csv';

  a.click();
};

const csvmaker = (data: object) => {
  const headers = Object.keys(data);

  const values = Object.values(data);

  return [headers.join(','), values.join(',')].join('\n');
};

export const exportCsv = async (dataToExport: object) => {
  const csvdata = csvmaker(dataToExport);
  download(csvdata);
};

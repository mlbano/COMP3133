const fs = require('fs');
const csv = require('csv-parser');

// Function to filter and write data to a file
function filterAndWriteData(inputFile, outputFile, filterCountry) {
  const writeStream = fs.createWriteStream(outputFile);
  fs.unlink(outputFile, (err) => {
    if (err) console.log(`${outputFile} does not exist`);
  });

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === filterCountry.toLowerCase()) {
        writeStream.write(`${row.country},${row.year},${row.population}\n`);
      }
    })
    .on('end', () => {
      writeStream.end();
      console.log(`Filtered data for ${filterCountry} written to ${outputFile}`);
    });
}

// Delete existing files if they exist
fs.unlink('canada.txt', (err) => {
  if (err) console.log('canada.txt does not exist');
});
fs.unlink('usa.txt', (err) => {
  if (err) console.log('usa.txt does not exist');
});

// Filter and write data for Canada and USA
filterAndWriteData('input_countries.csv', 'canada.txt', 'canada');
filterAndWriteData('input_countries.csv', 'usa.txt', 'united states');
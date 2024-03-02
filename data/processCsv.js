import fs from 'fs';
import csv from 'fast-csv';

const output = [];
const csvStream = csv.format({ headers: true });

// Pipe the CSV file input stream to the CSV parser
fs.createReadStream('raw_data.csv')
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
        // Remove the first two columns
        row.LogError = row.RelativeError;
        delete row.RelativeError;
        delete row.UserName;
        delete row.AnswerTime;
        // Push the updated row to the output array
        output.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
        // Write the updated data to a new CSV file
        const writeStream = fs.createWriteStream('clean_data.csv');
        csvStream.pipe(writeStream);
        output.forEach((row) => {
            csvStream.write(row);
        });
        csvStream.end();
    });

import fs from 'fs';
import csv from 'fast-csv';

const output = [];
const csvStream = csv.format({ headers: true });

// Pipe the CSV file input stream to the CSV parser
fs.createReadStream('raw_data.csv')
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
        // Calculate the error
        const error = Math.log2(1 + Math.abs((parseInt(row.UserAnswer) - parseInt(row.CorrectAnswer)) / 8));
        // Set log-base-2 error to 0 for exact guesses
        if (parseInt(row.UserAnswer) === parseInt(row.CorrectAnswer)) {
            row.LogError = 0;
        } else {
            row.LogError = error;
        }
        // Remove the first two columns
        delete row.UserID;
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

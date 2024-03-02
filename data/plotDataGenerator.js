import fs from 'fs';
import csv from 'fast-csv';
import _ from 'lodash';

// Function to import data from CSV
function importDataFromCSV(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', row => data.push(row))
            .on('end', () => resolve(data));
    });
}

// Function to calculate confidence intervals using bootstrapping
function calculateConfidenceIntervals(data, numIterations, confidenceLevel) {
    const logErrors = data;
    const numSamples = logErrors.length;
    const sampleMeans = [];

    // Perform bootstrap resampling
    for (let i = 0; i < numIterations; i++) {
        const resampledLogErrors = [];
        for (let j = 0; j < numSamples; j++) {
            const randomIndex = Math.floor(Math.random() * numSamples);
            resampledLogErrors.push(logErrors[randomIndex]);
        }
        const sampleMean = _.mean(resampledLogErrors);
        sampleMeans.push(sampleMean);
    }

    // Calculate confidence intervals
    sampleMeans.sort((a, b) => a - b);
    const lowerBoundIndex = Math.floor((1 - confidenceLevel) / 2 * numIterations);
    const upperBoundIndex = Math.ceil((1 + confidenceLevel) / 2 * numIterations);
    const lowerBound = sampleMeans[lowerBoundIndex];
    const upperBound = sampleMeans[upperBoundIndex];

    return [lowerBound, upperBound];
}

// Usage
const filePath = 'clean_data.csv';
const numIterations = 1000; // Number of bootstrap resampling iterations
const confidenceLevel = 0.95; // Confidence level for confidence intervals

importDataFromCSV(filePath)
    .then(data => {
        // Group data by QuestionNumber and calculate mean LogError
        const groupedData = _.groupBy(data, 'QuestionNumber');
        const visualizationNames = [];
        const means = [];
        const lowerBounds = [];
        const upperBounds = [];

        for (const key in groupedData) {
            const logErrors = groupedData[key].map(row => parseFloat(row.LogError));
            const meanLogError = _.mean(logErrors);
            const [lowerBound, upperBound] = calculateConfidenceIntervals(logErrors, numIterations, confidenceLevel);
            console.log(`Question ${key}: Mean LogError = ${meanLogError}, 95% CI = [${lowerBound}, ${upperBound}]`)

            visualizationNames.push(`Visualization ${key}`);
            means.push(meanLogError);
            lowerBounds.push(meanLogError - lowerBound);
            upperBounds.push(upperBound - meanLogError);
        }

        // Output data to console
        const outputData = {
            visualizationNames,
            means,
            lowerBounds,
            upperBounds
        };
        fs.writeFile('output.json', JSON.stringify(outputData, null, 2), (err) => {
            if (err) {
            console.error('Error writing to JSON:', err);
            } else {
            console.log('Data successfully written to output.json');
            }
        });
    })
    .catch(error => console.error('Error reading CSV:', error));

export { importDataFromCSV };

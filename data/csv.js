import { createWriteStream } from 'fs';
import { format } from 'fast-csv';
import { getAllUserRecords } from '../client/src/client/api/db.js';

async function fetchDataForAllUsers() {
    try {
        return await getAllUserRecords();
    } catch (error) {
        console.error("Error fetching data for all users:", error);
        return [];
    }
}


async function writeToCSV(usersData) {
    const csvStream = format({ headers: true });
    const writableStream = createWriteStream('raw_data.csv');

    csvStream.pipe(writableStream);

    usersData.forEach(user => {
        Object.keys(user.answers).forEach(questionNumber => {
            const answer = user.answers[questionNumber];
            csvStream.write({
                UserID: user.id,
                UserName: user.displayName,
                QuestionNumber: questionNumber,
                UserAnswer: answer.userAnswer,
                CorrectAnswer: answer.correctAnswer,
                ActualError: answer.actualError,
                RelativeError: answer.relativeError,
                AnswerTime: answer.answerTime
            });
        });
    });

    csvStream.end();

    return new Promise((resolve, reject) => {
        writableStream.on('finish', resolve);
        writableStream.on('error', reject);
    });
}

async function main() {
    const usersData = await fetchDataForAllUsers();
    writeToCSV(usersData);
}

main();

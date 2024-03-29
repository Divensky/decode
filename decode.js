const fs = require('fs');

async function readFile() {
  try {
    return await fs.promises.readFile('input.txt', 'utf-8');
  } catch (err) {
    console.error('Error reading file', err);
    return null;
  }
}

function parseData(data) {
  const lines = data
    .trim()
    .split('\n')
    .map((line) => line.trim());
  const parsedData = lines.map((line) => {
    const [nbr, word] = line.split(' ');
    return { nbr: parseInt(nbr), word };
  });
  return parsedData;
}

function sortData(data) {
  return data.sort((a, b) => a.nbr - b.nbr);
}

function selectRelevantData(data) {
  let step = 1;
  let currentIndex = 0;
  let result = [];
  while (data.length >= currentIndex) {
    result[step - 1] = data[currentIndex];
    step++;
    currentIndex += step;
  }
  return result;
}

function convertToString(lines) {
  let result = '';
  lines.map((line) => (result += line.word + ' '));
  return result;
}

async function decodeMessage() {
  const message = await readFile();
  if (!message) {
    return;
  }
  const parsedMessage = parseData(message);
  const sortedMessage = sortData(parsedMessage);
  const selectedLines = selectRelevantData(sortedMessage);
  const decodedMessage = convertToString(selectedLines);
  console.log('decodedMessage', decodedMessage);
  return decodedMessage;
}

decodeMessage();

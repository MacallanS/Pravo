function caesarCipher(text, shift) {
    // Расширенный алфавит, включая 'ъ' и 'ь'
    const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    const alphabetUpper = alphabet.toUpperCase();
    const shiftedText = [];
    const alphabetLength = alphabet.length;

    for (let char of text) {
        if (alphabet.includes(char)) {
            let index = (alphabet.indexOf(char) + shift) % alphabetLength;
            if (index < 0) index += alphabetLength; // Для обработки отрицательных индексов
            shiftedText.push(alphabet[index]);
        } else if (alphabetUpper.includes(char)) {
            let index = (alphabetUpper.indexOf(char) + shift) % alphabetLength;
            if (index < 0) index += alphabetLength; // Для обработки отрицательных индексов
            shiftedText.push(alphabetUpper[index]);
        } else {
            shiftedText.push(char); // Не изменяем символы, которые не входят в алфавит
        }
    }
    return shiftedText.join('');
}

function encryptCaesar() {
    const inputText = document.getElementById('caesarInput').value;
    const key = parseInt(document.getElementById('caesarKey').value) || 0;
    const encryptedText = caesarCipher(inputText, key);
    document.getElementById('caesarOutput').textContent = encryptedText;
}

function decryptCaesar() {
    const inputText = document.getElementById('caesarInput').value;
    const key = parseInt(document.getElementById('caesarKey').value) || 0;
    const decryptedText = caesarCipher(inputText, -key);
    document.getElementById('caesarOutput').textContent = decryptedText;
}


function transposeText(text, key) {
    const keyLength = key.length;
    const textLength = text.length;
    const numRows = Math.ceil(textLength / keyLength);
    const grid = Array.from({ length: numRows }, () => Array(keyLength).fill(''));

    // Заполнение решетки
    let textIndex = 0;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < keyLength; col++) {
            if (textIndex < textLength) {
                grid[row][col] = text[textIndex++];
            }
        }
    }

    // Определение порядка столбцов по ключу
    const sortedColumns = key
        .split('')
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);

    // Создание зашифрованного текста
    let result = '';
    for (const col of sortedColumns) {
        for (let row = 0; row < numRows; row++) {
            result += grid[row][col];
        }
    }

    return result;
}

function reverseTransposeText(text, key) {
    const keyLength = key.length;
    const textLength = text.length;
    const numRows = Math.ceil(textLength / keyLength);
    const numCols = keyLength;

    // Определение порядка столбцов по ключу
    const sortedColumns = key
        .split('')
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);

    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));

    // Заполнение решетки с учетом порядка столбцов
    let textIndex = 0;
    for (const col of sortedColumns) {
        for (let row = 0; row < numRows; row++) {
            if (textIndex < textLength) {
                grid[row][col] = text[textIndex++];
            }
        }
    }

    // Чтение текста по строкам
    let result = '';
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            result += grid[row][col];
        }
    }

    return result;
}

function applyTransposition() {
    const inputText = document.getElementById('transpositionInput').value;
    const key = document.getElementById('transpositionKey').value;
    const transposedText = transposeText(inputText, key);
    document.getElementById('transpositionOutput').textContent = transposedText;
}

function reverseTransposition() {
    const inputText = document.getElementById('transpositionInput').value;
    const key = document.getElementById('transpositionKey').value;
    const reversedText = reverseTransposeText(inputText, key);
    document.getElementById('transpositionOutput').textContent = reversedText;
}



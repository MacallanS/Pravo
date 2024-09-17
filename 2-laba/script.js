function caesarCipher(text, shift) {
    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщыэюя';
    const alphabetUpper = alphabet.toUpperCase();
    const shiftedText = [];

    for (let char of text) {
        if (alphabet.includes(char)) {
            let index = (alphabet.indexOf(char) + shift) % 33;
            if (index < 0) index += 33; 
            shiftedText.push(alphabet[index]);
        } else if (alphabetUpper.includes(char)) {
            let index = (alphabetUpper.indexOf(char) + shift) % 33;
            if (index < 0) index += 33; 
            shiftedText.push(alphabetUpper[index]);
        } else {
            shiftedText.push(char);
        }
    }
    return shiftedText.join('');
}

function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const key = parseInt(document.getElementById('key').value) || 0;
    const encryptedText = caesarCipher(inputText, key);
    document.getElementById('outputText').innerText = encryptedText; // используем innerText для вывода результата
}

function decryptText() {
    const inputText = document.getElementById('inputText').value;
    const key = parseInt(document.getElementById('key').value) || 0;
    const decryptedText = caesarCipher(inputText, -key);
    document.getElementById('outputText').innerText = decryptedText; // используем innerText для вывода результата
}

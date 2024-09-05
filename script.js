/* Функция для проверки, является ли число простым */
function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}

/* Функция для вычисления модульного экспоненцирования */
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    
    return result;
}

/* Основная функция для расчета */
function calculate() {
    const n = parseInt(document.getElementById('n').value);
    const g = parseInt(document.getElementById('g').value);

    /* Проверка корректности введенных данных */
    if (isNaN(n) || isNaN(g)) {
        alert("Пожалуйста, введите числовые значения для n и g.");
        return;
    }

    if (n <= 1 || g <= 1) {
        alert("Значения n и g должны быть больше 1.");
        return;
    }

    if (!isPrime(n)) {
        alert("Число n должно быть простым.");
        return;
    }

    /* Значения для вычислений */
    const numberInGroup = 22;
    const XA = numberInGroup * 2 + 3; // Секретное значение A
    const XB = 60; // Секретное значение B

    /* Вычисляем открытые значения */
    const YA = modExp(g, XA, n);
    const YB = modExp(g, XB, n);

    /* Вычисляем секретные ключи */
    const KA = modExp(YB, XA, n);
    const KB = modExp(YA, XB, n);

    /* Формирование текста результата */
    let resultText = `
        <p><strong>Открытое значение YA для абонента A:</strong> ${YA}</p>
        <p><strong>Открытое значение YB для абонента B:</strong> ${YB}</p>
        <p><strong>Секретный ключ K_A (вычисленный A):</strong> ${KA}</p>
        <p><strong>Секретный ключ K_B (вычисленный B):</strong> ${KB}</p>
    `;

    /* Проверяем совпадение секретных ключей */
    if (KA === KB) {
        resultText += `<p><strong>Успех!</strong> Секретные ключи совпадают и равны: ${KA}</p>`;
    } else {
        resultText += `<p><strong>Ошибка!</strong> Секретные ключи не совпадают.</p>`;
    }

    /* Выводим результат на страницу */
    document.getElementById('result').innerHTML = resultText;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
}
function generateTable() {
    if (!checkDomElements() || !isDigit()) {
        return false;
    }

    const table = document.getElementById('table');

    table.style.width = document.getElementById('num1').value + 'px';
    table.style.height = document.getElementById('num2').value + 'px';
    table.style.backgroundColor = randomColor();
}

function checkDomElements() {
    const requiredElements = ['num1', 'num2', 'table'];
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error(`ошибка: ${missingElements.join(', ')}`);
        return false;
    }

    return true;
}

function isDigit() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;

    if ((/^\d+$/.test(num1) && /^\d+$/.test(num2)) || (num1 === '' || num2 === '')) {
        return true;
    }

    console.error(`ошибка: некорректное значение input`);
    return false;
}
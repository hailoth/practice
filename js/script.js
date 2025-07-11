function randomColor() {
    let colorSymbols = '0123456789ABCDEF'
    let colorCode ='#';
    for (let i = 0; i < 6; i++) {
        colorCode+=colorSymbols[Math.round(Math.random()*16)];
    }
    return colorCode;
}
function generateTable() {
    if (!checkDomElements()) {
        return false;
    }

    let table = document.getElementById('table');

    table.style.width=document.getElementById('num1').value+'px';
    table.style.height=document.getElementById('num2').value+'px';
    table.style.backgroundColor = randomColor();
}

function checkDomElements() {
    if (document.getElementById('num1')
        && document.getElementById('num2')
        && document.getElementById('table')) {
        return true;
    }
    else
        return false;
}
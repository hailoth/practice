async function generateTable() {

    if (!checkDomElements()) {
        return false;
    }

    clearTable();

    let response = await fetch("https://exercise.develop.maximaster.ru/service/products/");
    let result = (await response.json());

    if (!(response.ok)) {
        alert("Ошибка HTTP: " + response.status);
        return false;
    }

    for (let i=1;i<result.length+1;i++) {
        result[i-1].id=i;
        result[i-1].sum=Number(result[i-1].price)*Number(result[i-1].quantity);
    }

    const table = document.getElementById('table');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    for (let i=0;i<result.length;i++) {
        if ((result[i].price>=setMinValue(minPrice)) && (result[i].price<=setMaxValue(maxPrice))) {
            let row = table.insertRow();
            row.insertCell().textContent = result[i].id;
            row.insertCell().textContent = result[i].name;
            row.insertCell().textContent = result[i].quantity;
            row.insertCell().textContent = result[i].price;
            row.insertCell().textContent = result[i].sum;
        }
    }
    document.body.appendChild(table);
}

function clearTable() {
    const table = document.getElementById('table');
    const rows = table.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }
}

function setMinValue(min) {
    let minValue;

    if (min.value=="" || min.value==0) {
        minValue = -1;
    }
    else {
        minValue = min.value;
    }

    return minValue;
}

function setMaxValue(max) {
    let maxValue;

    if (max.value=="" || max.value==0) {
        maxValue = Number.POSITIVE_INFINITY;
    }
    else {
        maxValue = max.value;
    }

    return maxValue;
}

function checkDomElements() {
    if (document.getElementById('minPrice')
        && document.getElementById('maxPrice')
        && document.getElementById('table')) {
        return true;
    }
    else
        return false;
}
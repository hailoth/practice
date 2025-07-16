async function generateTable() {

    if (!checkDomElements()) {
        return false;
    }

    clearTable();

    let response = await fetch("https://exercise.develop.maximaster.ru/service/products/");

    if (!(response.ok)) {
        alert("Ошибка HTTP: " + response.status);
        return false;
    }

    let result = (await response.json());

    for (let i = 1; i < result.length + 1; i++) {
        result[i - 1].id = i;
        result[i - 1].sum = Number(result[i - 1].price) * Number(result[i - 1].quantity);
    }

    const processedData = result.map((item, index) => ({
        ...item,
        id: index + 1,
        sum: Number(item.price) * Number(item.quantity)
    }));

    const table = document.getElementById('table');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    const minPriceValue = setMinValue(minPrice);
    const maxPriceValue = setMaxValue(maxPrice);

    const filteredData = processedData.filter(item =>
        item.price >= minPriceValue && item.price <= maxPriceValue
    );

    if (filteredData.length === 0) {
        alert('Нет данных, соответствующих фильтру');
        return;
    }

    filteredData.forEach(item => {
        const row = table.insertRow();
        const cells = [
            item.id,
            item.name,
            item.quantity,
            item.price.toFixed(2),
            item.sum.toFixed(2)
        ];

        cells.forEach(cellValue => {
            row.insertCell().textContent = cellValue;
        });
    });
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

    if (min.value == "" || min.value == 0) {
        minValue = -1;
    } else {
        minValue = min.value;
    }

    return minValue;
}

function setMaxValue(max) {
    let maxValue;

    if (max.value == "" || max.value == 0) {
        maxValue = Number.POSITIVE_INFINITY;
    } else {
        maxValue = max.value;
    }

    return maxValue;
}

function checkDomElements() {

    const requiredElements = ['minPrice', 'maxPrice', 'table'];
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error(`ошибка: ${missingElements.join(', ')}`);
        return false;
    }

    return true;
}
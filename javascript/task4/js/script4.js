const maxData = 10;

let cpuData = [];
let labels = [];
let totalRequests = 0;
let errorRequests = 0;
let lastValidValue = 0;

setInterval(processData, 5000);
processData();

const ctx = document.getElementById('Chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: '% загрузки процессора',
            data: cpuData,
            borderColor: 'rgb(75, 75, 75)',
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        },
    }
});

function updateStats() {
    document.getElementById('totalRequests').textContent = totalRequests;
    let errorRate=0;
    if (totalRequests > 0) {
        errorRate = Math.round((errorRequests / totalRequests) * 100);
    }
    document.getElementById('errorRate').textContent = errorRate;
}

async function getData() {
    totalRequests++;
    let response = await fetch("https://exercise.develop.maximaster.ru/service/cpu/");
    if (!response.ok) {
        errorRequests++;
        return 0;
    }

    const data = await response.json();

    if (Number(data) === 0) {
        errorRequests++;
        return 0;
    }

    return Number(data);
}

async function processData() {
    const newValue = await getData();
    let valueToAdd = newValue;

    if (newValue === 0) {
        valueToAdd = lastValidValue;
    } else {
        lastValidValue = newValue;
    }

    cpuData.push(valueToAdd);
    labels.push(totalRequests);

    if (cpuData.length > maxData) {
        cpuData.shift();
        labels.shift();
    }

    chart.update();
    updateStats();
}
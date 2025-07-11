async function generate_table() {
    clear_table();
    let response = await fetch("https://exercise.develop.maximaster.ru/service/products/");
    let result = (await response.json());
    for (let i=1;i<result.length+1;i++) {
        result[i-1].id=i;
        result[i-1].sum=Number(result[i-1].price)*Number(result[i-1].quantity);
    }
    const table = document.getElementById('table');
    const minprice = document.getElementById('minprice');
    const maxprice = document.getElementById('maxprice');

    let mini,maxi;

    if (minprice.value=="" || minprice.value==0) {
        mini = -1;
    }
    else {
        mini = minprice.value;
    }

    if (maxprice.value=="" || maxprice.value==0) {
        maxi = Number.POSITIVE_INFINITY;
    }
    else {
        maxi = maxprice.value;
    }
        for (let i=0;i<result.length;i++) {
            if ((result[i].price>=mini) && (result[i].price<=maxi)) {
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

function clear_table() {
    const table = document.getElementById('table');
    const rows = table.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }
}
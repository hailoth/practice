document.addEventListener('DOMContentLoaded', function() {
    loadTableData();

    CellEdit();
    document.getElementById('addCol').addEventListener('click', addCol);
    document.getElementById('delCol').addEventListener('click', delCol);
    document.getElementById('addRow').addEventListener('click', addRow);
    document.getElementById('delRow').addEventListener('click', delRow);
});

function CellEdit() {
    const table = document.getElementById('table');
    const cells = table.getElementsByTagName('td');

    for (let cell of cells) {
        cell.addEventListener('dblclick', function() {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = this.textContent;
            this.appendChild(input);
            input.focus();

            input.addEventListener('blur', function() {
                const cell = this.parentNode;
                cell.textContent = this.value;
                saveTableData();
            });

            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    this.blur();
                }
            });
        });
    }
}

function saveTableData() {
    const table = document.getElementById('table');
    const data = [];

    for (let row of table.rows) {
        const rowData = [];
        for (let cell of row.cells) {
            rowData.push(cell.textContent);
        }
        data.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadTableData() {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const table = document.getElementById('table');

        for (let i = 0; i < data.length && i < table.rows.length; i++) {
            for (let j = 0; j < data[i].length && j < table.rows[i].cells.length; j++) {
                table.rows[i].cells[j].textContent = data[i][j];
            }
        }
    }
}

function addCol() {
    const table = document.getElementById('table');

    for (let row of table.rows) {
        row.insertCell(-1);
    }

    CellEdit();
    saveTableData();
}

function delCol() {
    const table = document.getElementById('table');
    const colCount = table.rows[0].cells.length;

    if (colCount <= 1) {
        alert('Нельзя удалить последний столбец');
        return;
    }

    let hasData = false;
    for (let row of table.rows) {
        if (row.cells[colCount - 1].textContent.trim() !== '') {
            hasData = true;
            break;
        }
    }

    if (hasData && !confirm('Столбец содержит данные. Удалить?')) {
        return;
    }

    for (let row of table.rows) {
        row.deleteCell(-1);
    }

    saveTableData();
}

function addRow() {
    const table = document.getElementById('table');
    const colCount = table.rows[0].cells.length;
    const newRow = table.insertRow(-1);

    for (let i = 0; i < colCount; i++) {
        newRow.insertCell(i);
    }

    CellEdit();
    saveTableData();
}

function delRow() {
    const table = document.getElementById('table');
    const rowCount = table.rows.length;

    if (rowCount <= 1) {
        alert('Нельзя удалить последнюю строку');
        return;
    }
    let hasData = false;
    const lastRow = table.rows[rowCount - 1];
    for (let cell of lastRow.cells) {
        if (cell.textContent.trim() !== '') {
            hasData = true;
            break;
        }
    }

    if (hasData && !confirm('Строка содержит данные. Удалить?')) {
        return;
    }

    table.deleteRow(-1);
    saveTableData();
}
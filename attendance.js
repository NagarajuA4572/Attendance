function createtable() {
    const num = document.getElementById("num");
    const value = Number(num.value);
    const tableArea = document.getElementById("tableArea");
    let table = document.getElementById("Table");
    if (!table) {
        table = document.createElement("table");
        table.id = "Table";
    }
    table.innerHTML = "";
    const caption = document.createElement("caption");
    const typelist = document.querySelector('input[name="typelist"]:checked').value;
    caption.innerHTML = "<h3>Class " + typelist + "ies List</h3>";
    table.appendChild(caption);
    const rows = Math.ceil(value / 10);
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        if (i === rows - 1 && value % 10 !== 0) {
            for (let j = 0; j < value % 10; j++) {
                const cell = document.createElement("td");
                cell.innerText = "";
                row.appendChild(cell);
            }
        } else {
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement("td");
                cell.innerText = "";
                row.appendChild(cell);
            }
        }
        table.appendChild(row);
    }
    tableArea.appendChild(table);
}
function addValue() {
    const num = document.getElementById("val");
    const value = Number(num.value);
    const table = document.querySelector("#tableArea table");
    const row = Math.floor((value - 1) / 10);
    const col = (value - 1) % 10;
    if (table && table.rows[row] && table.rows[row].cells[col]) {
        table.rows[row].cells[col].innerText = value;
    }
    num.focus();
    num.value = "";
}
function remValue() {
    const num = document.getElementById("remval");
    const value = Number(num.value);
    const table = document.querySelector("#tableArea table");
    const row = Math.floor((value - 1) / 10);
    const col = (value - 1) % 10;
    if (table && table.rows[row] && table.rows[row].cells[col]) {
        table.rows[row].cells[col].innerText = "";
    }
    num.focus();
    num.value = "";
}
function finalList() {
    const opt = document.querySelector('input[name="attendance"]:checked').value;
    const typelist = document.querySelector('input[name="typelist"]:checked').value;
    const textArea = document.getElementById("textArea");
    let textBox = document.getElementById("textB");
    const num = document.getElementById("num");
    const value = Number(num.value);
    if (!textBox) {
        textBox = document.createElement("textarea");
        textBox.id = "textB";
        textBox.rows = 5;
        textBox.cols = 40;
        textBox.readOnly = true;
    }
    textBox.value = "";
    const table = document.querySelector("#tableArea table");
    if (!table) {
        return;
    }
    const rows = Math.ceil(value / 10);
    if (opt === typelist && opt === "present") {
        FilledList();
    } else if (opt !== typelist && opt === "abscent") {
        EmptyList();
    } else if (opt !== typelist && opt === "present") {
        EmptyList();
    } else {
        FilledList();
    }
    function FilledList() {
        for (let i = 0; i < rows; i++) {
            if (i === rows - 1 && value % 10 !== 0) {
                for (let j = 0; j < value % 10; j++) {
                    let val = table.rows[i].cells[j].innerText;
                    if (val) {
                        textBox.value += val + " , ";
                    }
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    let val = table.rows[i].cells[j].innerText;
                    if (val) {
                        textBox.value += val + ", ";
                    }
                }
            }
        }
    }
    function EmptyList() {
        for (let i = 0; i < rows; i++) {
            if (i === rows - 1 && value % 10 !== 0) {
                for (let j = 0; j < value % 10; j++) {
                    let val = table.rows[i].cells[j].innerText;
                    if (!val) {
                        textBox.value += i * 10 + (j + 1) + ", ";
                    }
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    let val = table.rows[i].cells[j].innerText;
                    if (!val) {
                        textBox.value += i * 10 + (j + 1) + ", ";
                    }
                }
            }
        }
    }
    let text = textBox.value;
    text = text.trim();
    if (text.length > 0) {
        text = text.slice(0, text.length - 1) + ".";
    }
    textBox.value = text;
    const button=document.createElement("button");
    button.onclick="copyText(textBox.value)";
    textArea.appendChild(textBox);
    textArea.appendChild(button);
}

function copyText(text){
    navigator.clipboard.writeText(text);
}

function handleAddEnter(event){
    if(event.key==="Enter"){
        event.preventDefault();
        addValue();
    }
}

function handleRemEnter(event){
    if(event.key==="Enter"){
        event.preventDefault();
        remValue();
    }
}

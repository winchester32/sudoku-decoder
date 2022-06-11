const innerSquares = 3;
const lineSquares = innerSquares * innerSquares;
const totalSquares = lineSquares * lineSquares;

let submission = [];

const solvePuzzle = document.getElementById("solve");

var rowGroup = 0;

const rows = lineSquares;
const cols = lineSquares;

const sudokuTable = document.getElementById("sudokuTable");

const tbody = document.createElement('tbody');

for (let row = 0; row < cols; row++) {
  const tr = document.createElement('tr');

  for (let col = 0; col < rows; col++) {
    const td = document.createElement('td');

    const input = document.createElement('input');
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "9");

    // input.classList.add("shaded-box");

    td.appendChild(input);

    tr.appendChild(td);
  }

  tbody.appendChild(tr);
}

sudokuTable.appendChild(tbody);

function joinValues() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
  console.log(submission);
}

function populateValues(isSolvable, solution) {
  const inputs = document.querySelectorAll("input");
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    })
  } else {
 window.alert("not solvable")
    //console.log('not solved')
  }
}

function solve() {
  joinValues();

  const data = { numbers: submission.join("") };
  console.log("data", data);

  fetch("http://localhost:2500/solve", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",

      //'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      populateValues(data.solvable, data.solution);
      submission = [];
    })
    .catch((error) => {
      console.error(error);
    });
}

solvePuzzle.addEventListener("click", solve);

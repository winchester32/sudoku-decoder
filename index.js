//const { process_params } = require("express/lib/router");

const puzzleBoard = document.getElementById("puzzle")

const solvePuzzle = document.getElementById('solve')
const squares = 81;
let submission = [];

for (let i = 0; i < squares; i++){
    const newElement = document.createElement('input')
    newElement.setAttribute('type', 'number')
    newElement.setAttribute('min', '1')
    newElement.setAttribute('max', '9')
    puzzleBoard.appendChild(newElement)
    

}

function joinValues(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if(input.value){
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
    console.log(submission);

}

function populateValues(isSolvable,solution ){
   const inputs =  document.querySelectorAll('input')
   if (isSolvable && solution){
    inputs.forEach((input,i)=>{

        input.value = solution[i]

   })


}
}

function solve(){

    
    joinValues()

   const data = {numbers:submission.join('')}
   console.log('data',data)


fetch ('http://localhost:2500/solve',{
    method:'POST',
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',

        //'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
    },
    body: JSON.stringify(data)

}).then(response => response.json())
.then (data => {
    console.log(data)


populateValues(data.solvable, data.solution)
submission = []
})
.catch((error) => {
    console.error(error);

})
}
solvePuzzle.addEventListener('click', solve)

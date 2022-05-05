const port = 2500
const cors = require('cors');
const axios = require('axios');
const express = require ('express');
const { JSON } = require('mysql/lib/protocol/constants/types');
//const dotenv = require('dotenv');
require('dotenv').config()
//const res = require('express/lib/response');

const app = express();

app.use(cors());
app.use(express.json());
 app.listen(port, ()=> console.log(`i am listening at ${port}`));

 app.post('/solve',(req,res )=>{

 console.log('aakakar',req.body.numbers)
const options = {
    method: 'POST',
    url: 'https://solve-sudoku.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY
    },
    
    data: {
        puzzle: req.body.numbers
      }
}
  
  axios.request(options).then((response) => {
    console.log(response.data)
    res.json(response.data)
  }).catch((error) => {
      console.error(error)
  })
  })

 
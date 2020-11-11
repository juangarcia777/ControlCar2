const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(cors());


require('./src/config/routes')(app);

app.listen(3000, ()=>{
  console.log('Start, porta 3000')
})
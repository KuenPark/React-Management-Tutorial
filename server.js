const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});


// customer 목록 가져오는 api
app.get('/api/customers', (req, res)=>{
  Customer.find({})
  .then(result=> (
    res.send(
      result ))
      ).catch(err=> console.log);
    
})



/* 스키마 */
const customersSchema = new mongoose.Schema({
  id: String,
  image: String,
  name: String,
  birthday: String,
  gender: String,
  job: String
});
const Customer = mongoose.model('customer', customersSchema);


app.listen(port, () => console.log('Listening on port ${port}'));



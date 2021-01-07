const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express');
const app = express();
const port = process.env.PORT || 5000;
const multer = require('multer');
const upload = multer({dest: './upload'}); // 파일 업로드 위치 설정.
const autoIncrement = require('mongoose-auto-increment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});


// customer 목록 가져오는 api
app.get('/api/customers', (req, res)=>{
  Customer.find({})
  .then(result=> (
    res.send(
      result )))
      .catch(err=> console.log);
    
})


app.use('/image',express.static('./upload')) // /image라는 경로의 이름으로 실제 upload파일 위치 매칭.
app.post('/api/customers', upload.single('image'), (req, res) =>{

  let rqimage = '/image/' + req.body.filename;
  let rqname = req.body.name;
  let rqbirthday = req.body.birthday;
  let rqgender = req.body.gender;
  let rqjob = req.body.job;
  
    
  let insertCustomer = new Customer({
    seq : undefined,
    image : rqimage,
    name : rqname,
    birthday : rqbirthday,
    gender : rqgender,
    job : rqjob
  } );
 
  insertCustomer.save()
  .then(()=> console.log("save Sucess!"));
});



/* 스키마 */
const customersSchema = new mongoose.Schema({
  seq: Number,
  image: String,
  name: String,
  birthday: String,
  gender: String,
  job: String
});
const Customer = mongoose.model('customer', customersSchema);

customersSchema.plugin(autoIncrement.plugin,
  { 
    model : 'customer', 
    field : 'seq', 
    startAt : 4,  
    increment : 1  
  });


app.listen(port, () => console.log('Listening on port ${port}'));



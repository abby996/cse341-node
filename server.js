
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const router = express.Router();
const port =3000; 


router.get('/home', (req, res) => {
  res.send('Hello World, This is home router');
});
 
router.get('/profile', (req, res) => {
  res.send('Hello World, This is profile router');
});
 
router.get('/login', (req, res) => {
  res.send('Hello World, This is login router');
});
 
router.get('/logout', (req, res) => {
  res.send('Hello World, This is logout router');
});
 



 

app.use(bodyParser.json());
 
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
 
var upload = multer({ storage: storage }).array('userPhoto', 2);
 
app.post('/api/photo', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});
 
app.listen(3000, function () {
  console.log("Working on port 3000");
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
 
var upload = multer({ storage : storage }).array('userPhoto',2);








app.use('/', router);

app.get ('/', (req, res) =>{
res.send( 'AbbyTech ');
});




// Add middleware before routes
app.use(bodyParser.json());
app.use('/', router);
 

app.listen(process.env.PORT || 3000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});





 



var express = require('express');
var router = express.Router();
var sql = require('mssql');
var multer = require('multer');


var storage = multer.diskStorage({
     destination: function(req,file,cb){
      cb(null,'public/uploads/')

     },
     filename: function(req,file,cb){

      cb(null,Date.now() + file.originalname);
     }
});

var upload = multer({ storage :storage});

var dbConn = {
    user: 'sa',
    password: '159951',
    server: 'localhost',
    database: 'etkinlikdatabase',
    port: 1433,
}
router.post('/', upload.any(),function(req, res, next) {

    console.log(req.body["ay"]);
    console.log(req.files[0]);
    var posts = req.body;

    var file = "/uploads/" + req.files[0]["filename"];
    var tarih = req.body["yil"]+"."+ req.body["ay"]+"."+ req.body["gun"];
    var tarih2 = new Date(Date.parse(tarih));

    console.log(tarih2);
     var conn = new sql.Connection(dbConn);

     conn.connect().then(function () {

     var con = new sql.Request(conn);
     var query2 = ("INSERT into uye (etkinlik_Ad,etkinlik_icerik,etkinlik_organizator,etkinlik_Tip,etkinlik_Resim,etkinlik_Time) values ('"+posts["baslik"]+"',\'"+posts["icerik"]+"',\'"+posts["organizator"]+"',\'"+posts["singleSelect"]+"',\'"+file+"',\'"+tarih+"')");
     console.log(query2);
     con.query("INSERT into etkinlikler (etkinlik_Ad,etkinlik_icerik,etkinlik_organizator,etkinlik_Tip,etkinlik_Resim,etkinlik_Time) values ('"+posts["baslik"]+"',\'"+posts["icerik"]+"',\'"+posts["organizator"]+"',\'"+posts["singleSelect"]+"',\'"+file+"',\'"+tarih+"')").then(function (recordset) {
     res.setHeader('Content-Type','application/json');
     res.json({"Cevap": "success"});
     conn.close();

     })
     .catch(function (err) {
     console.log(err);
     res.json({"Cevap": "error"});
     console.log("uye yok");
     conn.close();

     });

     })
     .catch(function (err) {
     console.log(err);
     });




});
module.exports = router;

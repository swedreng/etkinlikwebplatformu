var express = require('express');
var router = express.Router();
var sql = require('mssql');
var dbConn = {
    user: 'sa',
    password: '159951',
    server: 'localhost',
    database: 'etkinlikdatabase',
    port: 1433,

}

router.post('/', function(req, res, next) {
    console.log("Geldi");
    var posts = req.body;
    console.log(posts.ad_Soyad);

    var conn = new sql.Connection(dbConn);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        var query2=("INSERT into mesaj   (ad_Soyad,email,tel,mesaj) values ('"+posts.ad_Soyad+"',\'"+posts.email+"',\'"+posts.tel+"',\'"+posts.mesaj+"')");
        console.log(query2);
        req.query("INSERT into contact (ad_Soyad,email,tel,mesaj) values ('"+posts.ad_Soyad+"',\'"+posts.email+"',\'"+posts.tel+"',\'"+posts.mesaj+"')").then(function (recordset) {
            console.log("Insert basarili");
            res.json({"Cevap": "success" });
            conn.close();
        })
            .catch(function (err) {
                console.log(err);
                res.json({"Cevap": "error"});
                conn.close();
            });
    })
        .catch(function (err) {
            console.log(err);
        });

});
module.exports = router;

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
    console.log(posts.uye_Adi);

    var conn = new sql.Connection(dbConn);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        var query2=("INSERT into uye (uye_Adi,uye_Soyadi,uye_Username,uye_Passaword,uye_Email,uye_Tel) values ('"+posts.uye_Adi+"',\'"+posts.uye_Soyadi+"',\'"+posts.uye_Username+"',\'"+posts.uye_Password+"',\'"+posts.uye_Email+"',\'"+posts.uye_Tel+"')");
        console.log(query2);
        req.query("INSERT into uye (uye_Adi,uye_Soyadi,uye_Username,uye_Passaword,uye_Email,uye_Tel) values ('"+posts.uye_Adi+"',\'"+posts.uye_Soyadi+"',\'"+posts.uye_Username+"',\'"+posts.uye_Password+"',\'"+posts.uye_Email+"',\'"+posts.uye_Tel+"')").then(function (recordset) {
            console.log("Insert basarili");
            res.json({"Cevap": "success" });
            conn.close();
        })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    })
        .catch(function (err) {
            console.log(err);
        });

});
    module.exports = router;

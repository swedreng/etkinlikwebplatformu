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
    console.log(posts.yorum_EtkinlikID);

    var conn = new sql.Connection(dbConn);
    conn.connect().then(function () {
        var req = new sql.Request(conn);

        req.query("INSERT into Yorumlarrr (yorum_Yapan,yorum_Yorum,yorum_EtkinlikID) values ('"+posts.yorum_Yapan+"',\'"+posts.yorum+"',\'"+posts.yorum_EtkinlikID+"')").then(function (recordset) {
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

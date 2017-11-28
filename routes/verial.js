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
    console.log("Geldiverial");

    var conn = new sql.Connection(dbConn);
    conn.connect().then(function () {

        var con = new sql.Request(conn);
        // var query2 = ("SELECT * FROM uye WHERE uye_Username='"+ posts.uye_Username + "'uye_passaword='"+posts.uye_Password+"'");
        // console.log(query2);
        con.query("SELECT * FROM etkinlikler").then(function (recordset) {
            console.log(recordset.length>0);
            console.log(recordset);
            if(recordset.length > 0){

                res.json({"cevap": recordset});
                conn.close();
            }

        })
            .catch(function (err) {
                console.log(err);
                console.log("uye yok");
                conn.close();
            });
    })
        .catch(function (err) {
            console.log(err);
        });

});
module.exports = router;

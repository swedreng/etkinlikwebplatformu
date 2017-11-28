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

    console.log(posts);

    var conn = new sql.Connection(dbConn);

    conn.connect().then(function () {

        var con = new sql.Request(conn);
       // var query2 = ("SELECT * FROM uye WHERE uye_Username='"+ posts.uye_Username + "'uye_passaword='"+posts.uye_Password+"'");
       // console.log(query2);
        con.query("SELECT * FROM uye WHERE uye_Username='"+ posts.uye_Username + "'and uye_passaword='"+posts.uye_Password+"'").then(function (recordset) {
            console.log(recordset.length>0);
            console.log(recordset);
            if(recordset.length > 0){
                if(recordset[0].uye_isValid == 1){

                    req.session.isAdmin = true;
                    var kullanici = "Admin";
                    req.session.isAdminId = recordset[0].uye_ID;
                    res.json({"Cevap": kullanici});

                }else{

                    req.session.isAdmin = false;
                    req.session.isKullanici = true;
                    var kullanici = "kullanici";
                    req.session.isKid  = recordset.uye_ID;
                    res.json({"Cevap": kullanici});
                }


                conn.close();
            }
            else {
                res.json({"Cevap": "üyeYok"});

                req.session.isAdmin = false;
                req.session.isKullanici = false;
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

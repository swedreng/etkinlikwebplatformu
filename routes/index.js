var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    if (req.session.isKullanici == true || req.session.isAdmin == true) {
        res.render('index', {title: 'Express'});
    } else {
        res.render('giris', {title: 'Express'});
    }

  //res.render('index', { title: 'Express' });
});

 router.get('/uyeol',function(req,res,next){

   res.render('uyeol');

});
 router.get('/hakkimizda',function(req,res,next){
    res.render('hakkimizda');

});

router.get('/contact',function(req,res,next){

    res.render('contact');

});

router.get('/usersetting',function(req,res,next){

res.render('usersetting');

});
router.get('/giris',function(req,res,next){

 res.render('giris');

});
router.get('/cikis',function(req,res,next){

    req.session.destroy();
    res.render('giris');

});

router.get('/admin',function(req,res,next){
    if(req.session.isAdmin == true){
        res.render('admin');
    }else{
        res.render('giris',{title: 'Lütfen önce admin olarak giriþ yapýnýz.'});

    }
});

router.get('/girisVarmi',function(req,res,next){
    if(req.session.isAdmin == true ){
        res.json("admingirisvar");
    }else if(req.session.isKullanici == true ){
        res.json("kullanicigirisvar");
    }else{
        res.json("uyeyok")
    }
});
router.get('/etkinlik',function(req,res,next){
    res.render('etkinlik');
});
router.get('/header',function(req,res,next){
    res.render('header');
});
router.get('/chat',function(req,res,next){

    res.render('chat');

});


module.exports = router;

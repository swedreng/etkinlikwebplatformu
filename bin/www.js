#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express');
var router = express.Router();
var app = require('../app');
var debug = require('debug')('chatproje:server');
var http = require('http');
var sql = require('mssql');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */


var server = http.createServer(app);
var io = require('socket.io').listen(server);
app.io = require('socket.io')();

var users = {};
var connections = [];


io.sockets.on('connection', function(socket){

  Cikis = function(a){
  console.log("cýkýs calýstý");
    socket.leave(a);
  }

  socket.on('room1',function(room){
    socket.leave(socket.room);
    Cikis(socket.room);
    socket.room = room;
    socket.join(room);
    console.log(socket.join);
    socket.emit('room1', socket.username + ' has connected to this room ' + room + '');

  });


  socket.on('room2',function(room){
    socket.leave(socket.room);
    Cikis(socket.room);
    socket.room = room;
    socket.join(room);
    console.log(socket.join);
    socket.emit('room2', socket.username + ' has connected to this room ' + room + '');
    socket.broadcast.to('broadcast', socket.username + ' has connected to this room ' + room + '');
  });

  socket.on('mainRoom',function(room){
    socket.leave(socket.room);
    Cikis(socket.room);
    socket.room = room;
    socket.join(room);
    console.log(socket.join);
    socket.emit('mainRoom', socket.username + ' has connected to this room ' + room + '');
    socket.broadcast.to('mainRoom', socket.username + ' has connected to this room ' + room + '');
  });

  Cikis = function(a){
    console.log("cýkýs calýstý");
    socket.leave(a);
  }

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  //disconnect
  socket.on('disconnect',function(data){

    socket.leave(socket.room);
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s socket connected',connections.length);
    if(!socket.username) return;
    delete users[socket.username];
    updateUsername();


  });



  var dbConn = {
    user: 'sa',
    password: '159951',
    server: 'localhost',
    database: 'etkinlikdatabase',
    port: 1433,
  }





  //Send message
  socket.on('send message',function(data,callback){
    var msg = data.trim();
    if(msg.substr(0,3) === '/w '){
        msg = msg.substr(3);
        var ind = msg.indexOf(' ');
           if(ind !== -1){

                var name = msg.substring(0,ind);
                var msg = msg.substring(ind + 1);
                    if(name in users){

                      var conn = new sql.Connection(dbConn);
                      conn.connect().then(function () {
                      var con = new sql.Request(conn);

                        con.query("INSERT into KisiselMesajlar (kisiselmesaj_gonderen,kisiselmesaj_gonderilen,kisiselmesaj_mesaj) values ('"+socket.username+"',\'"+name+"',\'"+msg+"')").then(function (recordset) {
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




                      users[name].emit('private',{msg:msg,user: socket.username});

                    }else{
                        callback('Hata ! Gecerli bir kullanici gir.');

                    }

            }else{
              callback('Hata! Lutfen gizli mesaj kullanici adindan sonra bosluk birakiniz. ');

           }

    }else if(msg.substr(0,3) === '/c '){
      console.log("c geldim");
      msg = msg.substr(3);
      var ind = msg.indexOf(' ');
      if(ind !== -1){

        var name = msg.substring(0,ind);
        var msg = msg.substring(ind + 1);
           if(true){

            var conn = new sql.Connection(dbConn);
             conn.connect().then(function () {


            var con = new sql.Request(conn);
            con.query("INSERT into cevrimdisiMesajlar (cevrimdisiMesajlar_kim,cevrimdisiMesajlar_kime,cevrimdisiMesajlar_mesaj) values ('"+socket.username+"',\'"+name+"',\'"+msg+"')").then(function (recordset) {
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



        }else{
          callback('Hata ! Gecerli bir kullanici gir.');

        }

      }else{
        callback('Hata! Lutfen gizli mesaj kullanici adindan sonra bosluk birakiniz. ');

      }

    }


    else{

      var conn = new sql.Connection(dbConn);
      conn.connect().then(function () {
      var con = new sql.Request(conn);

        con.query("INSERT into Mesajlar (mesaj_gonderen,mesaj_mesaj) values ('"+socket.username+"',\'"+data+"')").then(function (recordset) {
          conn.close();


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

      console.log(socket.room);
      io.sockets.in(socket.room).emit('new message',{msg:msg,user: socket.username});

    }


  });
  //new user
  socket.on('new user',function(data,callback){



    var conn = new sql.Connection(dbConn);
    console.log(data);
    conn.connect().then(function () {

      var con = new sql.Request(conn);
      console.log(data);
      con.query("SELECT * FROM uye WHERE uye_Username='"+data+"'").then(function (recordset){

        conn.close();
        console.log(recordset.length > 0);
        if(recordset.length > 0){

          console.log("uye var");
          var test = true;
          yoklama(test);
          callback(true);

        }else{
          console.log("uye yok");
          var test = false;
          yoklama(test);
          callback(false);

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




    yoklama = function(a){
      if(data in users){
        callback(false);
      }else{

        if(a){
          socket.username = data;

          var conn = new sql.Connection(dbConn);
          conn.connect().then(function () {
          var con = new sql.Request(conn);

            con.query("SELECT * FROM cevrimdisiMesajlar WHERE cevrimdisiMesajlar_kime='"+socket.username+"'").then(function (recordset){

              conn.close();
              if(recordset.length > 0){
                socket.emit('cevrimdisiMesaj',recordset,function(){

                });

              }

            })
                .catch(function (err) {
                  console.log(err);
                  conn.close();


                });

            })
              .catch(function (err) {
                console.log(err);


              });



          users[socket.username] = socket;
          updateUsername();
        }


      }


    }



  });








  function updateUsername(){

    io.sockets.emit('get users', Object.keys(users));

  }


  socket.on('get not online users',function(data,callback){

    var conn = new sql.Connection(dbConn);
    conn.connect().then(function () {
    var con = new sql.Request(conn);

      con.query("SELECT * FROM uye").then(function (recordset){

        conn.close();

        if(recordset.length > 0){
          socket.emit('get not online users',recordset,function(){


          });



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











});



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

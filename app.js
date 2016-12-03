/**
 * Created by G on 27-11-2016.
 */
var express = require('express');
var reload = require('reload');
var fs = require('fs');
var wss = new require('ws').Server({port: 3030});
var app = express();
var ArduinoUno = require('./lib/ArduinoUno');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(require('./routes/index'));
app.use(require('./routes/uno'));
app.use(require('./routes/api'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use(express.static('./public'));

// global vars for the EJS (Embedded JavaScript) framework
app.locals.siteTitle = 'ATI'; // Control Systems title

var server = app.listen(app.get('port'), function () {
   console.log('ATI listening on port: ' + app.get('port') + '!');
});

reload(server, app);

wss.on('connection', function (ws) {
   ws.send('Welcome to cyber chat');
   ws.on('message', function (msg) {
      if (msg == 'exit') {
         ws.close();
      }
   })
});

var aUno = new ArduinoUno();

aUno.on('ready', function() {
   console.log('Arduino Uno ready');
   app.set('arduinoUno', aUno);
});

aUno.on('change', function(value) {
   wss.clients.forEach(function (ws, index, list) {
      ws.send(JSON.stringify(value));
   })
});

aUno.on('data', function(type, data) {
   fs.writeFile(type + Date.now() + '.csv', data, function (err) {
      console.log(`${type} data saved`);
   });
});

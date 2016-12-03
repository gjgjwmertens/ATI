/**
 * Created by G on 3-12-2016.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var five = require("johnny-five");

var ArduinoUno = function() {
   this.board = new five.Board();

   this.a0Sensor = null;

   this.board.on('ready', function () {
      this.a0Sensor = new five.Sensor({
         pin: 'A0',
         freq: 100
      });

      this.a0Sensor.on('change', function () {
         var a0 = {
            type: 'analog',
            item: 'a0',
            value: this.a0Sensor.fscaleTo(-1, 1),
            data: this.a0Sensor.value,
            time: new Date().toString()
         };
         this.emit('change', a0);
      }.bind(this));

      this.emit('ready');
   }.bind(this));
};

util.inherits(ArduinoUno, EventEmitter);

module.exports = ArduinoUno;

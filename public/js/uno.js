/**
 * Created by G on 28-11-2016.
 */

Array.prototype.sum = Array.prototype.sum || function () {
      return this.reduce(function (sum, a) {
         return sum + Number(a)
      }, 0);
   }

Array.prototype.average = Array.prototype.average || function () {
      return this.sum() / (this.length || 1);
   }

var ws = new WebSocket('ws://20.0.0.112:3030');
var currentValues = {
   'a0': {raw: {data: 0}, avg: [0, 0, 0, 0, 0], avgValue: 0}
};

ws.onopen = function () {
   $('#websocket_conn_status_container_id').removeClass('websocket-not-connected');
   $('#websocket_conn_status_container_id').addClass('websocket-connected');
};

ws.onclose = function () {
   $('#websocket_conn_status_container_id').removeClass('websocket-connected');
   $('#websocket_conn_status_container_id').addClass('websocket-not-connected');
};

ws.onmessage = function (payload) {
   var data = '';
   try {
      data = JSON.parse(payload.data);
   } catch (e) {
      data = payload.data;
   }
   // console.log(typeof data);
   if (typeof data === 'object') {
      updateStatus(data);
      // updateGraph(data);
   } else {
      console.log('uno.js::ws.onmessage: ' + data);
   }
};

$(function () {
   console.log('Uno loaded');

   // $('#update_status_btn_id').on('click', function (e) {
   //    $.getJSON('api', updateStatus);
   // });
   //
   // $('#update_item_5_value_btn_id').on('click', function (e) {
   //    var item_id = this.id.split('_')[2];
   //    var item_value = $('#item_input_field_id').val();
   //
   //    if (item_value) {
   //       $.getJSON('api/' + item_id + '/' + item_value, updateItemValue);
   //    } else {
   //       alert('The new value can\'t be empty!!');
   //    }
   // });
   //
   $('#ws_close_btn_id').on('click', function (e) {
      ws.send('exit');
   });
   //
   // $('#start_chopper_btn_id').on('click', function (e) {
   //    $.post('api', {
   //       command: 'start motor',
   //       value: 150
   //    }, updateCommandFeedback);
   // });
   //
   // $('#set_chopper_btn_id').on('click', function (e) {
   //    $.post('api', {
   //       command: 'set motor',
   //       value: $('#set_chopper_value_input_field_id').val()
   //    }, updateCommandFeedback);
   // });
   //
   // $('#stop_chopper_btn_id').on('click', function (e) {
   //    $.post('api', {
   //       command: 'stop motor',
   //       value: 150
   //    }, updateCommandFeedback);
   // });
   //
   // $('#test_chopper_btn_id').on('click', function (e) {
   //    $.post('api', {
   //       command: 'test motor',
   //       value: 100
   //    }, updateCommandFeedback);
   // });

   // $.getJSON('api', updateStatus);

});

function updateCommandFeedback(data) {
   console.log({location: 'control.js::updateCommandFeedback (data): ', msg: data});
   $('#command_feedback_field_id').text(data.msg);
}

function updateStatus(data) {

   if (data.item) {
      currentValues[data.item].raw = data;

      currentValues[data.item].avg.push(data.data);
      currentValues[data.item].avg.shift();
      currentValues[data.item].avgValue = currentValues[data.item].avg.average();

      $('#' + data.item + '_current_value_field_id').text('(' + temp(data.data) + ')');
   }
}

function temp(raw) {
   var r, t;

   r = Math.log(10000 * (1024 / (1024 - (raw - 400))));
   t = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * r * r)) * r);
   return Math.round10(t - 273.15, -1);
}
// Closure
(function() {
   /**
    * Decimal adjustment of a number.
    *
    * @param {String}  type  The type of adjustment.
    * @param {Number}  value The number.
    * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
    * @returns {Number} The adjusted value.
    */
   function decimalAdjust(type, value, exp) {
      // If the exp is undefined or zero...
      if (typeof exp === 'undefined' || +exp === 0) {
         return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // If the value is not a number or the exp is not an integer...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
         return NaN;
      }
      // Shift
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
   }

   // Decimal round
   if (!Math.round10) {
      Math.round10 = function(value, exp) {
         return decimalAdjust('round', value, exp);
      };
   }
   // Decimal floor
   if (!Math.floor10) {
      Math.floor10 = function(value, exp) {
         return decimalAdjust('floor', value, exp);
      };
   }
   // Decimal ceil
   if (!Math.ceil10) {
      Math.ceil10 = function(value, exp) {
         return decimalAdjust('ceil', value, exp);
      };
   }
})();
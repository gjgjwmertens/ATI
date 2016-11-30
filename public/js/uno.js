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
   'a0': {raw: null, avg: [0, 0, 0, 0, 0], avgValue: 0},
   'a1': {raw: null, avg: [0, 0, 0, 0, 0], avgValue: 0},
   'a2': {raw: null, avg: [0, 0, 0, 0, 0], avgValue: 0}
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
      $('#' + data.item + '_value_status_cell_id').text(data.value);
      $('#' + data.item + '_data_status_cell_id').text(data.data);
      $('#' + data.item + '_updated_status_cell_id').text(data.time);

      switch (data.item) {
         case 'potentiometer':
            currentValues[data.item].avg.push(data.value);
            currentValues[data.item].avg.shift();
            currentValues[data.item].avgValue = currentValues[data.item].avg.average();
            break;

         default:
            currentValues[data.item].avg.push(data.data);
            currentValues[data.item].avg.shift();
            currentValues[data.item].avgValue = currentValues[data.item].avg.average();
            break;
      }
   }

   console.log(currentValues);
   // var motorV = parseInt(currentValues['motorFeedback'].data),
   //    pwmV = parseInt(currentValues['motorPower'].data) - motorV;
   //
   // var emf = (motorV - (pwmV * 16)) / 4;
   // console.log({
   //    location: 'control.js::updateStatus (emf): ',
   //    emf: emf,
   //    pwmV: (pwmV * (5 / 1024)),
   //    motorV: motorV
   // });
   // currentValues['emf'].data = emf;
}

function updateItemValue(data) {
   console.log('control.js::updateItemValue (data): ' + data);
   $('#item_5_current_value_field_id').text(data.value);
   $('#item_5_updated_field_id').text(data.time);
}
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')
const Readline = require('@serialport/parser-readline')
const { ipcRenderer } = require('electron');
const fs = require('fs');


async function listSerialPorts() {
  await serialport.list().then((ports, err) => {
    if(err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }
    console.log('ports', ports);

    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered'
    }
    
    var select = document.getElementById("port");
    for(var i = 0; i < ports.length; i++) {
        var opt = ports[i];
        var el = document.createElement("option");
        el.textContent = opt.path;
        el.value = opt.path;
        select.appendChild(el);
    }    
  })
}
var recv = {};
listSerialPorts();

function serial_init() {
  const opt = document.getElementById("port").value;
  const port = new serialport(opt, {
    baudRate: 9600
  })
    
    const parser = port.pipe(new Readline({ delimiter: '\n' }))
    parser.on('data', (input) =>{
      fs.appendFile('data.json', input + '\n', function (err) {
        if (err) throw err;
      });

      recv = JSON.parse(input);
                 //vvvv miesiąc moze byc zerowy dlatego cofka o -1
     if(recv.time!=undefined){
      dt = recv.time.split('-'); 
      recv.time = new Date(parseInt(dt[0]), parseInt(dt[1]-1), parseInt(dt[2]), parseInt(dt[3]), parseInt(dt[4]), parseInt(dt[5])); //podaje czas UTC więc cofnięte o 1hr
      recv.t /=100;
      recv.p /=100;
      recv.v /=100;
      recv.h /=100;
      recv.g /=10;
     }

    if(recv.acc!=undefined){
      recv.acc.x /=100;
      recv.acc.y /=100;
      recv.acc.z /=100;
    
      recv.gyro.x /=100;
      recv.gyro.y /=100;
      recv.gyro.z /=100;

      recv.rtc /=100;
    }

    if(recv.pm!=undefined){
      recv.t /=100;
      recv.p /=100;
      recv.pm["1"] /=100;
      recv.pm["25"] /=100;
      recv.pm["40"] /=100;
      recv.pm["10"] /=100;      
    }
      console.log(recv);
      updateGauges();
    });
}

function minutezero(){
  if(recv.time.getMinutes()<10){
    return '0';
  }
  else{
    return '';
  }
}

function secondszero(){
  if(recv.time.getSeconds()<10){
    return '0';
  }
  else{
    return '';
  }
}

function updateGauges(){
  if(recv.time!=undefined){
    document.getElementById("time").innerText = recv.time.getHours()+":"+minutezero()+recv.time.getMinutes()+":"+secondszero()+recv.time.getSeconds();
    document.getElementById("temp").innerText = recv.t;
    document.getElementById("pressure").innerText = recv.p;
    document.getElementById("voltage").innerText = recv.v;
    document.getElementById("rssi").innerText = recv.rssi;
    document.getElementById("co2").innerText = recv.co2;
    document.getElementById("humidity").innerText = recv.h;
    document.getElementById("distance").innerText = recv.d;
    document.getElementById("gas").innerText = recv.g;
    if(recv.d<1000){
      document.getElementById("motor").style = "background-color: #612115";
    }
    else{
      document.getElementById("motor").style = "background-color: #191a1c";
    }
    ipcRenderer.send('temp', recv.t);
    ipcRenderer.send('pressure', recv.p);
    ipcRenderer.send('voltage', recv.v);
    ipcRenderer.send('rssi', recv.rssi);
    ipcRenderer.send('co2', recv.co2);
    ipcRenderer.send('humidity', recv.h);
    ipcRenderer.send('gas', recv.g);

  }

  if(recv.acc!=undefined){
    document.getElementById("acc_x").innerText = recv.acc.x;
    document.getElementById("acc_y").innerText = recv.acc.y;
    document.getElementById("acc_z").innerText = recv.acc.z;

    document.getElementById("gyro_x").innerText = recv.gyro.x;
    document.getElementById("gyro_y").innerText = recv.gyro.y;
    document.getElementById("gyro_z").innerText = recv.gyro.z;

    document.getElementById("rtc").innerText = recv.rtc;

    document.getElementById("rssi").innerText = recv.rssi;

  }
  
  if(recv.pm!=undefined){
    document.getElementById("temp").innerText = recv.t;
    document.getElementById("pressure").innerText = recv.p;

    document.getElementById("pm10").innerText = recv.pm["10"];
    document.getElementById("pm40").innerText = recv.pm["40"];
    document.getElementById("pm25").innerText = recv.pm["25"];
    document.getElementById("pm1").innerText = recv.pm["1"];

    document.getElementById("rssi").innerText = recv.rssi;

    ipcRenderer.send('pm25', recv.pm["10"]);
  }
}
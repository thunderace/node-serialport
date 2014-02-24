////////////////////////////////////////////////////////
// Use the cool library                               //
// git://github.com/thunderace/node-serialport.git //
// to read the serial port where arduino is sitting.  //
////////////////////////////////////////////////////////               
var com = require("serialport");

var serialPort = new com.SerialPort("/dev/cu.usbmodemfd121", {
    baudrate: 9600,
  	virtual:	true,
	  virtualTx : virtualTx,
	  disconnectedCallback:	onDisconnected,
    parser: com.parsers.readline('\r\n')
  });



serialPort.on('open',function() {
  console.log('Port open');
	setInterval(virtualRx, 2000, serialPort);
});

serialPort.on('data', function(data) {
  console.log(data);
});

function onDisconnected() {
	console.log('Disconnected' );
}


function virtualTx(data, serialPort) {
	console.log('Tx : ' , data);
	// we can do what we want with serialPort
}

var counter = 0;
var data = {
0:	'data1]',
1:	'data2',
2:	'data3',
3:	'data4',
4:	'data5'
};

function virtualRx(serialPort) {
	
	serialPort.virtualRx(data[counter]);
	counter++;
	if (counter == 5) {
		counter = 0;
	}
}

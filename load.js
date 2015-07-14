
var  fs = require('fs')
    , db = require('mongojs').connect('microdb');

db.collection('devices').drop();
db.collection('devsvcs').drop();
db.collection('messages').drop();

var devices = JSON.parse(fs.readFileSync(__dirname+'/app/device/data/devices.json').toString());
var maxCount = devices.length;
var dev_count = 0;
devices.forEach(function (device) {
	device.details = JSON.parse(fs.readFileSync(__dirname+'/app/device/data/'+device.id+'.json').toString());
	device.platform = "android";
	delete device.id;
	device.user = getuser();
	device.model = device.name;
	device.phone = 900000000 + Math.floor(Math.random() * 100000000);
	device.alerts = 2 + Math.floor(Math.random() * 10);
	device.svcs = 5 + Math.floor(Math.random() * 6);
	db.collection('devices').insert(device, function (err, doc) {
		dev_count++;
		if (dev_count == devices.length) {
			console.log('devices loaded: ' + dev_count);
		}
	});
});

var svcs = [
	{ "name" : "Google Device Management", "image" : "devsvc/gdevsvc.png" },
	{ "name" : "HP Print Device Management", "image" : "devsvc/hp.png" },
	{ "name" : "Google Nest Service", "image" : "devsvc/nest.jpg" },
	{ "name" : "Exchange Server", "image" : "devsvc/exchange.png" },
	{ "name" : "Apple Homekit Service", "image" : "devsvc/homekit.png" },
	{ "name" : "Active Directory Service", "image" : "devsvc/ad.png" },
	{ "name" : "Microsoft SCCM", "image" : "devsvc/sccm.jpg" },
	{ "name" : "Microsoft Intune", "image" : "devsvc/intune.png" }
];
var svcs_count = 0;
for (var i=0; i<svcs.length; i++) {
	svcs[i].alerts = 5 + Math.floor(Math.random() * 10);
	svcs[i].devices = 12 + Math.floor(Math.random() * 5);
	db.collection('devsvcs').insert ( svcs[i], function (err, doc) {
		svcs_count++;
		if (svcs_count == svcs.length) {
			console.log("devsvcs loaded: " + svcs_count);
		}
	});
}

var msgcount = 0;
for (var i=0; i<5; i++) {
	db.collection('messages').insert(
	{
		title: "App issue reported",
		type: "Technical Support",
		timestamp: "2014-12-09 15:28:04",
		device: getuser()
	}, function (err, doc) {
		if(err) {
			console.log("Error while inserting message.");
			db.close();
		} else {
			msgcount++;
			if (msgcount > 4) {
				console.log("alerts loaded");
				db.close();
			}
		}
	});
}
function getuser() {
	var chars = ["a","c","d","e","h","i","k","m","o","p","r","s","t","u","v"];
	var user = "";
	for (var i=0; i<8; i++) {
		user += chars[Math.floor(Math.random() * chars.length)];
	}
	return user;
}




var EventEmitter = require('events').EventEmitter
	, funcis = require('funcis')
	, http = require('http')
	, app = funcis()
	, reporter = new EventEmitter();

var control = app.node('Control');

control.functions.add('CanaryStart', function (next) {
	var interval = setInterval(function () {
		next(Date.now());
	}, 1000);
	this.onstop(function () {
		clearInterval(interval);
	});
});

control.functions.add('CanaryEnd', function (time, path) {
	console.log('The canary in ' + path + ' landed in ' + (Date.now() - time) + ' ms');
	reporter.emit(path, Date.now() - time);
});

http.createServer(app.listen()).listen(6011);

var nodea = app.connect({ host: 'localhost', port: 6012 });
nodea.addNode('NodeA');
var nodec = app.connect({ host: 'localhost', port: 6014 });
nodec.addNode('NodeC');

app.script('canary');

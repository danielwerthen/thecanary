var EventEmitter = require('events').EventEmitter
	, funcis = require('funcis')
	, http = require('http')
	, app = funcis()

var nodec = app.node('NodeC');

nodec.functions.add('Passalong', function (next) {
	next();
});

http.createServer(app.listen()).listen(6014);

var nodec = app.connect({ host: 'localhost', port: 6013 });
nodec.addNode('NodeB');
var control = app.connect({ host: 'localhost', port: 6011 });
control.addNode('Control');

app.script('canary');

var EventEmitter = require('events').EventEmitter
	, funcis = require('funcis')
	, http = require('http')
	, app = funcis()

var nodea = app.node('NodeA');

nodea.functions.add('Passalong', function (next) {
	next();
});

http.createServer(app.listen()).listen(6012);

var nodeb = app.connect({ host: 'localhost', port: 6013 });
nodeb.addNode('NodeB');
var control = app.connect({ host: 'localhost', port: 6011 });
control.addNode('Control');

app.script('canary');

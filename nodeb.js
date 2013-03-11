var EventEmitter = require('events').EventEmitter
	, funcis = require('funcis')
	, http = require('http')
	, app = funcis()

var nodeb = app.node('NodeB');

nodeb.functions.add('Passalong', function (next) {
	next();
});

http.createServer(app.listen()).listen(6013);

var nodea = app.connect({ host: 'localhost', port: 6012 });
nodea.addNode('NodeA');
var nodec = app.connect({ host: 'localhost', port: 6014 });
nodec.addNode('NodeC');

app.script('canary');

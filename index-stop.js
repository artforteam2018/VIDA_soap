const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name:'NodeJS VIDA SOAP',
  description: 'The nodejs.org SOAP service',
  script: require('path').join(__dirname,'server.js'),
  nodeOptions: [
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
	console.log('start');
  svc.start();
});

svc.on('invalidinstallation',function(){
	console.log('invalidinstallation');
});

svc.on('error',function(){
	console.log('error');
});

svc.on('stop',function(){
	console.log('stop');
});


svc.uninstall();

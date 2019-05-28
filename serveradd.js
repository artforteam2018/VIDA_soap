const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');
const clientApp = require('./app');

var myService = {
    DmsService: {
        DmsServiceSoap: {
            GetInterfaceCapabilitiesRequest: async function (args) {
                console.log('GetInterfaceCapabilitiesRequest');
                let res = await clientApp('GetInterfaceCapabilities', {GetInterfaceCapabilitiesRequest: args})
                let attributes = {};
                return res.return;
            }
        }
    }
};
var xml = require('fs').readFileSync('example.wsdl', 'utf8');

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({
    type: function () {
        return true;
    }
}));
app.listen(8001, function () {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/alfaavto_vida/ws//DmsService.1cws', myService, xml, function () {
        console.log('server initialized');
    });
});

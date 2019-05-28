const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');
const clientApp = require('./app');

var myService = {
    DmsService: {
        DmsServiceSoap: {
            GetInterfaceCapabilitiesRequest: async function (args) {
                console.log('GetInterfaceCapabilitiesRequest');
                let res = await clientApp('GetInterfaceCapabilitiesRequest', args)
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByLicenseNumberRequest: async function (args) {
                console.log('FindVehicleDetailsByLicenseNumberRequest');
                let FindVehicleDetailsByLicenseNumberRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByLicenseNumberRequest[arg] = args[arg];
                })
                let res = await clientApp('FindVehicleDetailsByLicenseNumberRequest'.replace(/Request/g, ''), {FindVehicleDetailsByLicenseNumberRequest})
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByVinRequest: async function (args) {
                console.log('FindVehicleDetailsByVinRequest');
                let FindVehicleDetailsByVinRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByVinRequest[arg] = args[arg];
                })
                let res = await clientApp('FindVehicleDetailsByVinRequest'.replace(/Request/g, ''), {FindVehicleDetailsByVinRequest})
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByWorkOrderIdRequest: async function (args) {
                console.log('FindVehicleDetailsByWorkOrderIdRequest');
                let FindVehicleDetailsByWorkOrderIdRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByWorkOrderIdRequest[arg] = args[arg];
                })
                let res = await clientApp('FindVehicleDetailsByWorkOrderIdRequest'.replace(/Request/g, ''), {FindVehicleDetailsByWorkOrderIdRequest})
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByCustomerNameRequest: async function (args) {
                console.log('FindVehicleDetailsByCustomerNameRequest');
                let FindVehicleDetailsByCustomerNameRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByCustomerNameRequest[arg] = args[arg];
                })
                let res = await clientApp('FindVehicleDetailsByCustomerNameRequest'.replace(/Request/g, ''), {FindVehicleDetailsByCustomerNameRequest})
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByCustomerIdRequest: async function (args) {
                console.log('FindVehicleDetailsByCustomerIdRequest');
                let FindVehicleDetailsByCustomerIdRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByCustomerIdRequest[arg] = args[arg];
                })
                let res = await clientApp('FindVehicleDetailsByCustomerIdRequest'.replace(/Request/g, ''), {FindVehicleDetailsByCustomerIdRequest})
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            GetSystemNameRequest: async function (args) {
                console.log('GetSystemNameRequest');
                //let res = await clientApp('FindVehicleDetailsByVinRequest', args)
                let attributes = {};
                return 'Неопознанная ошибка';
            },
        }
    }
};
var xml = require('fs').readFileSync('exampleserver.wsdl', 'utf8');

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

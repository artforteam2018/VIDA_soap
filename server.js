const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');
const clientApp = require('./app');

var myService = {
    DmsService: {
        DmsServiceSoap: {
            GetInterfaceCapabilitiesRequest: async function (args) {
                console.log('GetInterfaceCapabilitiesRequest');
                let res = await clientApp('GetInterfaceCapabilitiesRequest', args);
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByLicenseNumberRequest: async function (args) {
                console.log('FindVehicleDetailsByLicenseNumberRequest');
                let FindVehicleDetailsByLicenseNumberRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByLicenseNumberRequest[arg] = args[arg];
                });
                FindVehicleDetailsByLicenseNumberRequest = await fillEmpty(FindVehicleDetailsByLicenseNumberRequest);
                let res = await clientApp('FindVehicleDetailsByLicenseNumberRequest'.replace(/Request/g, ''), {FindVehicleDetailsByLicenseNumberRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByCustomerNameRequest: async function (args) {
                console.log('FindVehicleDetailsByCustomerNameRequest');
                let FindVehicleDetailsByCustomerNameRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByCustomerNameRequest[arg] = args[arg];
                });
                FindVehicleDetailsByCustomerNameRequest = await fillEmpty(FindVehicleDetailsByCustomerNameRequest);
                let res = await clientApp('FindVehicleDetailsByCustomerNameRequest'.replace(/Request/g, ''), {FindVehicleDetailsByCustomerNameRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindCustomerDetailsByCustomerIdRequest: async function (args) {
                console.log('FindCustomerDetailsByCustomerIdRequest');
                let FindCustomerDetailsByCustomerIdRequest = {};
                Object.keys(args).forEach(arg => {
                    FindCustomerDetailsByCustomerIdRequest[arg] = args[arg];
                });
                FindCustomerDetailsByCustomerIdRequest = await fillEmpty(FindCustomerDetailsByCustomerIdRequest);
                let res = await clientApp('FindCustomerDetailsByCustomerIdRequest'.replace(/Request/g, ''), {FindCustomerDetailsByCustomerIdRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            GetVehicleHistoryByVinRequest: async function (args) {
                console.log('GetVehicleHistoryByVinRequest');
                let GetVehicleHistoryByVinRequest = {};
                Object.keys(args).forEach(arg => {
                    GetVehicleHistoryByVinRequest[arg] = args[arg];
                });
                let res = await clientApp('GetVehicleHistoryByVinRequest'.replace(/Request/g, ''), {GetVehicleHistoryByVinRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByVinRequest: async function (args) {
                console.log('FindVehicleDetailsByVinRequest');
                let FindVehicleDetailsByVinRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByVinRequest[arg] = args[arg];
                });
                let res = await clientApp('FindVehicleDetailsByVinRequest'.replace(/Request/g, ''), {FindVehicleDetailsByVinRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            FindVehicleDetailsByWorkOrderIdRequest: async function (args) {
                console.log('FindVehicleDetailsByWorkOrderIdRequest');
                let FindVehicleDetailsByWorkOrderIdRequest = {};
                Object.keys(args).forEach(arg => {
                    FindVehicleDetailsByWorkOrderIdRequest[arg] = args[arg];
                });
                FindVehicleDetailsByWorkOrderIdRequest = await fillEmpty(FindVehicleDetailsByWorkOrderIdRequest);
                let res = await clientApp('FindVehicleDetailsByWorkOrderIdRequest'.replace(/Request/g, ''), {FindVehicleDetailsByWorkOrderIdRequest});
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
                FindVehicleDetailsByCustomerIdRequest = await fillEmpty(FindVehicleDetailsByCustomerIdRequest);
                let res = await clientApp('FindVehicleDetailsByCustomerIdRequest'.replace(/Request/g, ''), {FindVehicleDetailsByCustomerIdRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            GetPartDetailsRequest: async function (args) {
                console.log('GetPartDetailsRequest');
                let GetPartDetailsRequest = {};
                Object.keys(args).forEach(arg => {
                    GetPartDetailsRequest[arg] = args[arg];
                })
                GetPartDetailsRequest = await fillEmpty(GetPartDetailsRequest);
                let res = await clientApp('GetPartDetailsRequest'.replace(/Request/g, ''), {GetPartDetailsRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;

            },
            CreateWorkOrderRequest: async function (args) {
                console.log('CreateWorkOrderRequest');
                let CreateWorkOrderRequest = {};
                Object.keys(args).forEach(arg => {
                    CreateWorkOrderRequest[arg] = args[arg];
                })
                CreateWorkOrderRequest = await fillEmpty(CreateWorkOrderRequest);
                let res = await clientApp('CreateWorkOrderRequest'.replace(/Request/g, ''), {CreateWorkOrderRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            UpdateWorkOrderRequest: async function (args) {
                console.log('UpdateWorkOrderRequest');
                let UpdateWorkOrderRequest = {};
                Object.keys(args).forEach(arg => {
                    UpdateWorkOrderRequest[arg] = args[arg];
                });
                UpdateWorkOrderRequest = await fillEmpty(UpdateWorkOrderRequest);
                let res = await clientApp('UpdateWorkOrderRequest'.replace(/Request/g, ''), {UpdateWorkOrderRequest});
                let attributes = {};
                res.return.attributes = attributes;
                return res.return;
            },
            GetSystemNameRequest: async function (args) {
                console.log('GetSystemNameRequest');
                //let res = await clientApp('FindVehicleDetailsByVinRequest', args)
                let attributes = {};
                return 'DMS 1C';
            },
        }
    }
};

async function fillEmpty(obj) {
    await Promise.all(Object.keys(obj).map(key => {
        return new Promise(async resolve => {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                obj[key] = await fillEmpty(obj[key])
            } else if (obj[key] === null) {
                obj[key] = 0
            }
            resolve(obj[key]);
        })
    }))
    return obj;
}

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

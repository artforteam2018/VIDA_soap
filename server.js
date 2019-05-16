const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');

var myService = {
  DmsService: {
    DmsServiceSoap: {
      GetInterfaceCapabilitiesRequest: function (args) {
        console.log('GetInterfaceCapabilitiesRequest')
        return {name: true};
      },

      // This is how to define an asynchronous function with a callback.
      MyAsyncFunction: function (args, callback) {
        // do some work
        callback({
          name: args.name
        });
      },

      // This is how to define an asynchronous function with a Promise.
      MyPromiseFunction: function (args) {
        return new Promise((resolve) => {
          // do some work
          resolve({
            name: args.name
          });
        })
            ;
      },

      // This is how to receive incoming headers
      HeadersAwareFunction: function (args, cb, headers) {
        return {
          name: headers.Token
        };
      },

      // You can also inspect the original `req`
      reallyDetailedFunction: function (args, cb, headers, req) {
        console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
        return {
          name: headers.Token
        };
      }
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

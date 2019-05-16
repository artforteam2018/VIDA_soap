var soap = require('soap');
var url = 'example.wsdl';

var args = {UserInfo: {UserId: 'Гридина О. Е.', Password: 'Jkmuf7404'}, Properties: {Property: {Key: '', Value: ''}}};
soap.createClient(url, function(err, client) {
  client.GetInterfaceCapabilitiesRequest(args, function(err, result) {
    console.log(result);
  });
});


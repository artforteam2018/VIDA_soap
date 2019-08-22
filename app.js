var soap = require('soap');
var url = 'example.wsdl';

var args = {UserInfo: {UserId: 'Гридина О. Е.', Password: 'Jkmuf7404'}, Properties: {Property: {Key: '', Value: ''}}};

module.exports = (func, argus) => {
    return new Promise((resolve, reject) => {
        soap.createClient(url, function (err, client) {
            try {
                client[func](argus, function (err, result) {
                    if (err) {
                        console.log(err.response.request.body.split('>').join('>\n'))
                        reject(err)
                    }
                    resolve(result)
                });
            } catch (e) {
                
            }
        });
    })
};



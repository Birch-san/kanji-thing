var parseString = require('xml2js').parseString;

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/whatever.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});
var _ = require('lodash');
var util = require('util');
var fs = require('fs');
var lineReader = require('line-reader');
var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

// download from:
// http://ftp.monash.edu.au/pub/nihongo/kanjidic.gz
var kanjiDicFilePath = 'kanjidic.gz';

var kanjidicFile;
try {
    // Query the entry
    kanjidicFile = fs.lstatSync(kanjiDicFilePath);
	
	if (!kanjidicFile.isFile()) {
		throw new Error("That ain't a file");
	}
} catch (error) {
	console.error(util.format("No file '%s' found; please copy it in for me.", kanjiDicFilePath));
	console.error(error);
	process.exit(1);
}

var henshallMax = 1450;

var accumulator = [];

function transform(entry) {
  var fields = entry.split(' ');
  var kanji = fields[0];
  var jisCodeHex = parseInt(fields[1], 16);
  
  var otherFields = fields.slice(2);
  
  var eNumberRegex = /E(\d+)/;
  
  var eIndex = _.find(otherFields, function(kanjiIndex) {
    return kanjiIndex.match(eNumberRegex);
  });
  // no eIndex? no use
  if (eIndex === undefined) {
    return undefined;
  }
  var eNumber = +eIndex.match(eNumberRegex)[1];
  
  return {
    eNumber: eNumber,
    kanji: kanji
  };
}

var sampleAll = true;
var skippedFirstLine = false; 

lineReader.eachLine(kanjiDicFilePath, function(line) {
  // that darned header
  if (!skippedFirstLine) {
    skippedFirstLine = true;
    // skip to next
    return true;
  }
  
  var parsed = transform(line);
  // could not be parsed?
  if (parsed === undefined) {
    // skip to next
    return true;
  }
  
  if (parsed.eNumber <= henshallMax) {
    accumulator.push(parsed);
  }
  
  return sampleAll;
},
"\n",
"eucjp")
.then(function () {
  console.log(accumulator);
  process.exit(0);
});

// fs.readFile(kanjiDicFilePath,
// 	{
// 		encoding: 'utf8'
// 	},
// 	function (error, data) {
// 		if (error) {
// 			throw error;
// 		}
		
// 		// split by line break into an array of strings
// 		var split = subject.split(/\r?\n/);
		
// 		// just grab the first one (for example)
// 		var sample = split[0];
		
// 		console.log(sample);
// 		console.log(JSON.parse(sample));
// 	});
var _ = require('lodash');
var util = require('util');
var fs = require('fs');
var lineReader = require('line-reader');

var kanjiDicFilePath = 'kanjidic.json';

var kanjidicJsonFile;
try {
    // Query the entry
    kanjidicJsonFile = fs.lstatSync(kanjiDicFilePath);
	
	if (!kanjidicJsonFile.isFile()) {
		throw new Error("That ain't a file");
	}
} catch (error) {
	console.error(util.format("No file '%s' found; please copy it in for me.", kanjiDicFilePath));
	console.error(error);
	process.exit(1);
}

var henshallMax = 1450;

var accumulator = [];

function transform(entry, eNumber) {
  return {
    eNumber: eNumber,
    kanji: entry.ki[0]
  };
}

var sampleAll = true; 

lineReader.eachLine(kanjiDicFilePath, function(line) {
  var parsed = JSON.parse(line);
  console.log(Object.keys(parsed));
  console.log(parsed.gs);
  var kanjiIndices = parsed.gs[0].split(" ");
  console.log(kanjiIndices);
  var eIndex = _.find(kanjiIndices, function(kanjiIndex) {
    return kanjiIndex.match(/E(\d+)/);
  });
  var eNumber = +eIndex.match(/E(\d+)/)[1];
  
  if (eNumber <= henshallMax) {
    accumulator.push(transform(parsed, eNumber));
  }
  
  return sampleAll;
})
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
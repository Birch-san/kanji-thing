var _ = require('lodash');
var util = require('util');
var fs = require('fs');

var kanjiDicFilePath = './kanjidic.json';

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

fs.readFile(kanjiDicFilePath,
	{
		encoding: 'utf8'
	},
	function (error, data) {
		if (error) {
			throw error;
		}
		
		// split by line break into an array of strings
		var split = subject.split(/\r?\n/);
		
		// just grab the first one (for example)
		var sample = split[0];
		
		console.log(sample);
		console.log(JSON.parse(sample));
	});
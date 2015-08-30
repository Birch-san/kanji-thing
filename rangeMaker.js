var _ = require("lodash"); // load in module "lodash" from node_modules folder (assuming it's installed) and assign it to the variable `_`
var lineReader = require('line-reader');

var linesFilePath = "theLines.txt";

var accumulator = [];

lineReader.eachLine(linesFilePath, function(line) {
	var parts = line.split("-"); // Split the string "1-3" by the delimiter "-". Assign the resulting list of results to `parts`
	var rangeStart = parts[0]; // "1"
	var rangeStartNum = +rangeStart; // 1
	var rangeEnd = parts[1]; // "3"
	var rangeEndNum = +rangeEnd; // 3
	var rangeEndInclusive = rangeEndNum+1; // 4
	var arrayOfPages = _.range(rangeStartNum, rangeEndInclusive) // start at 1, end before 4

	accumulator.push(arrayOfPages);

	return true;
})
.then(function () {
  // console.log(accumulator);
  var accumulator2 = "";
  // console.log(_.reduce(accumulator, function(accumulator2, iterand) {
  // 	return accumulator2+"\n"+iterand.join(",");
  // }), accumulator2);

	var firstPage = 1;

	console.log(_.map(accumulator, function(iterand, index) {
		return Array(iterand.length).join(index+firstPage)
	}).join("\n"));
  process.exit(0);
});
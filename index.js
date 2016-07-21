var saw = require('string-saw'),
	delimiterRegEx = /\(|\)|\[|\]| |-/g,
	abbreviationRegExp = /^(.\.?(?:\b|\.))+$/,
	forceCapitalizeRegExp = /^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|ltd)$/i;

function capitalize (s) {
	if (s.match(forceCapitalizeRegExp) || s.match(abbreviationRegExp)) {
		return s.toUpperCase();
	} else {
		return s.substr(0,1).toUpperCase() + s.substr(1);
	}
}

function prettyName (name) {
	var $name = saw(name),
		delimiters = $name.match(delimiterRegEx).toArray();

	return $name
		.lowerCase()
		.split(delimiterRegEx)
		.map(capitalize)
		.join(function (item, index) {
			return delimiters[index];
		})
		.toString();
}

module.exports = prettyName;
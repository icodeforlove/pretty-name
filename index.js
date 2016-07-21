var saw = require('string-saw'),
	delimiterRegEx = /\(|\)|\[|\]| |-|'|"|,|\/|\\/g,
	abbreviationRegExp = /^(.\.?(?:\b|\.))+$/,
	forceCapitalizeRegExp = /^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|ltd)\.?$/i,
	forceLowerCaseRegExp = /\b(?:af|an|of|della|van|von|vos|de|di|da|du|et|el|la|der|den|del|dal|dem|des|dei|dos|der|to|the|ten|ter|and|met|delle|dalla|degli|il)$\b/i,
	forceLowerCaseFullMatchRegExp = new RegExp('^' + forceLowerCaseRegExp.source + '$', forceLowerCaseRegExp.flags),
	forceSingleLetterLowerCaseRegExp = /^(?:y|e)$/i,
	forceFormatting = {
		// maybe just fill this up with hard coded logic?
		le: 'Le'
	},
	forceFormatRegExp = new RegExp('^(?:' + Object.keys(forceFormatting).join('|') + ')$', 'i'),
	skipCapitalizedPrefixesRegExp = /^(?:[A-Z][a-z]{1,2}|[A-Z]{1,2})[A-Z][a-z]/,
	skipCapitalizedAbbreviationsRegExp = /^[A-Z]{2,3}$/,
	capitalsRegExp = /[A-Z]/g;

function capitalizeWordInName (s, index, array, source, delimiters) {
	// skip
	var capitalizedLetters = source.match(capitalsRegExp),
		capitalizedPercentage = capitalizedLetters ? capitalizedLetters.length / source.length : 0,
		isFirstWord = index === 0,
		isLastWord = index === array.length - 1,
		totalWords = array.length,
		previousDelimiter = delimiters[index - 1],
		nextDelimiter = delimiters[index];

	// skip manuiplation
	if (!forceLowerCaseFullMatchRegExp.test(s) && (
		// we only want to apply these changes if it looks like the whole string is not capitalized
		skipCapitalizedPrefixesRegExp.test(s) ||
		(capitalizedPercentage < 0.7 && skipCapitalizedAbbreviationsRegExp.test(s))
	)) {
		return s;
	}

	s = s.toLowerCase();

	// enforce a format for a word
	if (!isFirstWord && !isLastWord && (
		forceFormatRegExp.test(s)
	)) {
		return forceFormatting[s.toLowerCase()];
	}

	if (!isFirstWord && !isLastWord && nextDelimiter !== '-' && (
		forceLowerCaseFullMatchRegExp.test(s) ||
		(forceSingleLetterLowerCaseRegExp.test(s) && totalWords > 3 && !forceLowerCaseRegExp.test(source))
	)) {
		return s;
	} else if (forceCapitalizeRegExp.test(s) || abbreviationRegExp.test(s)) {
		return s.toUpperCase();
	} else {
		return capitalize(s);
	}
}

function capitalize (s) {
	return s.substr(0,1).toUpperCase() + s.substr(1);
}

function getDerivative(string) {
	return saw(string)
		.match(/^(?:After|Attributed to|Studio of|Manner of|Follower of|School of)/i)
		// correct capitalization
		.replace(/^(\S+)(?: (\S+))?$/,function (source, m1, m2) {
			return capitalize(m1) + (m2 ? ' ' + m2.toLowerCase() : '');
		})
		.toString();
}

function removeDerivative(string) {
	return string.replace(/\b(?:After|Attributed to|Studio of|Manner of|Follower of|School of) /i, '');
}

function prettyName (name) {
	name = name || '';

	var derivative = getDerivative(name);
	if (derivative) {
		name = removeDerivative(name);
	}

	var $name = saw(name),
		delimiters = $name.match(delimiterRegEx).toArray();

	name = $name
		.split(delimiterRegEx)
		.map(function (s, index, array) {
			return capitalizeWordInName(s, index, array, name, delimiters);
		})
		.join(function (item, index) {
			return delimiters[index];
		})
		// fix derivative artist names
		.replace(/^Attributed to/i, 'Attributed to')
		.replace(/^Follower of/i, 'Follower of')
		.replace(/^School of/i, 'School of')
		.replace(/^Manner of/i, 'Manner of')
		.replace(/^Studio of/i, 'Studio of')
		.replace(/^The /i, 'The ')
		// repair apostrophe usage
		.replace(/(\S)'s\b/gi, '$1\'s')
		.replace(/(\S)'u\b/gi, '$1\'u')
		.replace(/\b(d|dell)'/gi, function (source, m1) {
			return m1.toLowerCase() + '\'';
		})
		.toString();

	if (derivative) {
		name = derivative + ' ' + name;
	}

	return name;
}

module.exports = prettyName;
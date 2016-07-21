/**
 * prettyName.js v0.0.2
 */
var prettyName =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var saw = __webpack_require__(1),
		delimiterRegEx = /\(|\)|\[|\]| |-|'|"|,|\/|\\/g,
		abbreviationRegExp = /^(.\.?(?:\b|\.))+$/,
		forceCapitalizeRegExp = /^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|ltd)$/i,
		forceLowerCaseRegExp = /^(?:af|an|of|della|van|von|vos|de|di|da|du|et|el|la|der|den|del|dal|dem|des|dei|dos|der|to|the|ten|ter|and|met|delle|dalla|degli|il)$/i,
		forceFormatting = {
			// maybe just fill this up with hard coded logic?
			le: 'Le'
		},
		forceFormatRegExp = new RegExp('^(?:' + Object.keys(forceFormatting).join('|') + ')$', 'i'),
		skipCapitalizedPrefixesRegExp = /^(?:[A-Z][a-z]{1,2}|[A-Z]{1,2})[A-Z][a-z]/,
		skipCapitalizedAbbreviationsRegExp = /^[A-Z]{2,3}$/,
		capitalsRegExp = /[A-Z]/g;
	
	function capitalizeWordInName (s, index, array, source) {
		// skip
		var capitalizedLetters = source.match(capitalsRegExp),
			capitalizedPercentage = capitalizedLetters ? capitalizedLetters.length / source.length : 0,
			isFirstWord = index === 0,
			isLastWord = index === array.length - 1,
			totalWords = array.length;
	
		// skip manuiplation
		if (!forceLowerCaseRegExp.test(s) && (
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
	
		if (!isFirstWord && !isLastWord && (
			s.match(forceLowerCaseRegExp) ||
			// spanish y
			(s.match(/^y$/i) && totalWords > 3)
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
				return capitalizeWordInName(s, index, array, name);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Saw = __webpack_require__(2);
	
	module.exports = function (string) {
		return new Saw(string);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Matches = __webpack_require__(3);
	
	/**
	 * Escapes a string to be used within a RegExp
	 *
	 * @param  {String} string
	 * @return {String}
	 */
	function escapeRegExp (string) {
	  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}
	
	function toArray (object) {
		return Array.prototype.slice.call(object);
	}
	
	function Saw (object) {
		if (Array.isArray(object)) {
			this._context = object.slice(0);
		} else if (object instanceof Matches) {
			this._context = object.clone();
		} else {
			this._context = object;
		}
	}
	
	function argumentsToArray (args) {
		var result;
	
		if (args.length > 1) {
			result = toArray(args);
		} else if (Array.isArray(args[0])) {
			result = args[0];
		} else {
			result = [args[0]];
		}
	
		return result;
	}
	
	Saw.prototype = {
		match: function (match) {
			var matchArray = argumentsToArray(arguments),
				saw = new Saw(this._context),
				context = this._contextToString(this._context);
	
			matchArray.some(function (match) {
				var matches = typeof match === 'function' ? match(context) : context.match(match);
	
				if (!matches) {
					saw._context = '';
				} else {
					saw._context = new Matches(matches, match);
					return true;
				}
			});
	
			return saw;
		},
	
		has: function (match) {
			return this.match(match).first().toBoolean();
		},
	
		item: function (index) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches) {
				saw._context = saw._context.item(index);
			} else if (Array.isArray(saw._context)) {
				saw._context = saw._context[index] || '';
			}
	
			return saw;
		},
	
		itemFromRight: function (index) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches || Array.isArray(saw._context)) {
				var length = saw._context.length;
	
				index = length - 1 - index;
				if (index >= 0) {
					saw = saw.item(index);
				}
			}
	
			return saw;
		},
	
		first: function (index) {
			var saw = new Saw(this._context);
	
			return saw.item(0);
		},
	
		last: function () {
			var saw = new Saw(this._context);
	
			return saw.itemFromRight(0);
		},
	
		replace: function (match, replacement) {
			var saw = new Saw(this._context);
	
			if (Array.isArray(saw._context)) {
				saw._context = saw._context.map(function (string) {
					return string.replace(match, replacement);
				});
			} else {
				saw._context = this._contextToString(this._context).replace(match, replacement);
			}
	
			return saw;
		},
	
		join: function (separator) {
			var saw = new Saw(this._context);
	
			if (Array.isArray(saw._context)) {
				var result = '';
				saw._context.forEach(function (item, index, array) {
					var currentSeparator = typeof separator == 'function' ? separator(item, index, array) : separator || '';
					result += item + (array.length - 1 == index ? '' : currentSeparator);
				});
				saw._context = result;
			}
	
			return saw;
		},
	
		each: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			array.forEach(function (item, index) {
				if (item) {
					func.bind(thisArg)(item, index, array);
				}
			});
	
			return saw;
		},
	
		map: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.map(function (item, index) {
				return func.bind(thisArg)(item, index, array);
			});
	
			return saw;
		},
	
		reduce: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = String(array.reduce(function (previousValue, currentValue, index, array) {
				return func.bind(thisArg)(previousValue, currentValue, index, array);
			}));
	
			return saw;
		},
	
		reverse: function () {
			var saw = new Saw(this._context);
	
			if (typeof saw._context === 'string') {
				saw._context = saw._context.split('').reverse().join('');
			} else if (Array.isArray(saw._context)) {
				saw._context = saw._context.reverse();
			} else if (saw._context instanceof Matches) {
				var array = saw.toArray();
				if (array.length === 1) {
					saw._context = (array[0] || '').split('').reverse().join('');
				} else {
					saw._context = saw.toArray().reverse();
				}
			}
	
			return saw;
		},
	
		lowerCase: function (func) {
			return this.mapStringMethodAgainstContext('toLowerCase', func);
		},
	
		upperCase: function (func) {
			return this.mapStringMethodAgainstContext('toUpperCase', func);
		},
	
		mapStringMethodAgainstContext: function (methodName, func) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.map(function (item, index) {
				return item ? String(item)[methodName]() : item;
			});
	
			return saw;
		},
	
		filter: function (match, thisArg) {
			var saw = new Saw(this._context);
	
			// default filter
			match = match || function (item) {return item};
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.filter(function (item, index) {
				if (typeof match === 'function') {
					return match.bind(thisArg)(item, index, array);
				} else {
					return item.match(match);
				}
			});
	
			return saw;
		},
	
		remove: function () {
			var saw = new Saw(this._context);
	
			var context = saw.toArray(),
				matches = toArray(arguments);
	
			context = context.map(function (context) {
				matches.forEach(function (match) {
					match = typeof match === 'string' ? new RegExp(escapeRegExp(match), 'g') : match;
					context = context.replace(match, '');
				});
	
				return context;
			});
	
			saw._context = context;
	
			return saw;
		},
	
		trim: function () {
			var saw = new Saw(this._context);
	
			var context = Array.isArray(saw._context) ? saw._context : saw.toArray(saw._context);
	
			saw._context = context.map(function (item) {
				return item ? item.trim() : item;
			});
	
			return saw;
		},
	
		split: function (separator) {
			var saw = new Saw(this._context);
	
			saw._context = saw._contextToString(saw._context).split(separator);
	
			return saw;
		},
	
		slice: function (begin, end) {
			var saw = new Saw(this._context);
	
			saw._context = saw._context.slice(begin, end);
	
			return saw;
		},
	
		toString: function () {
			return this._contextToString(this._context);
		},
	
		toArray: function () {
			if (Array.isArray(this._context)) {
				return toArray(this._context);
			} else if (this._context instanceof Matches) {
				return this._context.toArray();
			} else {
				return this.toBoolean() ? [this._context] : [];
			}
		},
	
		toNumber: function () {
			var result = this.toFloat();
	
			return isNaN(result) ? 0 : result;
		},
	
		toFloat: function () {
			var string = this.trim().toString(),
				result = parseFloat(string, 10);
	
			if (isNaN(result) || string.length != String(result).length) {
				return NaN;
			} else {
				return result;
			}
		},
	
		toInt: function () {
			var string = this.trim().toString(),
				result = parseInt(string, 10);
	
			if (isNaN(result) || string.length != String(result).length) {
				return NaN;
			} else {
				return result;
			}
		},
	
		toBoolean: function () {
			return !!this.toString();
		},
	
		toObject: function () {
			var props = argumentsToArray(arguments),
				array = this.toArray(),
				object = {};
	
			props.forEach(function (value, index) {
				if (typeof value !== 'undefined' && typeof array[index] != 'undefined') {
					object[value] = array[index] ;
				}
			});
	
			return object;
		},
	
		indexOf: function (match) {
			var saw = new Saw(this._context),
				index = this.indexesOf(match).shift();
	
			return typeof index !== 'undefined' ? index : -1;
		},
	
		indexesOf: function (match) {
			var saw = new Saw(this._context),
				indexes = [];
	
			if (Array.isArray(this._context)) {
				this._context.forEach(function (item, i) {
					if (String(item).match(match) || typeof match === 'function' && match(item)) {
						indexes.push(i);
					}
				});
			} else if (typeof this._context === 'string') {
				var pattern = new RegExp(
					match instanceof RegExp ? match.source : escapeRegExp(match),
					match instanceof RegExp ? (String(match.flags).match(/g/) ? (match.flags || '') :(match.flags || '') + 'g') : 'g'
				);
	
				while (match = pattern.exec(this._context)) {
					indexes.push(match.index);
				}
			}
	
			return indexes;
		},
	
		length: function () {
			if (!this._context) {
				return 0;
			} else {
				return this._context.length;
			}
		},
	
		_contextToString: function (context) {
			if (typeof context === 'string') {
				return context;
			} else if (context instanceof Matches) {
				return context.toString();
			} else if (Array.isArray(context)) {
				return context.join('');
			}
	
			return '';
		}
	};
	
	module.exports = Saw;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	function Matches (matches, match) {
		if (!matches) return null;
	
		this.match = match;
	
		if (match instanceof RegExp && !match.global && match.length > 1) {
			this.matches = matches.slice(1);
		} else {
			this.matches = matches;
		}
	
		this.length = this.matches.length;
	}
	Matches.prototype = {
		item: function (index) {
			var string;
	
			if (this.matches.length === 1) {
				string = this.matches[0];
			} else if (this.matches.length > 1) {
				string = this.matches[this.match.global ? index : index + 1];
			}
	
			return string || '';
		},
	
		slice: function (begin, end) {
			var results = [];
	
			if (this.matches.length === 1 || this.match.global) {
				results = this.matches.slice(begin, end);
			} else if (this.matches.length > 1) {
				results = this.matches.slice(begin + 1, end);
			}
	
			return results;
		},
	
		toArray: function (begin, end) {
			var results = [];
	
			if (this.matches.length === 1 || this.match.global) {
				results = this.matches.slice(0);
			} else if (this.matches.length > 1) {
				results = this.matches.slice(1);
			}
	
			return results;
		},
	
		toString: function () {
			var string = '';
	
			if (this.matches.length === 1) {
				string = this.matches[0];
			} else {
				this.matches.forEach(function (item) {
					if (item) {
						string += item;
					}
				});
			}
	
			return string;
		},
	
		clone: function () {
			var matches = new Matches(null)
			matches.match = this.match;
			matches.matches = Array.prototype.slice.call(this.matches);
			matches.length = this.length;
			return matches;
		}
	};
	
	module.exports = Matches;

/***/ }
/******/ ])
//# sourceMappingURL=prettyName.js.map
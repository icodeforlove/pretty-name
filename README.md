# pretty-name [![Build Status](https://travis-ci.org/icodeforlove/pretty-name.png?branch=master)](https://travis-ci.org/icodeforlove/pretty-name)

provides an easy way to do mostly correct capilization to international names, much better than just captializing the first letter of every word.

## install

```
npm install pretty-name
```

or

```
bower install pretty-name
```

## examples

```javascript
var prettyName = require('pretty-name');

prettyName('andy warhol') // => Andy Warhol
prettyName('issam el-said') // => Issam El-Said
prettyName('byun jong-ha') // => Byun Jong-Ha
prettyName('armand le veel') // => Armand Le Veel
prettyName('dora de larios') // => Dora de Larios
prettyName('fernand allard-l\'olivier') // => Fernand Allard-L\'Olivier
prettyName('pietro di francesco degli orioli') // => Pietro di Francesco degli Orioli
```

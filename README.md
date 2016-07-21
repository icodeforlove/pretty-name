# pretty-name [![Build Status](https://travis-ci.org/icodeforlove/pretty-name.png?branch=master)](https://travis-ci.org/icodeforlove/pretty-name)

provides an easy way to do proper capilization to names

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

prettyName('ANDY WARHOL') // => Andy Warhol
prettyName('ANDY WARHOL III') // => Andy Warhol III
prettyName('NADINE BOUDKOVSKI-KIBALTCHITCH') // => Nadine Boudkovski-Kibaltchitch
```
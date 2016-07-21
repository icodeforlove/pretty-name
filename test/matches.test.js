var prettyName = require('../index');

describe('General', function() {
	it('can make pretty names', function() {
		expect(prettyName('andy warhol')).toEqual('Andy Warhol');
		expect(prettyName('ANDY WARHOL')).toEqual('Andy Warhol');
		expect(prettyName('ANDY (WARHOL)')).toEqual('Andy (Warhol)');
		expect(prettyName('HEUNG-SOU KIM')).toEqual('Heung-Sou Kim');
		expect(prettyName('Andres L. Santiago')).toEqual('Andres L. Santiago');
		expect(prettyName('andres l Santiago')).toEqual('Andres L Santiago');
		expect(prettyName('Andres l.s.')).toEqual('Andres L.S.');
		expect(prettyName('Andres l.s')).toEqual('Andres L.S');
	});
});

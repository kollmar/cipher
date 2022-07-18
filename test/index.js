const encrypt = require('../index.js').encrypt;
const { e_mail, key } = require('./data.js').data;
const test_checkHexValue = 'eaaacff9df2e4c2a63083a303d4521f0bd41e375232a2895310179bc030addfb';

const hex_encrypt = encrypt(key, e_mail, 'hex');

if (hex_encrypt !== test_checkHexValue) {
	console.log('invalid encrypted value!');
	console.table({
		'should be: ': test_checkHexValue,
		'is': hex_encrypt
	});
}

console.log('encrytion correct: ', hex_encrypt);
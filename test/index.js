const {encrypt, decrypt} = require('../index.js');
const { e_mail, key } = require('./data.js').data;
const test_checkHexValue = 'eaaacff9df2e4c2a63083a303d4521f0bd41e375232a2895310179bc030addfb';

const encrypted = encrypt(key, e_mail, 'hex');
const hex_encrypted = encrypted.toHex();

if (hex_encrypted !== test_checkHexValue) {
	console.log('invalid encrypted value!');
	console.table({
		'should be: ': test_checkHexValue,
		'is': hex_encrypted
	});
}

const decrypted = decrypt(key, encrypted);

if (decrypted.data !== e_mail) {
	console.log('invalid decrypted value!');
	console.table({
		'should be: ': e_mail,
		'is': decrypted.data
	});
}

console.table({ test_content: e_mail, decrypt: decrypted.data });
const { Buffer } = require('buffer');
const forge = require('node-forge');
const encoder = new TextEncoder();

const encrypt = (apisecret, message, type) => {
	const keybytes = encoder.encode(apisecret);
	const buf_keybytes = Buffer.from(keybytes, 'utf8');
	const key_byteBuffer = forge.util.createBuffer(buf_keybytes.slice(0,16), 'utf8');
	
	const iv = Buffer.alloc(16);
	const iv_byteBuffer = forge.util.createBuffer(iv);

	const message_buffer = forge.util.createBuffer(message, 'utf8');
	
	const cipher = forge.cipher.createCipher('AES-CBC', key_byteBuffer);

	cipher.start({ iv:  iv_byteBuffer});
	cipher.update(message_buffer);
	cipher.finish();

	const encrypted = cipher.output;
	const convertOutput = {
		hex: encrypted.toHex(),
		default: encrypted
	}
	return convertOutput[type || 'default'];
}

module.exports = {
	encrypt,
}

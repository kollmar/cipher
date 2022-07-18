const { Buffer } = require('buffer');
const forge = require('node-forge');
const encoder = new TextEncoder();

const encrypt = (apisecret, message) => {
	const key_byteBuffer = get_secret_byte_buffer(apisecret);
	const iv_byteBuffer = create_initial_vector(16);

	const message_buffer = forge.util.createBuffer(message, 'utf8');
	
	const cipher = forge.cipher.createCipher('AES-CBC', key_byteBuffer);

	cipher.start({ iv:  iv_byteBuffer});
	cipher.update(message_buffer);
	cipher.finish();

	return cipher.output;
}

const decrypt = (apisecret, message) => {
	const key_byteBuffer = get_secret_byte_buffer(apisecret);
	const iv_byteBuffer = create_initial_vector(16);

	const decipher = forge.cipher.createDecipher('AES-CBC', key_byteBuffer);

	decipher.start({ iv: iv_byteBuffer });
	decipher.update(message);
	decipher.finish();

	return decipher.output;
}

const get_secret_byte_buffer = (secret, options = { slice: [0, 16] }) => {
	const { slice } = options;
	const secret_content = encoder.encode(secret);
	let buf_keybytes = Buffer.from(secret_content, 'utf8');

	if (slice !== undefined && slice.length !== 0) {
		const [begin, end] = slice;
		buf_keybytes = buf_keybytes.slice(begin, end);
	}
	
	return forge.util.createBuffer(buf_keybytes, 'utf8');
}

const create_initial_vector = (length) => {
	const iv = Buffer.alloc(length);
	return forge.util.createBuffer(iv);
}

module.exports = { encrypt, decrypt };
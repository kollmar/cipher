const { Buffer } = require('buffer');
const forge = require('node-forge');
const encoder = new TextEncoder();

class Cipher {
	constructor(secret, message) {
		this.secret = secret;
		this.message = message;
	}

	encrypt(apisecret = this.secret, message = this.message) {
		const key_byteBuffer = this.#get_secret_byte_buffer(apisecret);
		const iv_byteBuffer = this.#create_initial_vector(16);
	
		const message_buffer = forge.util.createBuffer(message, 'utf8');
		
		const cipher = forge.cipher.createCipher('AES-CBC', key_byteBuffer);
	
		cipher.start({ iv:  iv_byteBuffer});
		cipher.update(message_buffer);
		cipher.finish();
	
		return cipher.output;
	}
	
	decrypt(apisecret = this.secret, encrypted_message) {
		encrypted_message = encrypted_message || this.encrypt(apisecret, this.message);
		const {
			secret: key_byteBuffer,
			iv: iv_byteBuffer
		} = this.#get_byte_buffer_secret_and_iv(apisecret, 16);
		
		const decipher = forge.cipher.createDecipher('AES-CBC', key_byteBuffer);
	
		decipher.start({ iv: iv_byteBuffer });
		decipher.update(encrypted_message);
		decipher.finish();
	
		return decipher.output;
	}
	
	#get_secret_byte_buffer(secret, options = { slice: [0, 16] }) {		
		const { slice } = options;
		const secret_content = encoder.encode(secret);
		let buf_keybytes = Buffer.from(secret_content, 'utf8');
	
		if (slice !== undefined && slice.length !== 0) {
			const [begin, end] = slice;
			buf_keybytes = buf_keybytes.slice(begin, end);
		}
		
		return forge.util.createBuffer(buf_keybytes, 'utf8');
	}
	
	#create_initial_vector (length) {
		const iv = Buffer.alloc(length);
		return forge.util.createBuffer(iv);
	}

	#get_byte_buffer_secret_and_iv(secret, length) {
		return {
			secret: this.#get_secret_byte_buffer(secret),
			iv: this.#create_initial_vector(length),
		}
	}
}

module.exports = {
	Cipher
}
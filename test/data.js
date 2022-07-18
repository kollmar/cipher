const data = require('./test.json');
const e_mail = data.mail;
const key = 'your api secret key';

module.exports = {
	data: { e_mail, key },
}
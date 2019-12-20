const dotenv = require('dotenv');

dotenv.config();
module.exports = {
	URLDB: process.env.URLDB,
	PORT: process.env.PORT,
};
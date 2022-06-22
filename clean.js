const clean = async (client, text) => {

	if (text && text.constructor.name == "Promise") text = await text;

	if (typeof text !== "string")
		text = require("util").inspect(text, { depth: 1 });

	text = text
		.replace(/`/g, "`" + String.fromCharCode(8203))
		.replace(/@/g, "@" + String.fromCharCode(8203))
		.replaceAll(client.token, "T0$&N^");


	return text;
};
module.exports = clean;

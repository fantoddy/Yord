const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "queueEnd",
	execute(queue) {
		queue.metadata.channel.send({
			embeds: [
				new MessageEmbed()

					.setDescription("🎶 | A fila terminou, deixando o canal agora.")
					.setColor(`YELLOW`),
			],
		});
	},
};

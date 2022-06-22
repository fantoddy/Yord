const {
	MessageEmbed,
	MessageActionRow: row,
	MessageButton: button,
} = require("discord.js");
module.exports = {
	name: "trackStart",
	execute(queue, track, client) {
		const rw = new row().addComponents(
			new button().setCustomId("back").setEmoji("<:emoji_4:938854190225170492>").setStyle("PRIMARY"),
			new button().setCustomId("pause").setEmoji("<:emoji_2:938854180272103454>").setStyle("SUCCESS"),
			new button().setCustomId("resume").setEmoji("<:emoji_1:938854196923469824>").setStyle("SUCCESS"),
			new button().setCustomId("shuffle").setEmoji("<:emoji_7:938855831678648410>").setStyle("SUCCESS"),
			new button().setCustomId("skip").setEmoji("<:emoji_3:938854193916170281>").setStyle("PRIMARY")
		);
		const rw2 = new row().addComponents(
			new button().setCustomId("mute").setEmoji("<:emoji_5:938854186748112926>").setStyle("DANGER"),
			new button()
				.setCustomId("volume-down")
				.setEmoji("<:emoji_88:938859874681520258>")
				.setStyle("SUCCESS"),
			new button().setCustomId("volume-up").setEmoji("<:emoji_6:938854197938520135>").setStyle("SUCCESS"),
			new button().setCustomId("filters").setEmoji("<:emoji_13:938854195749068811>").setStyle("SUCCESS"),
			new button().setCustomId("stop").setEmoji("<:emoji_8:938854198504738837>").setStyle("DANGER")
		);
		queue.metadata.channel.send({
			embeds: [
				new MessageEmbed()
					.setColor(`GREEN`)
					.setTitle(`🎶 | Em reprodução`)
					.setDescription(`**${track.title}**`)
					
					.addField(`URAÇÃO`, `${track.duration}s`, true)
					.addField(`SOLICITANTE`, `${track.requestedBy.username}`, true)
					.addField(`VIEWS`, track.views.toLocaleString(), true)
					.addField(`URL`, `**[Click Here](${track.url})**`)
					.addField(`ARTISTA`, track.author, true)
        .setImage("https://cdn.discordapp.com/attachments/977588279463530516/988829952516423780/standard.gif")
        
			],
			components: [rw, rw2],
		});
	},
};

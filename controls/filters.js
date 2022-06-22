const { MessageButton: Btn, MessageActionRow: Row } = require("discord.js");
module.exports = {
	execute: async (interaction) => {
		const player = interaction.client.player;
		const rw = new Row().addComponents(
			new Btn()
				.setCustomId("eight_d")
				.setEmoji(`🎱`)
				.setLabel("8D")
				.setStyle("PRIMARY"),
			new Btn()
				.setCustomId("bassboost")
				.setEmoji(`🎧`)
				.setLabel("BassBoost")
				.setStyle("PRIMARY"),
			new Btn()
				.setCustomId("reverse")
				.setEmoji(`◀️`)
				.setLabel("Reverse")
				.setStyle("PRIMARY"),
			new Btn()
				.setCustomId("earrape")
				.setEmoji(`🧨`)
				.setLabel("Earrape")
				.setStyle("PRIMARY")
		);
		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x:|  Você precisa estar em um canal de voz para fazer isso!`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `❌ | Você precisa estar no mesmo canal de voz que eu para fazer isso`,
				ephemeral: true,
			});
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return interaction.editReply({
				content: "❌ | Nenhuma música está sendo tocada!",
			});
		const db = interaction.client.db;
		const guild = interaction.guildId;
		const roll = db.get(`${guild}_dj_role`);

		if (
			interaction.user.id !== queue.nowPlaying().requestedBy.id &&
			!interaction.member.roles.cache.has(roll)
		) {
			return interaction.editReply(
				":x: | Este comando só pode ser usado pela pessoa que tocou a faixa atual ou alguém que tenha a função de DJ do seu cargo"
			);
		}
		interaction.editReply({
			content: `Clique em um abaixo`,
			components: [rw],
			ephemeral: true,
		});
	},
};

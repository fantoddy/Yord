const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("save")
		.setDescription("Salve uma música em seu dm's"),
	execute: async (interaction) => {
		const player = interaction.client.player;
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

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: | Não há música tocando neste canal !`,
				ephemeral: true,
			});
		if (queue) {
			if (queue) {
				let embed = new MessageEmbed()
					.setColor(`RANDOM`)
					.setTitle("⏳ | Música salva")
					.setDescription(queue.nowPlaying().title)
					
					.addFields(
						{
							name: "Uploader",
							value: queue.nowPlaying().author,
							inline: true,
						},
						{
							name: "Duração",
							value: queue.nowPlaying().duration + "s",
							inline: true,
						},
						{
							name: "Requerido por",
							value: queue.nowPlaying().requestedBy.username,
							inline: true,
						},
						{
							name: "Views",
							value: queue.nowPlaying().views.toString(),
							inline: true,
						},
						{
							name: "URL",
							value: `[Click Here](${queue.nowPlaying().url})`,
							inline: true,
						}
					);

				return interaction.user
					.send({ embeds: [embed] })
					.then(() => {
						interaction.editReply({
							content: `:white_check_mark: | Música salva em seu dm's`,
							ephemeral: true,
						});
					})
					.catch((error) => {
						interaction.editReply({
							content: `:x: | Não consigo te enviar DM`,
							ephemeral: true,
						});
					});
			}
		}
	},
};

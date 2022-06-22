const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require("discord-player");
/**
 * @Param {String}
 */
module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("repetir")
		.setDescription("Entre no modo de loop ")
		.addStringOption((option) =>
			option
				.setName("mode")
				.setDescription("O modo de repetição que você deseja")
				.setRequired(true)
				.addChoice("OFF", "OFF")
				.addChoice("Queue", "QUEUE")
				.addChoice("Track", "TRACK")
		),

	async execute(interaction) {
		const player = interaction.client.player;
		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x: |  Você precisa estar em um canal de voz para fazer isso!`,
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
				content: `:x: |  Não há música tocando nesta guilda !`,
				ephemeral: true,
			});
		if (queue) {
			const loop = interaction.options.getString("mode");

			if (loop === "OFF") {
				const x = await queue.setRepeatMode(QueueRepeatMode.OFF);
				return await interaction.editReply(
					x
						? `🔁 | Defina com sucesso o modo de loop para ${loop}`
						: `:x: | Falha ao fazer isso`
				);
			} else if (loop === "TRACK") {
				const x = await queue.setRepeatMode(QueueRepeatMode.TRACK);
				return await interaction.editReply(
					x
						? `🔁 | Defina com sucesso o modo de loop para ${loop}`
						: `:x: | Falha ao fazer isso`
				);
			} else if (loop === "QUEUE") {
				const x = await queue.setRepeatMode(QueueRepeatMode.QUEUE);
				return await interaction.editReply(
					x
						? `🔁 | Defina com sucesso o modo de loop para ${loop}`
						: `:x: | Falha ao fazer isso`
				);
			}
		}
	},
};

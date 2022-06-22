const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("volume")
		.setDescription("verifique ou defina o seu volume")
		.addIntegerOption((option) =>
			option
				.setName("volume")
				.setDescription("O volume que você deseja definir entre 1 - 100")
				.setRequired(false)
		),

	async execute(interaction) {
		const player = interaction.client.player;

		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x: |  Você não está em um canal de voz !`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `:x:| - Você não está no mesmo canal de voz !`,
				ephemeral: true,
			});

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: |  Não há música tocando neste canal !`,
				ephemeral: true,
			});
		let volume = interaction.options.getInteger("volume");

		if (queue) {
			if (!volume) {
				return interaction.editReply(
					`🔊 | Volume atual definido também ${queue.volume} `
				);
			}
			if (volume.value < 0 || volume.value > 100) {
				return interaction.editReply(
					`:x: | O Volume deve estar dentro do intervalo de 1 a 100 `
				);
			}
			let v = await queue.setVolume(volume);
			return interaction.editReply(
				v
					? `🔊 | - Volume definido para ${volume}!
                             `
					: `:x: | Falha ao fazer isso!`
			);
		}
	},
};

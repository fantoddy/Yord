const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("surdo")
		.setDescription("Ativar ou desativar ensurdecer")
		.addBooleanOption((option) =>
			option
				.setName("enabled")
				.setDescription("Ativar ou desativar ensurdecer")
		),
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
		if (!queue || !queue.playing) {
			return interaction.editReply({
				content: `❌ | Não há nada tocando nada agora!`,
				ephemeral: true,
			});
		}
		if (queue) {
			const lol = interaction.options.getBoolean("enabled");
			if (lol) {
				queue.setFilters({
					earrape: true,
					normalizer2: true,
				});
				return interaction.editReply(
					`🎧 | Ensurdecer ativado com sucesso em sua música atual`
				);
			}
			if (!lol) {
				queue.setFilters({
					earrape: false,
					normalizer2: false,
				});
				return interaction.editReply(
					`🎧 | Ensurdecer desativado com sucesso em sua música atual`
				);
			}
		}
	},
};

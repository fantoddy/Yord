module.exports = {
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
				content: `❌ | Não há nada jogando agora!`,
				ephemeral: true,
			});
		}
		if (queue) {
			const lol = true; 
			if (lol) {
				queue.setFilters({
					bassboost: true,
					normalizer2: true,
				});
				return interaction.editReply(
					`🎧 | BassBoost ativado com sucesso em sua fila atual`
				);
			}
		}
	},
};

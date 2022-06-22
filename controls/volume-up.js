module.exports = {
	execute: async (interaction) => {
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
				content: `:x: |  Não há música tocando nesta guilda !`,
				ephemeral: true,
			});

		if (queue) {
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
			let volume = queue.volume;
			if (volume.value >= 100) {
				return interaction.editReply(
					`:x: | Seu volume não pode ser aumentado, pois já está no máximo`
				);
			}
			volume = volume + 2;
			queue.setVolume(volume);
			return interaction.editReply(
				`:white_check_mark: | O volume aumentou para ${volume}`
			);
		}
	},
};

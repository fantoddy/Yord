const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("8d")
		.setDescription("Ativar ou desativar 8D")
		.addBooleanOption((option) =>
			option.setName("enabled").setDescription("ativar/desativar o filtro 8D")
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
				content: `❌ | Não há nada jogando agora!`,
				ephemeral: true,
			});
		}
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
			if (
				interaction.user.id !== queue.nowPlaying().requestedBy.id &&
				!interaction.member.roles.cache.has(roll)
			) {
				return interaction.editReply(
					":x: | Este comando só pode ser usado pela pessoa que tocou a faixa atual ou alguém que tenha a função de DJ do seu cargoe"
				);
			}
			const lol = interaction.options.getBoolean("enabled");
			if (lol) {
				queue.setFilters({
					"8D": true,
					normalizer2: true,
				});
				return interaction.editReply(
					`🎧 | 8D ativado com sucesso em sua fila atual`
				);
			}
			if (!lol) {
				queue.setFilters({
					"8D": false,
					normalizer2: false,
				});
				return interaction.editReply(
					`🎧 | 8D desativado com sucesso em sua fila atual`
				);
			}
		}
	},
};

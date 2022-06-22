const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Limpar sua fila"),
	execute: async (interaction) => {
		const player = interaction.client.player;
		await interaction.deferReply();
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
					":x: | Este comando só pode ser usado pela pessoa que tocou a faixa atual ou alguém que tenha a função de DJ do seu cargo"
				);
			}
			const owo = await queue.clear();
			interaction.editReply(
				owo
					? `🧼 | Limpou sua fila com sucesso`
					: `:x: | Falha ao limpar sua fila`
			);
		}
	},
};

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Pare sua música e destrua sua fila"),

	async execute(interaction) {
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
		if (
			interaction.user.id !== queue.nowPlaying().requestedBy.id &&
			!interaction.member.roles.cache.has(roll)
		) {
			return interaction.editReply(
				":x: | Este comando só pode ser usado pela pessoa que tocou a faixa atual ou alguém que tenha a função de DJ do seu cargo"
			);
		}
		queue.destroy();
		return interaction.editReply("🛑 | Parou a música com sucesso");
	},
};

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Pule sua música atual"),

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
				content: "❌ | Nenhuma música está tocando nesta guilda",
				ephemeral: true,
			});
		const db = interaction.client.db;
		const guild = interaction.guildId;
		const roll = db.get(`${guild}_dj_role`);

		if (
			interaction.user.id !== queue.nowPlaying().requestedBy.id &&
			!interaction.member.roles.cache.has(roll)
		) {
			return interaction.editReply(
				":x: | TEste comando só pode ser usado pela pessoa que tocou a faixa atual ou alguém que tenha a função de DJ do seu cargo"
			);
		}

		const currentTrack = queue.nowPlaying().title;
		if (queue.tracks.length < 1) {
			return interaction.editReply(`:x: | Apenas 1 música na sua fila`);
		}
		const success = queue.skip();
		return interaction.editReply({
			content: success
				? ` ⏭ | Skipped **${currentTrack}**!`
				: "❌ | Falha ao fazer isso!",
		});
	},
};

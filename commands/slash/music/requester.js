const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("solicitante")
		.setDescription("Verifique quem solicitou a música atual"),
	execute: async (interaction) => {
		const player = interaction.client.player;
		const db = interaction.client.db;
		const guild = interaction.guildId;
		const roll = db.get(`${guild}_dj_role`);
		if (!roll) {
			return interaction.editReply(
				`:x: | Não há configuração de função de dj em seu cargo. Tente fazer \`\`\`/dj_role\`\`\``
			);
		}
		const queue = player.getQueue(interaction.guild.id);
		if (!interaction.member.roles.cache.has(roll)) {
			return interaction.editReply(":x: | Você não tem o cargo de DJ!");
		}
		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: | Não há música tocando neste canal !`,
				ephemeral: true,
			});
		if (queue) {
			const currentTrack = queue.current;
			await interaction.editReply(
				`A música atual foi solicitada por <@${currentTrack.requestedBy.id}>`
			);
		}
	},
};

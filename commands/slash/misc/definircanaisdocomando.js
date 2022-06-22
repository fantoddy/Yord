const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("canal de comandos")
		.setDescription(
			"Defina o canal de comandos, depois disso meus comandos só podem ser executados no canal que você definir"
		)
		.addChannelOption((option) =>
			option
				.setName("Canal")
				.setDescription("O canal que você deseja definir como canal de comandos principal")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const db = interaction.client.db;
		const channel = interaction.options.getChannel("channel");
		const guild = interaction.guildId;

		if (
			!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
		) {
			return interaction.editReply({
				content: `:x: | É necessária permissão para gerenciar canais para executar essa ação!`,
				ephemeral: true,
			});
		}
		const x = await db.set(`${guild}_cmd_channel`, channel.id);

		return interaction.editReply(
			x
				? `:white_check_mark: | Definido com sucesso <#${channel.id}> como canal de comando `
				: `:x: | Falha ao fazer isso`
		);
	},
};

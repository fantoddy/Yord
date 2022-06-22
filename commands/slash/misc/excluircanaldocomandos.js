const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("redefinir canal de comando")
		.setDescription("Remova a restrição do canal de comandos do seu servidor"),
	execute: async (interaction) => {
		const db = interaction.client.db;
		const guild = interaction.guildId;

		if (
			!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
		) {
			return interaction.editReply({
				content: `:x: | É necessária permissão para gerenciar canais para executar essa ação!`,
				ephemeral: true,
			});
		}

		if (db.has(`${guild}_cmd_channel`) === false) {
			return interaction.editReply(
				`:x: | Sua guilda atualmente não tem canal de comandos!`
			);
		}
		const x = await db.delete(`${guild}_cmd_channel`);

		return interaction.editReply(
			x
				? `:white_check_mark: | Limpou com sucesso o canal de comando da sua guilda, os comandos agora podem ser usados ​​em qualquer lugar!`
				: `:x: | Falha ao fazer isso`
		);
	},
};

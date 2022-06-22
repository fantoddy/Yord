const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("blacklist_role")
		.setDescription("Impedir que pessoas com essa função acessem meus comandos")
		.addRoleOption((option) =>
			option
				.setName("Cargo")
				.setDescription("A função que você deseja definir como a função da lista negra")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const db = interaction.client.db;
		const role = interaction.options.getRole("role");
		const guild = interaction.guildId;

		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
			return interaction.editReply({
				content: `:x: | A permissão para gerenciar funções é necessária para executar essa ação!`,
				ephemeral: true,
			});
		}
		const x = await db.set(`${guild}_bl_role`, role.id);

		return interaction.editReply(
			x
				? `:white_check_mark: | Definido com sucesso ${role.name} como cargo da Blacklist`
				: `:x: | Falha ao fazer isso`
		);
	},
};

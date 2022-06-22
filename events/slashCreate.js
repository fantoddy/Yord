const chalk = require("chalk");
module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		
		const { client, guildId: guild, channelId } = interaction;


		if (!interaction.isCommand()) return;
		if (interaction.client.db.has(`${guild}_cmd_channel`)) {
			const cmdChannel = interaction.client.db.get(`${guild}_cmd_channel`);
			if (cmdChannel !== channelId)
				return interaction.reply(
					`Meus comandos são limitados a <#${cmdChannel}> seu cargo!`
				);
		}
		const roll = interaction.client.db.has(`${guild}_bl_role`);
		if (roll) {
			const rolee = interaction.client.db.get(`${guild}_bl_role`);
			if (interaction.member.roles.cache.some((role) => role.id === rolee)) {
				return interaction.reply(`Você foi colocado na lista negra por me usar!`);
			}
		}

		const command = client.slashCommands.get(interaction.commandName);


		if (!command) return;


		try {
			await interaction.deferReply();
			await command.execute(interaction);
		} catch (err) {
			console.log(chalk.redBright.bold(`[ERROR]\n`) + err);
			await interaction.editReply({
				content: ":x: | Um erro ocorreu",
				ephemeral: true,
			});
		}
	},
};

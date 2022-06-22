module.exports = {
	name: "interactionCreate",

	async execute(interaction) {

		const { client, customId: command } = interaction;

		if (!interaction.isButton()) return;

		if (!command) {
			return interaction.reply({
				content: `:x: | Um erro ocorreu`,
				ephemeral: true,
			});
		}
		await interaction.deferReply({ ephemeral: true });
		if (command == command) {
			require(`../controls/${command}`).execute(interaction);
		}
	},
};

module.exports = {
	name: "interactionCreate",

	execute: async (interaction) => {

		const { client } = interaction;


		if (!interaction.isContextMenu()) return;


		if (interaction.targetType === "USER") {
			const command = client.contextCommands.get(
				"USER " + interaction.commandName
			);


			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: ":x: | Um erro ocorreu",
					ephemeral: true,
				});
				return;
			}
		}

		else if (interaction.targetType === "MESSAGE") {

			const command = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.editReply({
					content: ":x: | Um erro ocorreu",
					ephemeral: true,
				});
				return;
			}
		} else {
			return console.log(
				"Algo estranho acontecendo no menu de contexto. Recebeu um menu de contexto de tipo desconhecido."
			);
		}
	},
};

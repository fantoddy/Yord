const { SlashCommandBuilder } = require("@discordjs/builders");
const clean = require("../../../clean").default;
const { MessageEmbed: Embed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("eval")
		.setDescription("Avaliar uma expressão javascript")
		.addStringOption((option) =>
			option
				.setName("expressão")
				.setDescription("O código para avaliar")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const string = interaction.options.getString("expression");
		if (interaction.member.id !== interaction.client.config.ownerId) {
			return interaction.editReply({
				content: "Este comando só pode ser usado pelo desenvolvedor do bot!",
				ephemeral: true,
			});
		}
		try {
			const evaled = eval(string);

			const cleaned = await clean(interaction.client, evaled);
			const emb = new Embed()
				.setTitle("Avaliação | Success")
				.setDescription(`\`\`\`js\n${cleaned}\`\`\``)
				.setColor(`GREEN`)
				.setFooter(
					`Avaliado por ${interaction.member.displayName}`,
					interaction.member.user.avatarURL({ dynamic: true })
				);

			return interaction.channel.send({
				embeds: [emb],
			});
		} catch (err) {
			const emb = new Embed();
			emb.setColor(`RED`);
			emb.setDescription(`\`\`\`js\n${clean(err)}\`\`\``);
			emb.setTitle("Avaliação | Error");
			emb.setFooter(
				`Evaluated by ${interaction.member.displayName}`,
				interaction.member.user.avatarURL({ dynamic: true })
			);
			return interaction.channel.send({
				embeds: [emb],
			});
		}
	},
};

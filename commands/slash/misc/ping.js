const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions , Discord , MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("bot ping"),
		
	execute: async (interaction) => {
		const db = interaction.client.db;
		const guild = interaction.guildId;
    const client = interaction.client;

		const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("PING! 🟢")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: "Latency", value: `\`${Date.now() - interaction.createdTimestamp}ms\`` },
                { name: "API Latency", value: `\`${Math.round(client.ws.ping)}ms\`` }
            )
        interaction.editReply({ embeds: [embed] })
    }
}
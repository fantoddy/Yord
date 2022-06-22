const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions , Discord , MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("vote")
		.setDescription("vote em mim top.gg"),
		
	execute: async (interaction) => {
		const db = interaction.client.db;
		const guild = interaction.guildId;
    const client = interaction.client;

		const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("**VOTA NO TOP.GG**")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription("[TOP.GG](top.gg/bot/872788888870060132)")
        interaction.editReply({ embeds: [embed] })
    }
}
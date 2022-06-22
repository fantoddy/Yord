const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions , Discord , MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("bot invite link"),
		
	execute: async (interaction) => {
		const db = interaction.client.db;
		const guild = interaction.guildId;
    const client = interaction.client;

if (process.env.oauthv2link === undefined) {
            interaction.reply({ content: "Missing `oauthv2link` in .env", ephemeral: true })
        } else {
            if (!process.env.oauthv2link.toString().startsWith("https://discord.com/")) {
                interaction.reply({ content: "https://discord.com/oauth2/authorize?client_id=872788888870060132&permissions=8&scope=bot", ephemeral: true })
            } else {
                const embed = new MessageEmbed()
                    .setTitle(`${client.user.username}'s invite link:`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("RANDOM")
                    .setDescription(`Meu link de convite é: ${process.env.oauthv2link}`)
                interaction.editReply({ embeds: [embed] })
            }
        }
    }
}

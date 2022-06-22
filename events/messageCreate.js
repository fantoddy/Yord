const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: "messageCreate",

	async execute(message) {
		if (
			message.content == `<@${message.client.user.id}>` ||
			(message.content == `<@!${message.client.user.id}>` &&
				!message.author.bot &&
				!message.author.system)
		) {
			const m = new MessageEmbed()
				.setColor("#0099ff")
				.setDescription(
					`Hello, I am ${message.client.user.username} e eu sou um pequeno bot de música!\n Sou inteiramente baseado em comandos por / , tente fazer \`\`\`/help\`\`\``
				);

if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
                return message.reply({
                    content: `❌ Estou perdendo a permissão para \`USE_EXTERNAL_EMOJIS\``
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
                return message.reply({
                    content: `❌ Estou perdendo a permissão para \`EMBED_LINKS\``
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setTitle(`❌ Estou perdendo a permissão para \`ADD_REACTIONS\``)
                    ]
                }) 

      
			return message.reply({ embeds: [m] });
		}
	},
};

const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("status")
		.setDescription("bot status"),

	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		const client = interaction.client;


        
       const duration1 = moment.duration(interaction.client.uptime).format(" D [dias], H [horas], m [mins], s [secs]");
        const cpu = await si.cpu();
        
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount 

})
        const embed = new MessageEmbed()
            .setColor(interaction.client.embedColor)
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setDescription(`**YORD MUSIC** **Status**
**= ESTATISTICAS =**
**• Servers** : ${scount}
**• Channels** : ${ccount}
**• Users** : ${mcount}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**= SYSTEM =**
**• Plataformas** : ${os.type}
**• Uptime** : ${duration1}
**• BotDev** : **TODDY1917**
**• CPU** :
> **• Cores** : ${cpu.cores}
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
**• MEMORY** :
> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
`);
        await interaction.editReply({embeds: [embed]});
    }
}
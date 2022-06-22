const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
  MessageSelectMenu,
	Permissions,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Listar todos os comandos do bot"),

	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		const client = interaction.client;

		const embed = new MessageEmbed()
        .setTitle(`Commands of ${client.user.username}`)
        .setColor('#2F3136')
        .setDescription('**Por favor Selecione uma categoria para ver todos os seus comandos**')
        .addField('EM FORMAÇÃO',`[**1917 DEVELOPER**](https://discord.gg/2VdFDCsWB3)\n[**TODDY1917 DEV**](www.instagram.com/toddylxx/)`,)
        .setTimestamp()
        .setFooter(`Requerido por ${interaction.user.username} | YORD MUSIC`, interaction.user.displayAvatarURL());
        
          const giveaway = new MessageEmbed()
          .setTitle("Categorias » MÚSICA")
          .setColor('#2F3136')
          .setDescription("```yaml\nAqui estão os comandos de música:```")
          .addFields({ name: 'COMANDO DE MÚSICA'  , value: `8D , autoplay , bassboost , embaralhar , fila , leave , letras , limparfila , pause , play , repetir , resume , requester , reverse , save , skip , stop , volume`, inline: true }, )
          .setTimestamp()
          .setFooter(`Requerido por ${interaction.user.username} | YORD MUSIC`, interaction.user.displayAvatarURL());
        
        
          const general = new MessageEmbed()
          .setTitle("Categorias » INFORMAÇÕES")
          .setColor('#2F3136')
          .setDescription("```yaml\nAqui estão os comandos do bot de informações:```")
          .addFields({ name: 'COMANDO DE INFORMAÇÕES'  , value: `help , setdjrole , setbl , excluircanaldocomandos , definircanaisdocomando , invite , ping , status , uptime`, inline: true },)
          .setTimestamp()
          .setFooter(`Requerido por ${interaction.user.username} | YORD MUSIC`, interaction.user.displayAvatarURL());
        
          const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Por favor, selecione uma categoria")
                .setDisabled(state)
                .addOptions([{
                        label: `COMANDO DE MÚSICA`,
                        value: `giveaway`,
                        description: `Veja todos os comandos baseados em música!`,
                        emoji: `<a:logo:916545532741173278>`
                    },
                    {
                        label: `COMANDO DE INFORMAÇÃO`,
                        value: `general`,
                        description: `Veja todos os comandos do bot de INFORMAÇÕES!`,
                        emoji: `<:667737932035129344:916560642234794015>`
                    }
                ])
            ),
        ];
        
        const initialMessage = await interaction.editReply({ embeds: [embed], components: components(false) });
        
        const filter = (interaction) => interaction.user.id === interaction.member.id;
        
                const collector = interaction.channel.createMessageComponentCollector(
                    {
                        filter,
                        componentType: "SELECT_MENU",
                        time: 300000
                    });
        
                collector.on('collect', (interaction) => {
                    if (interaction.values[0] === "giveaway") {
                        interaction.update({ embeds: [giveaway], components: components(false) });
                    } else if (interaction.values[0] === "general") {
                        interaction.update({ embeds: [general], components: components(false) });
                    }
                });
                collector.on('end', () => {
                  initialMessage.edit({ components: components(true) });
              }
              )
    },
};
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("fila")
		.setDescription("ver suas músicas atualmente em reprodução"),
	async execute(interaction) {
		const player = interaction.client.player;

		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x:|  Você precisa estar em um canal de voz para fazer isso!`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `❌ | Você precisa estar no mesmo canal de voz que eu para fazer isso`,
				ephemeral: true,
			});
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return interaction.editReply({
				content: "❌ | Nenhuma música está tocando neste canal de voz",
			});
		const currentTrack = queue.current;
		//CREDITS: Discord-Player Example by DevAndromeda
		const tracks = queue.tracks.slice(0, 10).map((m, i) => {
			return `${i + 1}. **${m.title}** ([link](${m.url}))`;
		});
		const embed = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`Fila para ${interaction.guild.name}`)
			.setDescription(
				`${tracks.join("\n")}${
					queue.tracks.length > tracks.length
						? `\n...${
								queue.tracks.length - tracks.length === 1
									? `${queue.tracks.length - tracks.length} mais faixa`
									: `${queue.tracks.length - tracks.length} more faixas`
						  }`
						: ""
				}`
			)
			.setFooter(`Now Playing : ${currentTrack.title}`);
		return interaction.editReply({ embeds: [embed] });
	},
};

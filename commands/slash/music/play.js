// Deconstructed the constants we need in this file.

const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {

	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Reproduzir uma música.")
		.addStringOption((option) =>
			option
				.setName("track")
				.setDescription("O nome/url/playlist que você quer ouvir.")
				.setRequired(true)
		),

	async execute(interaction) {
		const query = interaction.options.getString("track");

		if (!interaction.member.voice.channelId)
			return await interaction.editReply({
				content: "❌ | Você precisa estar em um canal de voz!",
				ephemeral: true,
			});
		if (
			interaction.guild.me.voice.channelId &&
			interaction.member.voice.channelId !==
				interaction.guild.me.voice.channelId
		)
			return await interaction.editReply({
				content:
					"❌ | Você precisa estar no mesmo canal de voz que eu para fazer isso",
				ephemeral: true,
			});

		const queue = interaction.client.player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});

		// verify vc connection
		try {
			if (!queue.connection)
				await queue.connect(interaction.member.voice.channel);
		} catch {
			queue.destroy();
			return await interaction.editReply({
				content: "❌ | Não foi possível participar do seu canal de voz!",
				ephemeral: true,
			});
		}

		const track = await interaction.client.player.search(query, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO,
		});

		if (!track || !track.tracks.length)
			return await interaction.editReply({
				content: `❌ | Nenhum vídeo/música/Playlist de reprodução foi encontrado ao procurar : ${track}`,
				ephemeral: true,
			});

		const playEmbed = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(
				`🎶 | Novo ${track.playlist ? "playlist" : "música"} Adicionado à fila`
			);
		if (!track.playlist) {
			const tr = track.tracks[0];
			
			playEmbed.setDescription(`${tr.title}`);
		}

		if (!queue.playing) {
			track.playlist
				? queue.addTracks(track.tracks)
				: queue.play(track.tracks[0]);
			return await interaction.editReply({ embeds: [playEmbed] });
		} else if (queue.playing) {
			track.playlist
				? queue.addTracks(track.tracks)
				: queue.addTrack(track.tracks[0]);
			return await interaction.editReply({
				embeds: [playEmbed],
			});
		}
	},
};

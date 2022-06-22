const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const finder = require("lyrics-finder");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("letras")
		.setDescription("Obter as letras da música atual!"),
	execute: async (interaction) => {
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

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: | Não há música tocando neste canal !`,
				ephemeral: true,
			});
		if (queue) {
			let lyrics = null;
			let track = queue.nowPlaying();
			track = track.title;

			try {
				lyrics = await finder(track, "");
				if (!lyrics) lyrics = `:x: | Nenhuma letra encontrada.`;
			} catch (error) {
				lyrics = `:x: Nenhuma letra encontrada`;
			}

			let lyricsEmbed = new MessageEmbed()
				.setTitle(`Letras para ${track}`)
				.setDescription(lyrics)
				.setColor(`RANDOM`)
				.setThumbnail(`${queue.nowPlaying().thumbnail}`);

			if (lyricsEmbed.description.length >= 4096)
				lyricsEmbed.description = `${lyricsEmbed.description.substr(
					0,
					4095
				)}...`;
			return interaction.editReply({
				embeds: [lyricsEmbed],
			});
		}
	},
};

module.exports = {
	name: "botDisconnect",
	execute(queue) {
		queue.metadata.channel.send(
			"❌ | Bye fui desconectado do canal de voz."
		);
	},
};

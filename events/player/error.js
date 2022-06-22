module.exports = {
	name: "error",
	execute(queue, error) {
		console.log(error);
		queue.metadata.channel.send(`:x: | Um erro ocorreu`);
	},
};

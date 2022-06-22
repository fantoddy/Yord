const chalk = require("chalk");
module.exports = {
	name: "ready",
	once: true,

	execute(client) {
		client.user.setActivity(`/help | Melhor dj de todos! | ${client.guilds.cache.size}`, { type: "LISTENING" });

		console.log(
			chalk.yellowBright.bold(`
YORD MUSIC INICIADO ONLINE BY TODDY1917                                                                      
`)
		);
		console.log(
			chalk.green.bold(`[Yord Music] | Logado como ${client.user.tag}!`)
		);
		console.log(
			chalk.yellow.bold(`[Yord Music] | Servers! ["${client.guilds.cache.size}"]`)
		);
		console.log(
			chalk.red.bold(`[music] | Total de Users! ["${client.users.cache.size}"]`)
		);
		console.log(
			chalk.cyan.bold(`[music]! ["${client.channels.cache.size}"]`)
		);
		console.log(chalk.greenBright(`[music] |Yord Iniciado (y) comandos`));
	},
};

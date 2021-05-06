const chalk = require("chalk")

module.exports = {

	all: async (client) => {

		client.on("ready", function () {

			console.log(chalk.green(`\nLogged in as ${client.user.tag} (${client.user.id})`))

			var status = [">help for more info", "v1.0.1", "Under a rock!"] 
			// You can change it whatever you want.

			setInterval(function() {

				let randstat = status[Math.floor(Math.random() * status.length)]

				client.user.setPresence({
					activity: {
						name: `${randstat}`
					},
					status: "online"
				})

			}, 20000);

		});

		client.on("debug", function (info) {

			console.log(chalk.cyan(`debugLog -> ${info}`));

		});

		client.on("disconnect", function (event) {

			console.log(chalk.red(`The WebSocket has closed and will no longer attempt to reconnect`));

		});

		client.on("reconnecting", function () {

			console.log(chalk.cyan(`client tries to reconnect to the WebSocket`));

		});

		client.on("resume", function (replayed) {

			console.log(`whenever a WebSocket resumes, ${replayed} replays`);

		});

		client.on("error", function (error) {

			console.error(chalk.magenta(`client's WebSocket encountered a connection error: ${error}`));
					
		});

		client.on("warn", function (info) {

            console.log(chalk.yellow(`warn: ${info}`));

        });

		client.on("commandRun", function (info) {

			console.log(chalk.magenta(`commandRun: ${info.name}`));

		});

	}
}
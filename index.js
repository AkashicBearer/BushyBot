/*
the BushyBot Discord Bot
Copyright (C) 2021 Akashic Bearer

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { FriendlyError, CommandoClient } = require("discord.js-commando");
const { readFileSync } = require('fs')

const chalk = require("chalk");
const MySQL = require('mysql2/promise');
const MySQLi = require('mysql2')
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

require('moment')
require('moment-duration-format')

// Random requirements for future ref#
const Modules = require("./modules/Req.js")
const CustomCommandoCl = require("./modules/CustomCommando.js")
const MySQLProvider = require('./modules/MySQLProvider.js');

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

// Env Variables
const Discord_Token = process.env['DISCORD_TOKEN']
const DBUser = process.env['db_user']
const DBHost = process.env['db_host']
const DBPass = process.env['db_password']
const DBDatabase = process.env['db_database']

// Bot Client
const client = new CustomCommandoCl({
	commandPrefix: 'b!',
	owner: ["193021560792154112"],
	disableEveryone: true,
	invite: "https://discord.gg/Y3XXjGaaTE"
});

const logger = require('./modules/clientLogger.js')
logger.all(client);

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['utilisation', 'Util'],
		["roleplay", "Roleplay"],
		["games", "Game Stats"]
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		help: false,
		ping: false,
		prefix: true,
		eval: true,
		unknownCommand: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

// CLient Login + Database Connection 
MySQL
	.createConnection({
		host: process.env.db_host,
		port: "3306",
		user: process.env.db_user,
		password: process.env.db_password,
		database: process.env.db_database,
	}).then((db) => {

		console.log(chalk.green('✅ Connected to database'))

		client.setProvider(new MySQLProvider(db))

		client.login(Discord_Token);

	})
	.catch((err) => {

		console.log(chalk.red("Error in loading database: " + err))

		client.login(Discord_Token)

	})
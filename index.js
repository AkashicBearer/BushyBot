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

const MySQL = require('mysql2/promise');
const MySQLi = require('mysql2')
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


require('moment')
require('moment-duration-format')

// Random requirements for future ref#
const LevelSystem = require("./modules/LevelSystem")
const CustomCommandoClient = require("./modules/CustomCommando")
const MySQLProvider = require('./modules/MySQLProvider');
const RandomUtils = require("./modules/RandomKeyUtils")


// Bot Client
const client = new CustomCommandoClient({
    commandPrefix: 'b!',
    owner: ["193021560792154112"],
    disableEveryone: true,
    invite: "https://discord.gg/Y3XXjGaaTE"
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utilisation', 'Util'],
        ["admin", "Administration"],
        ['tech', "Technical"],
        ["xp", "XP System"],
        ["owner", "Owner"]
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

// Events
client.once('ready', () => {

    console.log(`\nLogged in as ${client.user.tag} (${client.user.id})`)

    var status = [">help for more info", "v1.0.0", "Under Recode!", `on ${client.guilds.cache.size} Servers!`] // You can change it whatever you want.

    setInterval(function() {

        let randstat = status[Math.floor(Math.random() * status.length)]

        client.user.setPresence({
            activity: {
                name: `${randstat}`
            },
            status: "online"
        })

    }, 20000);
})

client.on('error', console.error);
client.on("debug", console.log)

// CLient Login + Database Connection 
MySQL
    .createConnection({
        host: process.env.db_host,
        port: "3306",
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db_database,
    }).then((db) => {

        console.log('✅ Connected to database');

        client.setProvider(new MySQLProvider(db))

        client.login(process.env.DISCORD_TOKEN);

    })
    .catch((err) => {

        console.log("Error in loading database: " + err)

        client.login(process.env.DISCORD_TOKEN)
    })
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

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['p', 'pong'],
            group: 'utilisation',
            memberName: 'ping',
            description: 'See the bots Ping WebSocket latency',
            examples: ['[prefix]ping']
        });
    }

    async run(message, args) {

        if (message.author.bot) return;

        const time = new Date();

        const PingEmbed = new MessageEmbed()
            PingEmbed.setAuthor(this.client.user.username + ' Pong!')
            PingEmbed.addField(`❯ The WebSocket Ping is `, `${Math.round(this.client.ws.ping)}ms`, true)
            PingEmbed.addField(`❯ The message round-trip took `, time - message.createdAt+'ms', true)
            PingEmbed.setColor("RANDOM")
            PingEmbed.setTimestamp()
        message.channel.send(PingEmbed);
        
    }
};

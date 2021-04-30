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

module.exports = class BotStatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: ["info", "specs", "information", "about"],
            group: 'utilisation',
            memberName: 'status',
            description: 'Shows the status of the Bot',
            examples: ["[prefix]status"]
        });
    }

    async run(message) {

        const that = this
        const client = that.client
        const os = require("os")
        const used = process.memoryUsage().heapUsed / 1024 / 1024;

        //let Platform = os.platform()
        const CPU = os.cpus().find(cpu => cpu.model).model
        const CPUFreq = (os.cpus().find(cpu => cpu.model).speed / 1000).toFixed(2)

        let totalSeconds = process.uptime();
        let realTotalSecs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);

        const StatusEmbed = new MessageEmbed()
            StatusEmbed.setThumbnail(client.user.avatarURL())
            StatusEmbed.setAuthor(client.user.tag, client.user.avatarURL())
            StatusEmbed.addField("❯ CPU", `${CPU} @${CPUFreq} GHz`)
            StatusEmbed.addField(`❯ Memory usage:`,`${Math.round(used * 100) / 100}MB` ,true)
            StatusEmbed.addField(`❯ Uptime:`,`${days} : ${hours} : ${mins} : ${realTotalSecs}` ,true)
            StatusEmbed.addField('❯ Node and Library',` Node: ${process.version} \nDiscord.js 12.2`,true)
            //StatusEmbed.addField(`Platform`,`${Platform}`)
            StatusEmbed.addField('❯ Servers, Users',`On ${client.guilds.cache.size} servers, with a total of ${client.users.cache.size} users.`)
            StatusEmbed.setColor('BLACK')
                code: 'AsciiDoc'
        message.channel.send(StatusEmbed);

    }
}
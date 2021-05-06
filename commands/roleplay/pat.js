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
const Neko = require("nekos.life");
const { sfw } = new Neko();

module.exports = class PatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            group: 'roleplay',
            memberName: 'pat',
            description: 'Pat a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to pat?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.pat().then((pat) => {

			const PatEmbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					PatEmbed.setAuthor(`${this.client.user.username} is patting ${message.author.username}.`)

				} else {

					PatEmbed.setAuthor(`${message.author.username} is patting ${args.member.user.username}.`)

				}
			
					PatEmbed.setImage(pat.url)
					PatEmbed.setColor(0xff00ff)
					PatEmbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(PatEmbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
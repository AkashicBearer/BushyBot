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

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            group: 'roleplay',
            memberName: 'slap',
            description: 'slap a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to slap the shit out of?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.slap().then((slap) => {

			const SlapEmbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					SlapEmbed.setAuthor(`${this.client.user.username} is slapping ${message.author.username}.`)

				} else {

					SlapEmbed.setAuthor(`${message.author.username} is slapping ${args.member.user.username}.`)

				}
			
					SlapEmbed.setImage(slap.url)
					SlapEmbed.setColor(0xff00ff)
					SlapEmbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(SlapEmbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
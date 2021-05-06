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

module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'roleplay',
            memberName: 'hug',
            description: 'hug a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to hug?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.hug().then((hug) => {

			const HugEbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					HugEbed.setAuthor(`${this.client.user.username} is hugging ${message.author.username}.`)

				} else {

					HugEbed.setAuthor(`${message.author.username} is hugging ${args.member.user.username}.`)

				}
			
					HugEbed.setImage(hug.url)
					HugEbed.setColor(0xff00ff)
					HugEbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(HugEbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
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

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cuddle',
            group: 'roleplay',
            memberName: 'cuddle',
            description: 'Pat a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to cuddle?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.cuddle().then((cuddle) => {

			const CUddleEbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					CUddleEbed.setAuthor(`${this.client.user.username} is cuddling ${message.author.username}.`)

				} else {

					CUddleEbed.setAuthor(`${message.author.username} is cuddling ${args.member.user.username}.`)

				}
			
					CUddleEbed.setImage(cuddle.url)
					CUddleEbed.setColor(0xff00ff)
					CUddleEbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(CUddleEbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
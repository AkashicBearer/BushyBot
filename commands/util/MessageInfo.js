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

module.exports = class MessageInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'message',
			aliases: ['message-info', 'msg', 'msg-info', 'reply'],
			group: 'utilisation',
			memberName: 'message',
			description: 'Responds with detailed information on a message.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'message',
					prompt: 'Which message would you like to get information on?',
					type: 'message'
				}
			]
		});
	}

	async run(msg, { message }) {

		const MessageEMbedingThingy = new MessageEmbed()
			MessageEMbedingThingy.setColor(message.member ? message.member.displayHexColor : 0x00AE86)
			MessageEMbedingThingy.setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			MessageEMbedingThingy.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			MessageEMbedingThingy.setDescription(message.content)
			MessageEMbedingThingy.setTimestamp(message.createdAt)
			MessageEMbedingThingy.setFooter(`ID: ${message.id}`)
			MessageEMbedingThingy.addField('❯ Jump', `[Message Link](${message.url})`);
		message.channel.send(MessageEMbedingThingy)

	}
};
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

module.exports = class UserAvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['a'],
            group: 'utilisation',
            memberName: 'avatar',
            description: 'Check your or someone else\'s avatar',
            examples: ['[prefix]avatar \n [prefix]avatar {user}'],
            args: [
                {
					key: 'member',
					prompt: 'Whose avatar to check?',
                    type: 'member',     
                    default: ``           
                }
            ]
        });
    }
    async run(message, args) {
        
        if (message.author.bot) return;

        const author = message.author
        const PUser = args.member.user
        const AvatarEmbed = new MessageEmbed()

        if(!args.member || args.member.id == message.author.id) {

            AvatarEmbed.setTitle(`❯ ${author.username} Avatar!`)
            AvatarEmbed.setImage(author.avatarURL({dynamic: true, size: 512}))

        } else {

            AvatarEmbed.setTitle(`❯ ${PUser.username} Avatar!`)
            AvatarEmbed.setImage(PUser.avatarURL({dynamic: true, size: 512}))

        }
            AvatarEmbed.setColor("RANDOM")
        message.channel.send(AvatarEmbed)
    };
}

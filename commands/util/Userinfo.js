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
const moment = require('moment');
const { trimArray } = require('../../modules/RandomKeyUtils');


module.exports = class UserinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            aliases: ['user-info', 'member', 'member-info'],
            group: 'utilisation',
            memberName: 'userinfo',
            description: 'Responds with detailed information on a user.',
            clientPermissions: ['EMBED_LINKS'],
            args: [{
                key: 'user',
                prompt: 'Which user would you like to get information on?',
                type: 'user',
                default: message => message.author
            }]
        });
    }

    async run(message, { user }) {

        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };
        
        const userFlags = user.flags ? user.flags.toArray() : [];
        const UserInfoEmbed = new MessageEmbed()
            UserInfoEmbed.setThumbnail(user.displayAvatarURL({
                format: 'png',
                dynamic: true
            }))
            UserInfoEmbed.setAuthor(user.tag)
            UserInfoEmbed.addField('❯ Discord Join Date', moment.utc(user.createdAt).format('DD/MM/YYYY h:mm A'), true)
            UserInfoEmbed.addField('❯ ID', user.id, true)
            UserInfoEmbed.addField('❯ Bot', user.bot ? 'Yes' : 'No', true)
            UserInfoEmbed.addField('❯ Badges', userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None');
        
        if (message.guild) {

            try {

                const member = await message.guild.members.fetch(user.id);
                const defaultRole = message.guild.roles.cache.get(message.guild.id);
                const roles = member.roles.cache.filter(role => role.id !== defaultRole.id).sort((a, b) => b.position - a.position).map(role => role.name);

                UserInfoEmbed.addField('❯ Server Join Date', moment.utc(member.joinedAt).format('DD/MM/YYYY h:mm A'), true)
                UserInfoEmbed.addField('❯ Highest Role', member.roles.highest.id === defaultRole.id ? 'None' : member.roles.highest.name, true)
                UserInfoEmbed.addField(`❯ Roles (${roles.length})`, roles.length ? trimArray(roles, 6).join(', ') : 'None')
                UserInfoEmbed.setColor(member.displayHexColor);

            } catch {

                UserInfoEmbed.setFooter('Nyan~');

            }
        }
        message.channel.send(UserInfoEmbed)
    }
};
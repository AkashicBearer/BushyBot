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

module.exports = class ChannelInfoCOmmand extends Command {
    constructor(client) {
        super(client, {
            name: 'channel',
            aliases: ['chann', 'channel-info'],
            group: 'utilisation',
            memberName: 'channel',
            description: 'Check the channels info',
            guildOnly: true,
            examples: ['[prefix}channel', '[prefix]channel {channel}'],
            args: [
                {
                    key: 'channel',
                    prompt: 'Which channel would you like to get information on?',
                    type: 'channel',
                    default: message => message.channel
                }
            ]
        });
    }
    async run(message, { channel }) {

        const types = {
            dm: 'DM',
            group: 'Group DM',
            text: 'Text Channel',
            voice: 'Voice Channel',
            category: 'Category',
            unknown: 'Unknown'
        };
        
        const ChannelEmbed = new MessageEmbed()
            ChannelEmbed.setColor(0x00AE86)
            ChannelEmbed.setThumbnail(message.guild.iconURL({ format: 'png' }))
            ChannelEmbed.addField('❯ Name', channel.type === 'dm' ? `@${channel.recipient.username}` : channel.name, true)
            ChannelEmbed.addField('❯ ID', channel.id, true)
            ChannelEmbed.addField('❯ NSFW', channel.nsfw ? 'Yes' : 'No', true)
            ChannelEmbed.addField('❯ Category', channel.parent ? channel.parent.name : 'None', true)
            ChannelEmbed.addField('❯ Type', types[channel.type], true)
            ChannelEmbed.addField('❯ Creation Date', moment.utc(channel.createdAt).format('DD/MM/YYYY h:mm A'), true)
            ChannelEmbed.addField('❯ Topic', channel.topic || 'None');
        message.channel.send(ChannelEmbed)
        
    };
}

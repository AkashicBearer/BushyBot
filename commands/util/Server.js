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

module.exports = class ServerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server',
			aliases: ['guild', 'server-info', 'guild-info'],
			group: 'utilisation',
			memberName: 'server',
			description: 'Responds with detailed information on the server.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	async run(message) {

		const filterLevels = {
			DISABLED: 'Off',
			MEMBERS_WITHOUT_ROLES: 'No Role',
			ALL_MEMBERS: 'Everyone'
		};

		const verificationLevels = {
			NONE: 'None',
			LOW: 'Low',
			MEDIUM: 'Medium',
			HIGH: 'High',
			VERY_HIGH: 'Highest'
		};

		if (!message.guild.members.cache.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);
		
		const ServerEmbed = new MessageEmbed()
			ServerEmbed.setColor(0x00AE86)
			ServerEmbed.setThumbnail(message.guild.iconURL({ format: 'png' }))
			ServerEmbed.addField('❯ Name', message.guild.name, true)
			ServerEmbed.addField('❯ ID', message.guild.id, true)
			ServerEmbed.addField('❯ Creation Date', moment.utc(message.guild.createdAt).format('DD/MM/YYYY h:mm A'), true)
			ServerEmbed.addField('❯ Owner', message.guild.owner.user.tag, true)
			ServerEmbed.addField('❯ Boost Count', message.guild.premiumSubscriptionCount || 0, true)
			ServerEmbed.addField('❯ Boost Tier', message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None', true)
			ServerEmbed.addField('❯ Region', message.guild.region.toUpperCase(), true)
			ServerEmbed.addField('❯ Explicit Filter', filterLevels[message.guild.explicitContentFilter], true)
			ServerEmbed.addField('❯ Verification Level', verificationLevels[message.guild.verificationLevel], true)
			ServerEmbed.addField('❯ Members', message.guild.memberCount, true)
			ServerEmbed.addField('❯ Roles', message.guild.roles.cache.size, true)
			ServerEmbed.addField('❯ Channels', message.guild.channels.cache.filter(channel => channel.type !== 'category').size, true);
		message.channel.send(ServerEmbed);
	}
};
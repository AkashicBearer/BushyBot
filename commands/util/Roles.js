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
const { util: { permissions } } = require('discord.js-commando');

module.exports = class RoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'role',
			aliases: ['role-info'],
			group: 'utilisation',
			memberName: 'role',
			description: 'Responds with detailed information on a role.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'role',
					prompt: 'Which role would you like to get information on?',
					type: 'role'
				}
			]
		});
	}

	async run(message, { role }) {

		const serialized = role.permissions.serialize();
		const perms = Object.keys(permissions).filter(perm => serialized[perm]);
		const ROlesEMbed = new MessageEmbed()
			ROlesEMbed.setColor(role.hexColor)
			ROlesEMbed.addField('❯ Name', role.name, true)
			ROlesEMbed.addField('❯ ID', role.id, true)
			ROlesEMbed.addField('❯ Color', role.hexColor.toUpperCase(), true)
			ROlesEMbed.addField('❯ Creation Date', moment.utc(role.createdAt).format('MM/DD/YYYY h:mm A'), true)
			ROlesEMbed.addField('❯ Inherited', role.hoist ? 'Yes' : 'No', true)
			ROlesEMbed.addField('❯ Mentionabl?', role.mentionable ? 'Yes' : 'No', true)
			ROlesEMbed.addField('❯ Permissions', perms.map(perm => permissions[perm]).join(', ') || 'None');
		message.channel.send(ROlesEMbed)
		
	}
};
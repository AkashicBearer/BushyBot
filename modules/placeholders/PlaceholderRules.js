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

module.exports = [
  // Server
  {
    name: 'server',
    description: 'Server\'s name',
    replace: ({ guild }) => guild.name
  },
  // User
  {
    name: 'username',
    description: 'User\'s username',
    replace: ({ user }) => user.username
  },
  {
    name: 'user',
    description: 'User\'s mention',
    replace: ({ user }) => user.toString()
  },
  {
    name: 'userId',
    description: 'User\'s ID',
    replace: ({ user }) => user.id
  },
  // Channel
  {
    name: 'channel',
    description: 'Channel\'s mention',
    replace: ({ channel }) => channel.toString()
  },
  {
    name: 'channelName',
    description: 'Channels\'s name',
    replace: ({ channel }) => channel.name
  }
]

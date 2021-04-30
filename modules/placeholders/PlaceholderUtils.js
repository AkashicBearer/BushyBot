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

const PlaceholderRules = require('./PlaceholderRules')

module.exports = class PlaceholderUtils {
  static parse (text, context, whitelist, blacklist) {
    return PlaceholderRules.reduce((t, r) => {
      if (Array.isArray(whitelist) && !whitelist.includes(r.name)) return t
      if (Array.isArray(blacklist) && blacklist.includes(r.name)) return t

      const regex = r.regex || new RegExp(`{${r.name}}`, 'g')
      return t.replace(regex, r.replace.bind(null, context))
    }, text)
  }
}

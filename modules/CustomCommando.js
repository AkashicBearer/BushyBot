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

const { CommandoClient, CommandoClientOptions } = require('discord.js-commando');
const exec = require('child_process').exec;

const Req = require('./Req.js');

class CustomCommandoClient extends CommandoClient {
    constructor(options) {
        super(options || new CommandoClientOptions());

        this.Req = Req

    }

    async getInfo() {
        let client = this;

        let info = {};

        return new Promise((fulfill, reject) => {

            function getVersion() {

                exec('git rev-parse --short=4 HEAD', function (error, version) {

                    if (error) {

                        client.logger.error(`Error getting version ${error}`);
                        info.version = 'unknown';

                    } else {

                        info.version = version.trim();

                    }

                    getMessage();

                });
            }

            function getMessage() {

                exec('git log -1 --pretty=%B', function (error, message) {

                    if (error) {

                        client.logger.error(`Error getting commit message ${error}`);
                        info.message = "Could not get last commit message.";

                    } else {

                        info.message = message.trim();

                    }

                    getTimestamp();

                });
            }

            function getTimestamp() {

                exec('git log -1 --date=short --pretty=format:%ci', function (error, timestamp) {

                    if (error) {

                        client.logger.error(`Error getting creation time ${error}`);
                        info.timestamp = "Not available";

                    } else {

                        info.timestamp = timestamp;

                    }

                    fulfill(info);

                });
            }

            getVersion();

        });
    }
}

module.exports = CustomCommandoClient;
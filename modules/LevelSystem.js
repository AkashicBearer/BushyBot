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

const { CommandoGuild } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const RandomUtils = require('./RandomKeyUtils');
const MySQL = require("mysql2")

const db = MySQL.createPool({
    connectionLimit: 100,
    host: process.env.host,
    port: "3306",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});

class LevelSystem {

	constructor(client){

		this.client = client

	}

	getLevelExp(CurrentXP) {

		return Math.round((6.66 * Math.pow(CurrentXP, 3)) / 3.5);

	}

    getOldLevelExp(CurrentXP){

        return Math.round((6.66 * Math.pow((CurrentXP - 1), 3)) / 3.5);

    }

    getNextLevelExp(CurrentXP) {

        return Math.round((6.66 * Math.pow((CurrentXP + 1), 3)) / 3.5);

    }

	getLevelFromExp(exp) {

        let CurrentXP = 0;

        while (exp >= this.getLevelExp(CurrentXP)) {
            exp -= this.getLevelExp(CurrentXP);
            CurrentXP++;
        }

        return CurrentXP;

    };

	getLevelProgress(exp) {

        let CurrentXP = 0;

        while (exp >= this.getLevelExp(CurrentXP)) {
            exp -= this.getLevelExp(CurrentXP);
            CurrentXP++;
        }

        return exp;

    };
    
/* WONT WORK RN
    getLeaderboard(guild) {
        if (guild instanceof CommandoGuild)
            guild = guild.id;

        return new Promise(async (fulfill, reject) => {
            try {

                fulfill(await this.client.database.connection.all('SELECT * FROM IturalData ORDER BY exp DESC', ));
            
            } catch (err) {

                reject(err);

            }
        });
    }

    getMemberExp(member) {
        return new Promise(async (fulfill, reject) => {
            try {
                db.getConnection(function (err, connection) {

                    if (err) throw err;

                    let data = await this.client.database.connection.get('SELECT * FROM IturalData WHERE UserID = "$UserID"', {
                            $UserID: member.idd
                    }) || {UserID: member.id, Data: JSON.stringify(UData)};

                    fulfill(data);

                    connection.release();

                })

            } catch (err) {

                reject(err);

            }
        });
    }

    setMemberExp(member, exp) {
        return new Promise(async (fulfill, reject) => {
            try {

                db.getConnection(function (err, connection) {

                    if (err) throw err;

                    let data = await connection.query('INSERT OR REPLACE INTO IturalData (UserID, JSON_EXTRACT(Stats, '$.XP') AS LBXP) VALUES ($UserID, $Data);', {
                        $UserID: member.id,
                        $Data: UData
                    });

                    fulfill(data);

                    connection.release();

                })
                

            } catch (err) {

                reject(err);

            }
        });
    }

    giveGuildUserExp(member, message) {

        if (moment().diff(member.timeout || 0) < 0) return;

        member.timeout = moment().add(1, 'minutes');

        return new Promise(async (fulfill, reject) => {

            try {

                const oldExp = (await this.getMemberExp(member)).XPS.XP;
                const oldLvl = this.getLevelFromExp(oldExp);
                const newExp = oldExp + PonyUtils.randomInt(15, 25);
                const newLvl = this.getLevelFromExp(newExp);

                await this.setMemberExp(member, newExp);

                fulfill();

            } catch (err) {

                reject(err);

            }
        });
    }

    */
}

module.exports = LevelSystem;
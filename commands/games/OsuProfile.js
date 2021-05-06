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
const { createCanvas, loadImage, Canvas } = require('canvas');
const { MessageEmbed, Discord, MessageAttachment } = require('discord.js');
const Nodesu = require('nodesu');
const APIKey = process.env['OSU_API_KEY']
const osuProfile = new Nodesu.Client(APIKey)

module.exports = class ProfileCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'osup',
            group: 'games',
            memberName: 'osup',
            description: 'get the profile of a osu user',
            args: [
                {
                    key: 'id',
                    prompt: 'Who would you like to look up?',
                    type: 'string'
                }
            ]
        });
    };
    async run(message, args) {

		osuProfile.user
			.get(args.id)
			.then(async(osu, err) => {
				console.log(osu)
				const OsuEmbed = new MessageEmbed()
					OsuEmbed.setTitle(`${osu.username}'s Profile`)
					OsuEmbed.addFields(

						{ name: "❯ Username", value: `${osu.username}`, inline: true},
						{ name: '❯ User ID', value: `${osu.user_id}`, inline: true},
						
						{ name: '\u200B', value: '\u200B' },

						{ name: '❯ PP', value: `${Math.round(osu.pp_raw)}`, inline: true},
						{ name: '❯ Accuracy', value: `${Math.round(osu.accuracy)}%`, inline: true},

						{ name: '\u200B', value: '\u200B' },

						{ name: '❯ Scores', value: `<:hit502x:839750956723994654> ${osu.count50}\n<:hit1002x:839750957034110986> ${osu.count100}\n<:hit300:839750957239894026> ${osu.count300}`, inline: true},
						{ name: '❯ Ranks', value: `<:rankingxsmall2x:839750957713326101> ${parseInt(osu.count_rank_ss) + parseInt(osu.count_rank_ssh)}\n<:rankingssmall2x:839750958027898890> ${parseInt(osu.count_rank_s) + parseInt(osu.count_rank_sh)}\n<:rankingasmall2x:839750957557481502> ${osu.count_rank_a}`, inline: true}

					)
					OsuEmbed.setThumbnail(osu.displayHtml)
					OsuEmbed.setFooter(`Powered by nodesu`)
				message.channel.send(OsuEmbed)
/*
				const canvas = createCanvas(2780, 1332)
                const ctx = canvas.getContext('2d')
				const background = await loadImage("./modules/assets/backgrounds/ranking-panel@2x.png");

					ctx.globalAlpha = 0.75;
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha = 1;
				const attachment = new MessageAttachment(canvas.toBuffer(), 'profile.png');

             message.channel.send(attachment) */

			}).catch((err) => {

				if(err) throw err;

			})
	};
};
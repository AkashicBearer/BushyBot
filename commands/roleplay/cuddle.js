const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Neko = require("nekos.life");
const { sfw } = new Neko();

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cuddle',
            group: 'roleplay',
            memberName: 'cuddle',
            description: 'Pat a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to cuddle?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.cuddle().then((cuddle) => {

			const CUddleEbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					CUddleEbed.setAuthor(`${this.client.user.username} is cuddling ${message.author.username}.`)

				} else {

					CUddleEbed.setAuthor(`${message.author.username} is cuddling ${args.member.user.username}.`)

				}
			
					CUddleEbed.setImage(cuddle.url)
					CUddleEbed.setColor(0xff00ff)
					CUddleEbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(CUddleEbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
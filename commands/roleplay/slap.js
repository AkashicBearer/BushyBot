const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Neko = require("nekos.life");
const { sfw } = new Neko();

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            group: 'roleplay',
            memberName: 'slap',
            description: 'slap a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to slap the shit out of?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.slap().then((slap) => {

			const SlapEmbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					SlapEmbed.setAuthor(`${this.client.user.username} is slapping ${message.author.username}.`)

				} else {

					SlapEmbed.setAuthor(`${message.author.username} is slapping ${args.member.user.username}.`)

				}
			
					SlapEmbed.setImage(slap.url)
					SlapEmbed.setColor(0xff00ff)
					SlapEmbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(SlapEmbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
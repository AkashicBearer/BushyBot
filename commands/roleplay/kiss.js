const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Neko = require("nekos.life");
const { sfw } = new Neko();

module.exports = class KissCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            group: 'roleplay',
            memberName: 'kiss',
            description: 'kiss a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to kiss?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.kiss().then((kiss) => {

			const KissEmbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					KissEmbed.setAuthor(`${this.client.user.username} is kissing ${message.author.username}.`)

				} else {

					KissEmbed.setAuthor(`${message.author.username} is kissing ${args.member.user.username}.`)

				}
			
					KissEmbed.setImage(kiss.url)
					KissEmbed.setColor(0xff00ff)
					KissEmbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(KissEmbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
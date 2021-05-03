const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Neko = require("nekos.life");
const { sfw } = new Neko();

module.exports = class PatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            group: 'roleplay',
            memberName: 'pat',
            description: 'Pat a user!',
            args: [
                {
                    key: 'member',
                    prompt: 'Who to pat?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    };
    async run(message, args) {

		sfw.pat().then((pat) => {

			const PatEmbed = new MessageEmbed()
				if(message.author.id == args.member.id || !args.member) {

					PatEmbed.setAuthor(`${this.client.user.username} is patting ${message.author.username}.`)

				} else {

					PatEmbed.setAuthor(`${message.author.username} is patting ${args.member.user.username}.`)

				}
			
					PatEmbed.setImage(pat.url)
					PatEmbed.setColor(0xff00ff)
					PatEmbed.setFooter(`Powered by Nekos.Life API`)
			message.channel.send(PatEmbed)

		}).catch((err) => {

			if(err) throw err;

		});
	};
};
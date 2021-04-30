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

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['commands'],
            group: 'utilisation',
            memberName: 'help',
            description: 'Shows commands of the Bot',
            examples: ["[prefix]help", "[prefix]help {command}"],
            args: [
                {
                    key: 'command',
                    prompt: 'Which command would you like to view the help for?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }
    
    async run(message, args) {

        let that = this
        let client = that.client

        let util = [];

        this.client.registry.commands.filter(c => c.groupID === "util").array().forEach(command => {
            util.push('`'+command.name+'`');
        });
        this.client.registry.commands.filter(c => c.groupID === "utilisation").array().forEach(command => {
            util.push('`'+command.name+'`');
        });
        util.join(",  ");

        const embed = new MessageEmbed()

        const nero = this.client.registry.commands

        if(nero.find(command => command.name === args.command)){

            const cmd = this.client.registry.commands.find(command => command.name === `${args.command}`)

            embed.setTitle("❯ Help for " + cmd.name)
            embed.addField("❯ Description", cmd.description+" ")

            var aliass = "";
            var examp = "";

            if(cmd.aliases.length > 0){
                for(var i = 0; i < cmd.aliases.length;i++){
                    aliass=aliass+"`"+cmd.aliases[i]+"`";
                    if(i+1 < cmd.aliases.length){
                        aliass=aliass+", ";
                    }
                }
            embed.addField("❯ Aliases",aliass+" ")
            }

            if(cmd.examples != null){
                for(var i = 0; i < cmd.examples.length;i++){
                    examp=examp+"`"+cmd.examples[i]+"`";
                    if(i+1 < cmd.examples.length){
                        examp=examp+", ";
                    }
                }
                embed.addField("❯ Examples",examp+" ")
            }

        
        }else{

            embed.setTitle(`${client.user.username}'s Commands`)

            if(util.length > 0){

                embed.addField(`❯ Utilisation Commands`, util+" ")

            }

        }

        embed.setThumbnail(client.user.avatarURL())
        embed.setColor("RANDOM")

    return message.embed(embed);
    
    }
}
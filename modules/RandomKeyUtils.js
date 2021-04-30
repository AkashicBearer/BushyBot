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

const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const Constants = require('./Constants')

const ALIGN = {
    TOP_LEFT: 1,
    TOP_CENTER: 2,
    TOP_RIGHT: 3,
    CENTER_RIGHT: 4,
    BOTTOM_RIGHT: 5,
    BOTTOM_CENTER: 6,
    BOTTOM_LEFT: 7,
    CENTER_LEFT: 8,
    CENTER: 9
}

class RandomKeyUtils {

    static randomInt(low, high) {

        return Math.floor(Math.random() * (high - low + 1) + low);

    }

    Percentage(partialValue, totalValue) {

        return (100 * partialValue) / totalValue;

    }

    static numberFormat(num) {

        return (
            num
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        )

    }

    convertToFahrenheit(celsius) {

        return celsius * 9 / 5 + 32
    }

    formatNumberK(number) {
        return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
    }


    shorten(text, maxLen = 2000) {

        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;

    }

    sortByName(arr, prop) {

        return arr.sort((a, b) => {
            if (prop) return a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1;
            return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        });
    }

    generateSuccessEmbed(message, title, description) {

        return this.generateEmbed(message, title, description).setColor(0x8ed938);

    }

    generateFailEmbed(message, title, description) {

        return this.generateEmbed(message, title, description).setColor(0xec3c42);

    }

    generateInfoEmbed(message, title, description) {

        return this.generateEmbed(message, title, description).setColor(0x389ed9);

    }

    generateEmbed(message, title, description) {

        return new MessageEmbed({
            title: title,
            description: description || '',
            timestamp: moment().format('LLL'),
            footer: {
                icon_url: message.author.displayAvatarURL(),
                text: message.author.tag
            },
        });

    }

    findArrayDuplicates(arr) {

        return arr.filter((value, index) => {
            return arr.indexOf(value) !== index
        })

    }

    formatDuration(duration) {

        return moment.duration(duration).format('hh:mm:ss', {
            stopTrim: 'm'
        })

    }

    capitalizeFirstLetter(string, everyWord = false) {

        const capitalizeWord = w => w.charAt(0).toUpperCase() + w.slice(1)

        if (everyWord) return string.split(' ').map(capitalizeWord).join(' ')

        return capitalizeWord(string)

    }

    resolveInviteCode(data) {
        //const inviteRegex = /discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i;
        const inviteRegex = /https?:\/\/discord.gg\/(?:invite|user\/\w+\/server\/\d+)/i
        const match = inviteRegex.exec(data);
        if (match && match[1]) return match[1];
        return data;
    }
    
    static list(arr, conj = 'and') {
            const len = arr.length;
            if (len === 0) return '';
            if (len === 1) return arr[0];
            return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
    }


    static today(timeZone) {
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);
        return now;
    }

    static tomorrow(timeZone) {
        const today = Util.today(timeZone);
        today.setDate(today.getDate() + 1);
        return today;
    }

    static trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

    // Canvas
    static initializeHelpers() {
        const self = this

        // Initiliaze fonts
        registerFont('modules/assets/fonts/Comic-Sans-MS.ttf', {
            family: 'Comic Sans MS'
        })
        registerFont('modules/assets/fonts/Montserrat-Thin.ttf', {
            family: 'Montserrat Thin'
        })
        registerFont('modules/assets/fonts/Montserrat-ThinItalic.ttf', {
            family: 'Montserrat Thin',
            style: 'italic'
        })
        registerFont('modules/assets/fonts/Montserrat-Light.ttf', {
            family: 'Montserrat Light'
        })
        registerFont('modules/assets/fonts/Montserrat-LightItalic.ttf', {
            family: 'Montserrat Light',
            style: 'italic'
        })
        registerFont('modules/assets/fonts/Montserrat-Regular.ttf', {
            family: 'Montserrat'
        })
        registerFont('modules/assets/fonts/Montserrat-Italic.ttf', {
            family: 'Montserrat',
            style: 'italic'
        })
        registerFont('modules/assets/fonts/Montserrat-Medium.ttf', {
            family: 'Montserrat Medium'
        })
        registerFont('modules/assets/fonts/Montserrat-MediumItalic.ttf', {
            family: 'Montserrat Medium',
            style: 'italic'
        })
        registerFont('modules/assets/fonts/Montserrat-SemiBold.ttf', {
            family: 'Montserrat SemiBold'
        })
        registerFont('modules/assets/fonts/Montserrat-SemiBoldItalic.ttf', {
            family: 'Montserrat SemiBold',
            style: 'italic'
        })
        registerFont('modules/assets/fonts/Montserrat-Bold.ttf', {
            family: 'Montserrat',
            weight: 'bold'
        })
        registerFont('modules/assets/fonts/Montserrat-BoldItalic.ttf', {
            family: 'Montserrat',
            style: 'italic',
            weight: 'bold'
        })
        registerFont('modules/assets/fonts/Montserrat-ExtraBold.ttf', {
            family: 'Montserrat ExtraBold'
        })
        registerFont('modules/assets/fonts/Montserrat-ExtraBoldItalic.ttf', {
            family: 'Montserrat ExtraBold',
            style: 'italic'
        })
        registerFont('modules/assets/fonts/Montserrat-Black.ttf', {
            family: 'Montserrat Black'
        })
        registerFont('modules/assets/fonts/Montserrat-BlackItalic.ttf', {
            family: 'Montserrat Black',
            style: 'italic'
        })
        registerFont('modules/assets/fonts/SFProDisplay-Regular.ttf', {
            family: 'SF Pro Display'
        })
        registerFont('modules/assets/fonts/Grota-Sans.ttf', {
            family: "Grota Sans"
        })
        registerFont('modules/assets/fonts/ITC-Vineyard.ttf', {
            family: "ITC-Vineyard"
        })
        registerFont('modules/assets/fonts/Monogram.ttf', {
            family: "Monogram"
        })
        registerFont('modules/assets/fonts/monofur.ttf', {
            family: "Monofur"
        })
        registerFont('modules/assets/fonts/Operator-9.ttf', {
            family: "Operator 9"
        })
        registerFont('modules/assets/fonts/Operator-9-Bold.ttf', {
            family: "Operator Nine Bold",
            weight: 'bold'
        })
    }
}

module.exports = class FileUtils {
    static async requireDirectory(dirPath, success, error, recursive = true) {
        const files = await FileUtils.readdir(dirPath)
        const filesObject = {}
        return Promise.all(files.map(async file => {
            const fullPath = path.resolve(dirPath, file)
            if (file.match(/\.(js|json)$/)) {
                try {
                    const required = require(fullPath)
                    if (success) await success(required)
                    filesObject[file] = required
                    return required
                } catch (e) {
                    error(e)
                }
            } else if (recursive) {
                const isDirectory = await FileUtils.stat(fullPath).then(f => f.isDirectory())
                if (isDirectory) {
                    return FileUtils.requireDirectory(fullPath, success, error)
                }
            }
        })).then(() => filesObject).catch(console.error)
    }
}

module.exports = RandomKeyUtils;
module.exports.readdir = promisify(fs.readdir)
module.exports.readFile = promisify(fs.readFile)
module.exports.stat = promisify(fs.stat)
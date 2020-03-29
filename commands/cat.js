const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");




module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get(`bổ sung sau`)
    //console.log(body.file)
    if(!{body}) return message.channel.send("I broke! Try again.")

        let cEmbed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setAuthor(`TestBot CATS!`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`TEST BOT`, bot.user.displayAvatarURL)

        message.channel.send({embed: cEmbed})

        msg.delete();
}


module.exports.config = {
    name: "cat",
    description: "sends a picture of a cat!",
    usage: "$cat",
    accessableby: "Members",
    aliases: ["catto"]
}
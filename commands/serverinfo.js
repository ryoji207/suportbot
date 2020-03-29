const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");



module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.MessageEmbed()
    .setColor(colours.cyan)
    .setTitle("Thông tin máy chủ")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Tên nhóm:**", `${message.guild.name}`, true)
    .addField("**Người Sáng Lập:**", `${message.guild.owner}`, true)
    .addField("**Member:**", `${message.guild.memberCount}`, true)
    .addField("**Số Role:**", `${message.guild.roles.size}`, true)
    .setFooter(`Code by Ryoji`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}

module.exports.config = {
    name: "serverinfo",
    description: "Pulls the serverinfo of the guild!",
    usage: "$serverinfo",
    accessableby: "Members",
    aliases: ["si", "serverdesc"]
}
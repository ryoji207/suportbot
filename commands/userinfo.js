const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const moment = require('moment');


module.exports.run = async (bot, message, args) => {
    let user = message.guild.member(message.mentions.users.first() || message.author);
    const member = message.guild.member(user);
    let infoUser = {};
        infoUser.id=user.user.id;
        infoUser.avatar="https://cdn.discordapp.com/avatars/"+user.user.id+"/"+user.user.avatar;
        infoUser.name=user.user.username;
        infoUser.tag=user.user.discriminator;
        infoUser.status=user.presence.status;
        infoUser.joinedSv=moment(member.joinedAt).fromNow();
        infoUser.create=moment(user.user.createdAt).fromNow();
   // console.log(user);
    let uEmbed = new Discord.MessageEmbed()
        .setColor(colours.cyan)
        .setTitle(infoUser.name+"#"+infoUser.tag)
        .setAuthor("Thông tin người dùng",infoUser.avatar)
        .setThumbnail(infoUser.avatar)
        .addField("Tên:", infoUser.name, true)
        .addField("Mã số:", infoUser.tag, true)
        .addField("ID:", infoUser.id, true)
        .addField("Thông tin:", infoUser.status, true)
        .addField("Ngày tham gia:", infoUser.joinedSv, true)
        .addField("Ngày tạo tài khoản:", infoUser.create, true)
   // .setFooter(bot.user.displayAvatarURL);
     return message.channel.send(uEmbed);

}


module.exports.config = {
    name: "userinfo",
    description: "Pulls the userinfo of yourself or a user!",
    usage: "$userinfo (@mention)",
    accessableby: "Members",
}
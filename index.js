const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const colours = require("./colours.json");


const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Call of Duty Warzone", {type: "STREAMING"});
})

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        console.log(`${f} is loaded!`);
        // pull.config.aliases.forEach(alias => {
        //     bot.aliases.set(alias, pull.config.name)
        // });
    });
    module.exports.run = async (bot, message, args)=>{
        if(message.author.bot || message.channel.type === "dm") return;
    }
});



bot.on("message", async message =>{
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)); //|| bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args);


//     if(cmd ===`${prefix}cat`){
//         let msg = await message.channel.send("Generating...")

//     let {body} = await superagent
//     .get(`http://aws.random.cat/meow`)
//     //console.log(body.file)
//     if(!{body}) return message.channel.send("I broke! Try again.")

//         let cEmbed = new Discord.RichEmbed()
//         .setColor(colours.cyan)
//         .setAuthor(`TestBot CATS!`, message.guild.iconURL)
//         .setImage(body.file)
//         .setTimestamp()
//         .setFooter(`TEST BOT`, bot.user.displayAvatarURL)

//         message.channel.send({embed: cEmbed})

//         msg.delete();
// }
//     if(cmd ===`${prefix}dog`){
//         let msg = await message.channel.send("Generating...")

//         let {body} = await superagent
//         .get(`https://dog.ceo/api/breeds/image/random`)
//         //console.log(body.file)
//         if(!{body}) return message.channel.send("I broke! Try again.")
    
//             let dEmbed = new Discord.RichEmbed()
//             .setColor(colours.cyan)
//             .setAuthor(`TestBot DOGS!`, message.guild.iconURL)
//             .setImage(body.message)
//             .setTimestamp()
//             .setFooter(`TEST BOT`, bot.user.displayAvatarURL)
    
//             message.channel.send({embed: dEmbed})
    
//             msg.delete();
//     }
    
//     if(cmd ===`${prefix}hello`){
//         return message.channel.send("Xin chào")
//     }

//     if(cmd ===`${prefix}serverinfo`){
//         let sEmbed = new Discord.MessageEmbed()
//         .setColor(colours.cyan)
//         .setTitle("Thông tin máy chủ")
//         .setThumbnail(message.guild.iconURL())
//         .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
//         .addField("**Tên nhóm:**", `${message.guild.name}`, true)
//         .addField("**Người Sáng Lập:**", `${message.guild.owner}`, true)
//         .addField("**Member:**", `${message.guild.memberCount}`, true)
//         .addField("**Số Role:**", `${message.guild.roles.size}`, true)
//         .setFooter(`Code by Ryoji`, bot.user.displayAvatarURL);
//         message.channel.send({embed: sEmbed});
//     }

//     if(cmd ===`${prefix}userinfo`){
//         let user = message.mentions.users.first() || message.author;

//         let uEmbed = new Discord.MessageEmbed()
//         .setColor(colours.cyan)
//         .setTitle("Thông tin người dùng")
//         .setThumbnail(user.displayAvatarURL)
//         .setAuthor(message.guild.name, message.guild.iconURL())
//         .setDescription("ID:", user.id)
//         .addField("Tên:", user.username, true)
//         .addField("Mã số:", user.discriminator, true)
//         .addField("ID:", user.id, true)
//         .addField("Thông tin:", user.presence.status, true)
//         .addField("Ngày tham gia:", user.joinedAt, true)
//         .setFooter(bot.user.displayAvatarURL);
    
//     }

//     if(cmd ===`${prefix}meme`){
//         let msg = await message.channel.send("Generating...")

//     let {body} = await superagent
//     .get(`https://api-to.get-a.life/meme`)
//     //console.log(body.file)
//     if(!{body}) return message.channel.send("I broke! Try again.")

//         let mEmbed = new Discord.RichEmbed()
//         .setColor(colours.cyan)
//         .setAuthor(`TestBot MEMES!`, message.guild.iconURL)
//         .setImage(body.url)
//         .setTimestamp()
//         .setFooter(`TEST BOT`, bot.user.displayAvatarURL)

//         message.channel.send({embed: mEmbed})

//         msg.delete();
// }


})

bot.login(botconfig.token);

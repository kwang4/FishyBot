
const Discord = require('discord.js');

const  User = require('../../database/schemas/User')
const  Guild = require('../../database/schemas/Guild')

const moment = require("moment");

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

exports.run = async (client, message, args) =>{
    

    var permissions = [];
    var warnings = 'None';
   
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

    
    
    if(member.hasPermission("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }
    
    if(member.hasPermission("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }
    
    if(member.hasPermission("ADMINISTRATOR")){
        permissions.push("Administrator");
    }

    if(member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }
    
    if(member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }
    
    if(member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(member.hasPermission("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Key Permissions Found");
    }

    if(member.user.id == message.guild.ownerID){
        acknowledgements = 'Server Owner';
    }

    const dbGuild = await Guild.findOne({id: message.guild.id});


    //var db_user = db_data.users[member.id]
    var usernames = '';
    var usernameDict = {};

    


    if(dbGuild.usernames.has(member.id)){
        usernames = '';
        usernameDict = dbGuild.usernames.get(member.id);
    }
    console.log(dbGuild)
    console.log(usernameDict)
    for(var username in usernameDict){
        var new_user = ' **'+username+ '**: *' +usernameDict[username] +'* **|**' ;
        usernames = usernames.concat(new_user);
    }
    
    if(usernames === ''){
        usernames = 'No username data, add with !friendme';
    }
    
    else{
        usernames = usernames.slice(0,-5);
    }
    

    // Regions 
    const region_role = member.roles.cache.find(role => Object.keys(client.emoji_data['regions']).includes(role.name))
    let region_role_name = "None assigned";
    if(region_role){
        region_role_name = region_role.name
    }
    

    const embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor(randomColor)
        .setFooter(`ID: ${member.id}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp()
        .addField("Region",`${region_role_name}`, true)
        .addField("Usernames",`${usernames}`, true)
        .addField('Joined at: ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        //.addField("Created at: ",`${moment(member.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        //.addField("Permissions: ", `${permissions.join(', ')}`, true)
        .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
        //.addField("Acknowledgements: ", `${warnings}`, true);
        
    message.channel.send({embed});
        

    

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    perms: [
        
    ]
  };
  
const path = require("path")
exports.help = {
    category: __dirname.split(path.sep).pop(),
    name:"userinfo",
    description: "Shows the info of a user, including any saved usernames",
    usage: "!userinfo [user]"
};
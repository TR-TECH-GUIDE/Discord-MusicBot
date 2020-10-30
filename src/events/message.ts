import { Client, Message } from "discord.js";
import { config, commands } from "../index"
import { command } from "../index"

module.exports = async (client: Client, message: Message) => {
  if (message.author.bot) return;

  //Prefixes also have mention match
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : config.prefix;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  //Making the command lowerCase because our file name will be in lowerCase
  const stringCommand = args.shift().toLowerCase();

  //Searching a command
  const cmd: command = commands.get(stringCommand);
  //Searching a command aliases
  const aliases: command = commands.find(x => x.info.aliases.includes(stringCommand))

  //if(message.channel.type === "dm")return message.channel.send("None of the commands work in DMs. So please use commands in server!")

  //Executing the codes when we get the command or aliases
  if(cmd){
    cmd.run(client, message, args);
  }else if(aliases){
    aliases.run(client, message, args);
  }else return
};

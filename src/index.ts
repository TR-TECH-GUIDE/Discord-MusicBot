import * as dotenv from "dotenv";
import * as fs from "fs";
import { Collection, Client, Message, DMChannel, NewsChannel, TextChannel, VoiceChannel } from "discord.js";
dotenv.config()

export const client = new Client();//Making a discord bot client
export const commands = new Collection<string, command>();//Making client.commands as a Discord.js Collection
export const queue = new Map<string, IQueue>()

export interface IQueue{
  textChannel: TextChannel | DMChannel | NewsChannel,
  voiceChannel: VoiceChannel,
  connection: any,
  songs: any[],
  volume: number,
  playing: Boolean
}
export interface command{
  info: {
    name: string,
    description: string,
    usage: string,
    aliases: string[]
  },

  run: (client: Client, message: Message, args: string[]) => any
}

export const config: { prefix: string } = {
  prefix: process.env.PREFIX
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir(__dirname + "/commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

//Logging in to discord
client.login(process.env.TOKEN)

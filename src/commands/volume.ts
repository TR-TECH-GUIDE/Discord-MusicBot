import { MessageEmbed, Client, Message } from "discord.js"
import sendError from "../util/error"
import { queue } from "../index";

module.exports = {
  info: {
    name: "volume",
    description: "To change the server song queue volume",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function (client: Client, message: Message, args: number[]) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    let xd = new MessageEmbed()
    .setDescription(`I set the volume to: **${args[0]/5}/5**(it will be divied by 5)`)
    .setAuthor("Server Volume Manager", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};

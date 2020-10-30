import { MessageEmbed, Client, Message } from "discord.js"
import sendError from "../util/error"
import { queue } from "../index"

module.exports = {
  info: {
    name: "pause",
    description: "To pause the current music in the server",
    usage: "",
    aliases: [""],
  },

  run: async function (client: Client, message: Message, args: string[]) {
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setAuthor("Music has been paused!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  },
};

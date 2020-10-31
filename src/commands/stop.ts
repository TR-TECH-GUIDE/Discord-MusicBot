import { MessageEmbed, Client, Message } from "discord.js"
import sendError from "../util/error"
import { queue } from "../index";

module.exports = {
  info: {
    name: "stop",
    description: "To stop the music and clearing the queue",
    usage: "",
    aliases: [],
  },

  run: async function (client: Client, message: Message, args:string[]) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue)return sendError("There is nothing playing that I could stop for you.", message.channel);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop the music");
    message.react("✅")
  },
};

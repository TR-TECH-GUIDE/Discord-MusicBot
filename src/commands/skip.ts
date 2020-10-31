import { Client, Message } from "discord.js"
import sendError from "../util/error"
import { queue } from "../index"

module.exports = {
  info: {
    name: "skip",
    description: "To skip the current music",
    usage: "",
    aliases: ["s"],
  },

  run: async function (client: Client, message: Message, args: string[]) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue)return sendError("There is nothing playing that I could skip for you.", message.channel);
    serverQueue.connection.dispatcher.end("Skiped the music");
    message.react("✅")
  },
};

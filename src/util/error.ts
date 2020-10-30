import { TextChannel, MessageEmbed, DMChannel, NewsChannel } from "discord.js"

/**
 * Easy to send errors because im lazy to do the same things :p
 * @param {String} text - Message which is need to send
 * @param {TextChannel | DMChannel | NewsChannel} channel - A Channel to send error
 */
export default async (text: string, channel: TextChannel | DMChannel | NewsChannel) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter("Oops something went wrong :(")
    await channel.send(embed)
}

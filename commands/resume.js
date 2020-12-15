module.exports = {
  name: "duraklat", 
  description: "Resume the paused Song",
  execute (client, message, args) {
      const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  
  return message.channel.send("✅ | Duraklatılan şarkı sürdürüldü.") 
 }
    
    message.channel.send("Duraklatılan bir şarkı yok.")
    
  }
}

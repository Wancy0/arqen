const Genius = new (require("genius-lyrics"))("ApavK7sxIw4WfaTNVe1g9Hc8civ8WqGW0NWx_akrti6Bcg3Nc7ILibv9LoVDoT0-");
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "şarkı-sözleri", 
  description: "Get lyrics of Song",
  async execute (client, message, args) {
    
     const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Herhangi bir şarkı oynatmıyorum.");
    }
    
  let m = await message.channel.send("Şarkı sözlerini arıyorum.")  
    
    
    //NOw we gonna see on playing song
  Genius.tracks.search(serverQueue.songs[0].title)
.then(results => {
    const song = results[0];
    song.lyrics()
    .then(lyrics => {
      if (lyrics.length > 9999) {
        return message.channel.send("Şarkı sözleri çoook uzun.")
      }
      
      if (lyrics.length < 9999) {
        const lyricsEmbed = new MessageEmbed()
          .setColor("#ff2050")
          .setDescription(lyrics.trim());
        return m.edit('', lyricsEmbed);
      }
  m.delete()
      
    })
}).catch(err => message.channel.send("Şarkı sözlerini bulamadım."));
    
    
  }
}

const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = (client, member) => {
  const channel = client.channels.cache.get('1415778487771336876');

  const waveButton = new ButtonBuilder()
    .setCustomId('wave_hi')
    .setLabel('👋 Wave to say hi')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(waveButton);

  channel.send(`${member.user.username} just joined the server!`);
};
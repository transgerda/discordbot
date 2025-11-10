const { AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'poes',
  description: 'Stuur een poes 😺',
  devOnly: false,
  testOnly: false,
  deleted: false,

  callback: async (client, interaction) => {
    try {
      // Fetch random cat image
      const response = await fetch('https://cataas.com/cat');

      if (!response.ok) {
        await interaction.reply('Kon geen poes vinden 😿');
        return;
      }

      // Get image as buffer
      const imageBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);

      // Create attachment
      const attachment = new AttachmentBuilder(buffer, { name: 'poes.jpg' });

      // Send attachment
      await interaction.reply({  files: [attachment] });

    } catch (error) {
      console.error('Error fetching cat:', error);
      await interaction.reply('Er ging iets mis bij het ophalen van de poes 😿');
    }
  },
};


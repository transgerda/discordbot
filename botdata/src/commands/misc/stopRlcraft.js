const MessageFlags = require('discord.js');
const env = require('dotenv').config();

module.exports = {
  name: 'stoprlcraft',
  description: 'Stop the RLCraft server',
  devOnly: false,
  testOnly: false,
  //options: {},
  deleted: false,

  callback: async (client, interaction) => {
    const validUsers = [
        '985922043713302648', // sven
        '821692607881019413', // jayvano
        '671723191227514880', // ItsMartinus
    ];

    if (!validUsers.includes(interaction.member.user.id)) {
        interaction.reply({ flags: MessageFlags.Ephemeral, content: "Yusuf geen recht oeleh!!" });
        return;
    } 

    const res = await fetch('http://host.docker.internal:3333/stop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.X_API_KEY
        },
        body: JSON.stringify({
            'nameOrId': 'minecraft-rlcraft-server'
        })
    });

    if (!res.ok) {
        const errorMsg = await res.text();
        if (JSON.parse(errorMsg).error.includes('already stopped')) {
            interaction.reply( "Server is al uit a pang pang" );
            return;
        }
    } else {
        const data = await res.json();
        console.log(data);
        if (typeof data.succes !== 'undefined') {
            interaction.reply( "Server gaat uit oeleh" );
            return;
        } else {
            interaction.reply('Bombaclat is helemaal fout gegan');
        } 
    }
  },
}

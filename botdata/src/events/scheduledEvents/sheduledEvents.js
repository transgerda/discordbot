const cron = require('node-cron');
const { exec } = require('child_process');

module.exports = (client) => {
  // Runs every day at 8:00 AM server time
  cron.schedule('0 8 * * *', async () => {
    const channel = client.channels.cache.get('1415766287510147133');
    if (channel) {
      exec('/usr/games/fortune -s', (error, stdout, stderr) => {
        if (error) {
          console.error(`Exec error: ${error}`);
          console.error(`Stderr: ${stderr}`);
          channel.send('Error fetching fortune.');
          return;
        }
        channel.send(stdout || 'No fortune output.');
      });
    }
  });
};

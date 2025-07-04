const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

async function deployCommands() {
  const commands = [];
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(TOKEN);

  try {
    console.log('Déploiement des commandes slash...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('Commandes déployées avec succès.');
  } catch (error) {
    console.error('Erreur lors du déploiement des commandes :', error);
  }
}

module.exports = deployCommands;

// Si vous souhaitez exécuter ce fichier directement (hors Render), décommentez :
// deployCommands();

const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('Affiche une image depuis le dossier images')
    .addStringOption(option =>
      option.setName('nom')
        .setDescription("Nom de l'image (sans extension)")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused().toLowerCase();

    // Lire tous les fichiers du dossier images
    const imagesPath = path.join(__dirname, '../images');
    let files;
    try {
      files = fs.readdirSync(imagesPath);
    } catch (err) {
      console.error('Erreur lecture dossier images:', err);
      return interaction.respond([]);
    }

    // Extraire les noms sans extension
    const imageNames = files
      .filter(file => ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(path.extname(file).toLowerCase()))
      .map(file => path.parse(file).name);

    // Filtrer selon la saisie utilisateur (autocomplete)
    const filtered = imageNames.filter(name => name.toLowerCase().startsWith(focusedValue)).slice(0, 25);

    await interaction.respond(
      filtered.map(name => ({ name, value: name }))
    );
  },

  async execute(interaction) {
    const nom = interaction.options.getString('nom');

    // Construire le chemin complet de l'image en cherchant l'extension
    const imagesPath = path.join(__dirname, '../images');
    let files;
    try {
      files = fs.readdirSync(imagesPath);
    } catch (err) {
      console.error('Erreur lecture dossier images:', err);
      return interaction.reply({ content: 'Erreur interne lors de la lecture des images.', ephemeral: true });
    }

    // Trouver un fichier qui correspond au nom demandé (sans extension)
    const fileFound = files.find(file => path.parse(file).name.toLowerCase() === nom.toLowerCase());

    if (!fileFound) {
      return interaction.reply({ content: `Image "${nom}" introuvable.`, ephemeral: true });
    }

    // Construire l’URL brute GitHub (ou autre source) en fonction du fichier trouvé
    const url = `https://raw.githubusercontent.com/Michieru/bot-images/main/images/${fileFound}`;

    await interaction.reply({ files: [url] });
  }
};

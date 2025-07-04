const { SlashCommandBuilder } = require('discord.js');

const imageFiles = [
  'arbre_sacre',
  'boucaniers',
  'canonniers',
  'capitaine',
  'corsaire',
  'dryade_arcane',
  'dryade_epineuse',
  'dryade_sauvage',
  'egorgeurs',
  'esprit_de_la_foret',
  'fureur_de_la_nature',
  'gardienne_de_la_foret',
  'hamadryade',
  'la_flotte_noire',
  'les_maudits',
  'l_immortel',
  'nymphes_du_lac',
  'raid_de_pirates',
  'token_assassin',
  'token_engine',
  'token_rage',
  'treant',
  'vigie'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('Affiche une image depuis GitHub')
    .addStringOption(option =>
      option
        .setName('nom')
        .setDescription('Nom de l\'image')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused().toLowerCase();
    const filtered = imageFiles.filter(img => img.toLowerCase().startsWith(focusedValue));
    const choices = filtered.map(name => ({ name, value: name })).slice(0, 25);
    await interaction.respond(choices);
  },

  async execute(interaction) {
    const nomImage = interaction.options.getString('nom');
    const url = `https://raw.githubusercontent.com/Michieru/bot-images/main/images/${nomImage}.jpg`;
    await interaction.reply({ files: [url] });
  }
};

const { SlashCommandBuilder } = require('discord.js');

const imageFiles = [
  'Ancien_Prophete',
  'arbre_sacre',
  'Archange',
  'Ascension_Divine',
  'Ashigaru',
  'Assaut',
  'Assaut_Ninja',
  'Attaque_Caudale',
  'Baliste_Scorpion',
  'Belier',
  'boucaniers',
  'Broyeur_D_Os',
  'canonniers',
  'capitaine',
  'Catapultes_Cyclope',
  'Catapulte_Titanesque',
  'Commandant_de_Siege',
  'Conclave_de_L_Ordre',
  'corsaire',
  'Daimyo',
  'Danseur_des_Ombres',
  'Dard_D_Acier',
  'Dragonneaux',
  'Dragon_Abyssal',
  'Dragon_de_Tempete',
  'Dragon_Primitif',
  'Dragon_Rayonnant',
  'Dragon_Rouge',
  'dryade_arcane',
  'dryade_epineuse',
  'dryade_sauvage',
  'egorgeurs',
  'Empoisonneur',
  'esprit_de_la_foret',
  'fureur_de_la_nature',
  'gardienne_de_la_foret',
  'Griffon_Celeste',
  'Guerriere_Celeste',
  'hamadryade',
  'Hatamoto',
  'Heraut_Rayonnant',
  'Imperatrice',
  'Kunoichi',
  'Lames_Fantome',
  'Lanceuse_D_ombres',
  'la_flotte_noire',
  'les_maudits',
  'l_immortel',
  'Machinerie_de_Reparation',
  'Moines_Sohei',
  'nymphes_du_lac',
  'Oeuf_de_Dragon',
  'Portes_Divines',
  'Purification',
  'raid_de_pirates',
  'Raid_D_Assassins',
  'Redemptrices',
  'Regard_du_Faucon',
  'Rituel_Shinrei',
  'Ronin',
  'Saboteur',
  'Samourais',
  'Sentinelles_de_Lumiere',
  'Shogun',
  'Soleil_Levant',
  'Souffle_de_Feu',
  'token_assassin',
  'token_engine',
  'token_rage',
  'Tour_de_Siege',
  'treant',
  'Vengeresse_Rayonnante',
  'vigie',
  'Vipere_du_Desert',
  'Voleur_D_ames'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('carte')
    .setDescription('Affiche une carte')
    .addStringOption(option =>
      option
        .setName('nom')
        .setDescription('Nom de la carte')
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

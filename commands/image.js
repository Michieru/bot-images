const { SlashCommandBuilder } = require('discord.js');

const imageFiles = [
  'Aeromancienne',
  'Ancien_Prophete',
  'arbre_sacre',
  'Archange',
  'Archimage',
  'Ascension_Divine',
  'Ashigaru',
  'Assaillantes_aux_Boucliers',
  'Assaut',
  'Assaut_Ninja',
  'Attaque_Caudale',
  'Baliste_Scorpion',
  'Belier',
  'Berserker',
  'Bibliotheque_Arcane',
  'boucaniers',
  'Boule_de_Feu',
  'Broyeur_D_Os',
  'canonniers',
  'capitaine',
  'Catapultes_Cyclope',
  'Catapulte_Titanesque',
  'Chasseresse_Nocturne',
  'Chasseresse_Nordique',
  'Chauves-Souris_Geantes',
  'Chevalier_Sanguinaire',
  'Chevauchee_des_Valkyries',
  'Commandant_de_Siege',
  'Conclave_de_L_Ordre',
  'corsaire',
  'Daimyo',
  'Dame_du_Sang',
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
  'Eclairs_en_Chaine',
  'egorgeurs',
  'Electromancien',
  'Empoisonneur',
  'esprit_de_la_foret',
  'Essaim_de_Chauves-Souris',
  'Explosion_Arcane',
  'fureur_de_la_nature',
  'Fureur_Divine',
  'gardienne_de_la_foret',
  'Griffon_Celeste',
  'Guerriere_Celeste',
  'Guerriers_Vikings',
  'Guerrier_Runique',
  'hamadryade',
  'Hatamoto',
  'Heraut_Rayonnant',
  'Imperatrice',
  'Kunoichi',
  'Lames_Fantome',
  'Lanceuse_D_ombres',
  'la_flotte_noire',
  'les_maudits',
  'Lune_de_Sange',
  'l_immortel',
  'Machinerie_de_Reparation',
  'Mage_Arcane',
  'Moines_Sohei',
  'nymphes_du_lac',
  'Oeuf_de_Dragon',
  'Pillards_Vikings',
  'Portes_Divines',
  'Progéniture_Vampire',
  'Prophetesse',
  'Purification',
  'Pyromancienne',
  'Rage_Sanguinaire',
  'raid_de_pirates',
  'Raid_D_Assassins',
  'Redemptrices',
  'Regard_du_Faucon',
  'Rituel_Shinrei',
  'Rituel_Vampirique',
  'Ronin',
  'Saboteur',
  'Samourais',
  'Seigneur_de_la_Guerre',
  'Seigneur_Vampire',
  'Sentinelles_de_Lumiere',
  'Shogun',
  'Soleil_Levant',
  'Souffle_de_Feu',
  'token_assassin',
  'token_engine',
  'token_rage',
  'Tour_de_Siege',
  'treant',
  'Vampire_Premier-Ne',
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

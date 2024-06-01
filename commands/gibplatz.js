const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gibplatz')
		.setDescription('Gibt den User an der gegebenen Stelle im Leaderboard aus!')
        .addIntegerOption(option => 
            option
                .setName("platz")
                .setDescription("Gib den Platz im Leaderboard an den du Abfragen willst")
                .setRequired(true)),

	async execute(interaction) {
        const amount = interaction.options.getInteger("platz") - 1;
        const userIds = [...cancelMap.keys()];
        userIds.sort((a,b) => {return cancelMap.get(b) - cancelMap.get(a)});
        await interaction.reply(`Den ${amount + 1}. belegt ${(await interaction.guild.members.fetch(userIds[amount])).displayName} und wurde ${cancelMap.get(userIds[amount])} mal gecancelt!`);
       
	},
};
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cancelleaderboard')
		.setDescription('Zeigt die gecanceltesten'),
	async execute(interaction) {
        const userIds = [...cancelMap.keys()];
        userIds.sort((a,b) => {return cancelMap.get(b) - cancelMap.get(a)});

        let output = "";

        for (let i = 0; i < userIds.length && i < 5; i++) {
            
            output += `${i+1}. ${(await interaction.guild.members.fetch(userIds[i])).displayName} wurde ${cancelMap.get(userIds[i])} mal gecancelt\n`
        }

        await interaction.reply(output == "" ? "Leaderboard ist leer" : output);
        
	},
};
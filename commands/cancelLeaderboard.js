const { SlashCommandBuilder } = require('discord.js');
const helper = require("../helper.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cancelleaderboard')
		.setDescription('Zeigt die gecanceltesten'),
	async execute(interaction) {
        const userIds = helper.sortMap();
        let output = "";

        for (let i = 0; i < userIds.length && i < 5; i++) {
            //TODO: fix fetching member who isnt in guild
            output += `${i+1}. ${(await interaction.guild.members.fetch(userIds[i])).displayName} wurde ${cancelMap.get(userIds[i])} mal gecancelt\n`
        }

        await interaction.reply(output == "" ? "Leaderboard ist leer" : output);
        
	},
};
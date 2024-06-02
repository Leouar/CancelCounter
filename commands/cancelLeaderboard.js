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
            let name = "";
            try {
                name = (await interaction.guild.members.fetch(userIds[i])).displayName;
            } catch (error) {
                name = `${(await client.users.fetch(userIds[i])).globalName} (kein Servermitglied)`;
            }
            
            output += `${i+1}. ${name} wurde ${cancelMap.get(userIds[i])} mal gecancelt\n`
        }

        await interaction.reply(output == "" ? "Leaderboard ist leer" : output);
        
	},
};
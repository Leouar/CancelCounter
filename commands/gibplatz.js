const { SlashCommandBuilder } = require('discord.js');
const helper = require("../helper.js");

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
        if(amount >= 1){
            const userIds = helper.sortMap();
            let name = ``;
            try {
                name = (await interaction.guild.members.fetch(userIds[amount])).displayName;
            } catch (error) {
                name = `${(await client.users.fetch(userIds[amount])).globalName} (kein Servermitglied)`;
            }
            await interaction.reply(`Den ${amount + 1}. Platz belegt ${name} und wurde ${cancelMap.get(userIds[amount])} mal gecancelt!`);
        }
        else{
            await interaction.reply("Es gibt kein Platz unter 0 du bas");
        }
	},
};
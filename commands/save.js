const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setName('save')
		.setDescription('Savet den Map oder so'),
	async execute(interaction) {
        try {
            const cancelObj = Object.fromEntries(cancelMap);
            const cancelJson = JSON.stringify(cancelObj);
            fs.writeFileSync("./cancelJson.json", cancelJson);
            await interaction.reply({content: 'Ist gesavet', ephemeral: true});

        } catch(error) {
            await interaction.reply({content: "HAT NICHT GESPEICHERT!!!! WOMP WOMP", ephemeral: true});
        }
	},
};
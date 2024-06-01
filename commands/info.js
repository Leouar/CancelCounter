const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Gives information about the Bot'),
	async execute(interaction) {
		await interaction.reply('Dieser Bot zählt mit wie oft du schon von den Wokisten gekreuzigt wurdest.');
	},
};

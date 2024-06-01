const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gibcancel')
		.setDescription('Sagt wie oft jmd gecancelt wurde')
        .addUserOption(option => option.setName("target").setDescription("genau")),
	async execute(interaction) {

        const member = interaction.options.getMember("target") ?? interaction.member;
		await interaction.reply(`${member.displayName} wurde insgesamt ${cancelMap.get(member.user.id)} mal gecancelt!`);
		
	},
};
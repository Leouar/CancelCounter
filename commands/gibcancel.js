const { SlashCommandBuilder } = require('discord.js');
const helper = require("../helper.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gibcancel')
		.setDescription('Sagt wie oft jmd gecancelt wurde')
        .addUserOption(option => option.setName("target").setDescription("genau")),
	async execute(interaction) {
		const userIds = helper.sortMap();
        const member = interaction.options.getMember("target") ?? interaction.member;
		let output = "";

		if(cancelMap.get(member.user.id) != undefined){ 
			output = `${member.displayName} wurde insgesamt ${cancelMap.get(member.user.id)} mal gecancelt und belegt damit Platz ${userIds.indexOf(member.user.id) + 1}!`;
		}
		else{
			output = `${member.displayName} hat noch keine Einträge!`;
		}
	await interaction.reply(output);
	},
};
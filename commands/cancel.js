const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cancel')
		.setDescription('Es wird gecancelt!')
                .addUserOption(option => option.setName("opfer").setDescription("genau"))
                .addIntegerOption(option => option.setName("mächtigkeit").setDescription("ja")),

	async execute(interaction) {
        const user = interaction.options.getUser("opfer") ?? interaction.user;
        const amount = interaction.options.getInteger("mächtigkeit") ?? 1;

        cancelMap.set(user.id, (cancelMap.get(user.id) ?? 0) + amount);

        await interaction.reply(`${user} wurde ${amount} mal gecancelt!`);
        
	},
};

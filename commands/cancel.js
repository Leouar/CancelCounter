const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cancel')
		.setDescription('Es wird gecancelt!')
                .addUserOption(option => option.setName("opfer").setDescription("genau"))
                .addIntegerOption(option => option.setName("mächtigkeit").setDescription("ja")),

	async execute(interaction) {
        const amount = interaction.options.getInteger("mächtigkeit") ?? 1;
        
        if(amount >= 1){
                const user = interaction.options.getUser("opfer") ?? interaction.user;
                cancelMap.set(user.id, (cancelMap.get(user.id) ?? 0) + amount);

                await interaction.reply(`${user} wurde ${amount} mal gecancelt!`);
        }
        else{
                await interaction.reply(`Nicht negative canceln du kek!`)
        }
        
	},
};

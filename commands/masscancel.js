const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('masscancel')
        .setDescription('Cacnelt alle Personen im VC')
        .addIntegerOption(option => option.setName("mächtigkeit").setDescription("ja")),
    async execute(interaction) {    

        const amount = interaction.options.getInteger("mächtigkeit") ?? 1;
        
        if(amount >= 1){
            if (interaction.member.voice.channel != null) {
                let output = "";
                const members = interaction.member.voice.channel.members;
                for (let i = 0; i < members.size; i++) {
                    const userId = [...members.keys()][i];
                    cancelMap.set(userId, (cancelMap.get(userId) ?? 0) + amount);
                }

                for (let i = 0; i < members.size; i++) {
                    output += `${await client.users.fetch([...members.keys()][i])} wurde ${amount} mal gecancelt.\n`;
                }
                await interaction.reply(output);
            }
            else{
                await interaction.reply("Du bist nicht in einem VC");
            }
        }
        else{
            await interaction.reply("Du kannst nicht negativ canceln! WOMP WOMP");
        }
    }

};

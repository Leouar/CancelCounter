const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, DiscordAPIError } = require('discord.js');
const configJson = fs.readFileSync("./configJson.json", "utf8");
const configObj = JSON.parse(configJson);

const TOKEN = configObj.token;

global.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

global.cancelMap = new Map();

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    try {
        const cancelJson = fs.readFileSync("./cancelJson.json", "utf8");
        const cancelObj = JSON.parse(cancelJson);
        cancelMap = new Map(Object.entries(cancelObj));

    } catch(error){
        console.error("HAT NICHT GELESEN!!!! WOMP WOMP");
        process.exit();
    }
    
    setInterval(()=>{
        try {
            const cancelObj = Object.fromEntries(cancelMap);
            const cancelJson = JSON.stringify(cancelObj);
            fs.writeFileSync("./cancelJson.json", cancelJson);
        } catch(error) {
           console.error("HAT NICHT GESPEICHERT!!!! WOMP WOMP");
        }
    }, 600000 ); //save every 10min
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(TOKEN);
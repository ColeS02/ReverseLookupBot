const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, ActivityType, ButtonBuilder, ActionRowBuilder} = require('discord.js');


module.exports = async (interaction) => {

    if (!interaction.isButton()) return;
    if (interaction.customId.toString().includes('purchaseAccess')) {
        
        const embed = new EmbedBuilder()
            .setDescription('Click purchase option!')

        const dayPass = new ButtonBuilder()
            .setEmoji('💳')
            .setLabel('Day Pass')
            .setStyle('Primary')
            .setCustomId(`purchaseDayPass`);
        const weekPass = new ButtonBuilder()
            .setEmoji('💳')
            .setLabel('Week Pass')
            .setStyle('Primary')
            .setCustomId(`purchaseWeekPass`);
        const monthSubscription = new ButtonBuilder()
            .setEmoji('💳')
            .setLabel('Month Subscription')
            .setStyle('Primary')
            .setCustomId(`purchaseMonthSubscription`);

        const actionRow = new ActionRowBuilder().addComponents(dayPass, weekPass, monthSubscription);

        interaction.reply({embeds: [embed], components: [actionRow], ephemeral: true});
    }
    if (interaction.customId.toString().includes('free')) {
        const member = interaction.member;
        const role = interaction.guild.roles.cache.find((role) => role.id === process.env.PURCHASED_ROLE);
        try {
            await member.roles.add(role);
            interaction.reply({content: 'Success', ephemeral: true});
        } catch (error) {
            
        }
    }
    if (interaction.customId.toString().includes('purchaseDayPass')) {
        const embed = new EmbedBuilder()
            .setDescription('[Click Here!](https://info-finder.tebex.io/package/6089582)');
        
        interaction.reply({embeds: [embed], ephemeral: true})
    }
    if (interaction.customId.toString().includes('purchaseWeekPass')) {
        const embed = new EmbedBuilder()
            .setDescription('[Click Here!](https://info-finder.tebex.io/package/6089582)');

        interaction.reply({embeds: [embed], ephemeral: true})
    }
    if (interaction.customId.toString().includes('purchaseMonthSubscription')) {
        const embed = new EmbedBuilder()
            .setDescription('[Click Here!](https://info-finder.tebex.io/package/6089582)');

        interaction.reply({embeds: [embed], ephemeral: true})
    }
};
const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, ActivityType, ButtonBuilder, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder} = require('discord.js');


module.exports = async (interaction) => {

    if (!interaction.isButton()) return;
    if (interaction.customId.toString().includes('phoneLookup')) {

        const member = interaction.guild.members.cache.get(interaction.user.id);
        const hasRole = member.roles.cache.has(process.env.PURCHASED_ROLE);

        if (!hasRole) {
            const embed = new EmbedBuilder()
                .setTitle('Insufficient Permission')
                .setDescription('To gain access and unlock additional features, click the button below to purchase!')
                .setColor('#ff0000')
                .setTimestamp();

            const purchaseButton = new ButtonBuilder()
                .setEmoji('💳')
                .setLabel('Purchase')
                .setStyle('Primary')
                .setCustomId(`purchaseAccess`);

            const actionRow = new ActionRowBuilder().addComponents(purchaseButton);

            interaction.reply({embeds: [embed], components: [actionRow], ephemeral: true});
            return;
        }
        
        const modal = new ModalBuilder()
            .setCustomId('reverseLookupModal')
            .setTitle('Reverse Lookup')
        
        const phoneNumberInput = new TextInputBuilder()
            .setCustomId('phoneNumberInput')
            .setLabel('Enter the desired phone number.')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(phoneNumberInput);
        
        modal.addComponents(firstActionRow);
        
        await interaction.showModal(modal);
        
    }
};
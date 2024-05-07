const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, ActivityType, ButtonBuilder, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder} = require('discord.js');
const {processPhoneNumber} = require("../../util/phoneLookup");
const LOG_CHANNEL_ID = '1197989418280173709'


module.exports = async (interaction) => {

    if (!interaction.isModalSubmit()) return;
    if (interaction.customId.toString().includes('reverseLookupModal')) {
        const number = interaction.fields.getTextInputValue('phoneNumberInput');
        const result = await processPhoneNumber(number);

        if(!result.success) {
            const embed = new EmbedBuilder()
                .setTitle('Invalid Phone Number')
                .setDescription('Please try again with a valid phone number!')
                .setColor('#ff0000')
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        const embed = createPhoneNumberEmbed(result);

        interaction.reply({embeds: embed, ephemeral: true});

        const channel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);
        channel.send({content: `<@${interaction.member.id}> Looked up number ${number}`, embeds: embed})
    }
};

function createPhoneNumberEmbed(phoneData) {
    const generalEmbed = new EmbedBuilder()
        .setTitle('Phone Number Information')
        .addFields([
            { name: 'Country Calling Code', value: phoneData.data.data.country_calling_code || 'Not Available' },
            { name: 'Line Type', value: phoneData.data.data.line_type || 'Not Available' },
            { name: 'Carrier', value: phoneData.data.data.carrier || 'Not Available' },
            { name: 'Is Prepaid', value: phoneData.data.data.is_prepaid ? 'Yes' : 'No' },
            { name: 'Is Commercial', value: phoneData.data.data.is_commercial ? 'Yes' : 'No' },
            { name: 'Belongs To', value: formatBelongsTo(phoneData.data.data.belongs_to) },
        ])
        .setColor('#3498db');

    const addressesEmbed = new EmbedBuilder()
        .setTitle('Current Addresses')
        .setDescription((phoneData.data.data.current_addresses && phoneData.data.data.current_addresses.length > 0) ?
            phoneData.data.data.current_addresses.map(address => {
                const latLong = address.lat_long ? `\`(${address.lat_long.latitude}, ${address.lat_long.longitude})\`` : '';
                return `${address.street_line_1}, ${address.city}, ${address.state_code} ${address.postal_code} ${latLong}`;
            }).join('\n') : 'Not Available')
        .setColor('#2ecc71');

    const associatedPeopleEmbed = new EmbedBuilder()
        .setTitle('Associated People')
        .setDescription(
            phoneData.data.data.associated_people.map(person => {
                return `${person.name} (${person.relation || 'Relation Not Available'})`;})
                .join('\n') || 'Not Available'
        )
        .setColor('#e74c3c');
    const historicalAddressesEmbed = new EmbedBuilder()
        .setTitle('Historical Addresses')
        .setDescription(phoneData.data.data.historical_addresses.map(address => {
            const latLong = address.lat_long ? `(${address.lat_long.latitude}, ${address.lat_long.longitude})` : '';
            return `${address.street_line_1}, ${address.city}, ${address.state_code} ${address.postal_code} ${latLong} (Start Date: ${address.link_to_person_start_date}, End Date: ${address.link_to_person_end_date})`;
        }).join('\n') || 'Not Available')
        .setColor('#f39c12');

    const alternatePhonesEmbed = new EmbedBuilder()
        .setTitle('Alternate Phones')
        .setDescription(phoneData.data.data.alternate_phones.map(alternatePhone => {
            return `${alternatePhone.phone_number} (${alternatePhone.line_type || 'Line Type Not Available'})`;
        }).join('\n') || 'Not Available')
        .setColor('#9b59b6');

    return [generalEmbed, addressesEmbed, associatedPeopleEmbed, historicalAddressesEmbed, alternatePhonesEmbed];
}

function formatBelongsTo(belongsTo) {
    return belongsTo ? belongsTo.name || 'Not Available' : 'Not Available';
}
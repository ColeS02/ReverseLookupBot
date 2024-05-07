const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, ActivityType, ButtonBuilder, ActionRowBuilder} = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const { processPhoneNumber } = require('../util/phoneLookup');
const { channelArray } = require('../events/ready/ready');

const axios = require('axios');
const cheerio = require('cheerio');

const data = new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Coles setup command!')
    .addStringOption((option) =>
       option
           .setName('type')
           .setDescription('Type of setup')
           .setRequired(true)
           .addChoices(
               {name: 'Phone Lookup', value: 'phonelookup'},
               {name: 'Join Information', value: 'joininformation'},
           )
    );

async function run({ interaction, client }) {
    if(interaction.user.id !== '138075822299807744') {
        interaction.reply({content: 'This command is only for Cole!', ephemeral: true})
        return;
    }

    const type = interaction.options.getString('type');
    
    if(type === 'phonelookup') {
        const embed = new EmbedBuilder()
            .setTitle('Reverse Phone Lookup')
            .setDescription('To retrieve information on a number, kindly use the command `/lookup <#>`.\nAlternatively, you may opt to click the designated button and provide the necessary information. Thank you.')
            .setColor('#28f75f');

        const purchaseButton = new ButtonBuilder()
            .setEmoji('✍️')
            .setLabel('Reverse Lookup')
            .setStyle('Primary')
            .setCustomId(`phoneLookup`);

        const actionRow = new ActionRowBuilder().addComponents(purchaseButton);

        interaction.channel.send({embeds: [embed], components: [actionRow], ephemeral: true});
        
        interaction.reply({content: 'Succesfully posted a new Reverse Phone Lookup embed!', ephemeral: true})
    }
    if(type === 'joininformation') {
        const embed = new EmbedBuilder()
            .setTitle('Reverse Phone Lookup')
            .setDescription('Greetings and welcome to the Reverse Lookup Discord community. To unlock full access to the array of features offered within our Discord server, kindly proceed by clicking the button below to make your purchase.')
            .setColor('#f542ce');

        const free = new EmbedBuilder()
            .setTitle('SALE')
            .setDescription('We are pleased to inform you that our service is currently being offered at no cost. Please press the button below to proceed and enjoy complimentary access to our features.')
            .setColor('#42f56f');

        const purchaseButton = new ButtonBuilder()
            .setEmoji('✍️')
            .setLabel('Reverse Lookup')
            .setStyle('Primary')
            .setCustomId(`phoneLookup`);

        const actionRow = new ActionRowBuilder().addComponents(purchaseButton);

        const freeButton = new ButtonBuilder()
            .setEmoji('✍️')
            .setLabel('FREE')
            .setStyle('Primary')
            .setCustomId(`free`);

        const secondActionRow = new ActionRowBuilder().addComponents(freeButton);

        interaction.channel.send({embeds: [embed], components: [actionRow], ephemeral: true});
        interaction.channel.send({embeds: [free], components: [secondActionRow], ephemeral: true});

        interaction.reply({content: 'Succesfully posted the join information embed', ephemeral: true})
    }
}





const options = {
    devOnly: false,
};

module.exports = { data, run, options };
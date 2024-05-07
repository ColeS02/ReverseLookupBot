const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, ActivityType, ButtonBuilder, ActionRowBuilder} = require('discord.js');

const JOIN_LOG_CHANNEL = '1198763340365836298';

module.exports = async (member) => {
    const embed = new EmbedBuilder()
        .setDescription(`${member.user} Joined the discord`)
        .setColor('#03fc45')

    const channel = member.guild.channels.cache.get(JOIN_LOG_CHANNEL);

    channel.send({embeds: [embed]});
};
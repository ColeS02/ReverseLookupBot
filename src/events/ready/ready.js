let channelArray = [];

module.exports = (client) => {

    console.log(`Logged in as ${client.user.tag}!`);
    const guilds = client.guilds.cache;

    client.guilds.cache.forEach(guild => {
        guild.channels.cache.forEach(channel => {
            channelArray.push({
                id: channel.id,
                name: channel.name,
                type: channel.type,
            });
        });
    });

};

module.exports.channelArray = channelArray;
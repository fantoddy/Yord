const { ShardingManager } = require('discord.js');
const config = require('./musico.config');

let manager = new ShardingManager('./musico.js', {
    token: config.botToken,
    totalShards: 'auto',
});

manager.on('shardCreate', shard => {
    console.log(`[SHARDS]: Launched shard ${shard.id}`)
});

manager.spawn();
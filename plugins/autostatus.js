const { Module } = require('../main');
const config = require('../config');
const { setVar } = require('./manage');

Module({
    pattern: 'autostatus ?(on|off)?',
    fromMe: true,
    desc: 'Enable or disable automatic status viewing',
    use: 'utility',
    usage: 'autostatus on / autostatus off'
}, async (message, match) => {
    const option = match[1];

    if (!option) {
        return await message.sendReply(
            `_Auto status viewer is currently_ *${config.AUTO_STATUS_VIEWER === 'true' ? 'ON' : 'OFF'}*`
        );
    }

    if (option === 'on') {
        await setVar('AUTO_STATUS_VIEWER', 'true');
        return await message.sendReply('_Auto status viewer enabled_ ✅');
    }

    if (option === 'off') {
        await setVar('AUTO_STATUS_VIEWER', 'false');
        return await message.sendReply('_Auto status viewer disabled_ ❌');
    }
});

Module({
    pattern: 'status-viewer',
    on: 'message',
    handler: false
}, async (message) => {
    try {
        if (config.AUTO_STATUS_VIEWER !== 'true') return;
        if (!message.data?.key) return;
        if (message.data.key.remoteJid !== 'status@broadcast') return;
        if (message.fromMe) return;

        await message.client.readMessages([message.data.key]);
    } catch {
        return;
    }
});

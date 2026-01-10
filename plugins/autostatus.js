const { Module } = require('../main');

Module({
    pattern: 'autostatusviewer',
    on: 'message',
    handler: false,
    desc: 'Automatically views all incoming WhatsApp status updates',
    use: 'utility'
}, async (message) => {
    try {
        if (!message.data || !message.data.key) return;
        if (message.data.key.remoteJid !== 'status@broadcast') return;
        if (message.fromMe) return;

        await message.client.readMessages([message.data.key]);
    } catch (error) {
        return;
    }
});

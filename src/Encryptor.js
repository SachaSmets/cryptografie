const nacl = require('libsodium-wrappers')

module.exports = async (key) => {
    await nacl.ready;
    return Object.freeze({
        encrypt: (message, nonce) => {
            return nacl.crypto_secretbox_easy(message, nonce, key);
        }
    })
}
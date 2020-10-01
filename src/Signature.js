const nacl = require('libsodium-wrappers');

module.exports = () => {
    return Object.freeze({
        verifyingKey: () => {
            let privatekey;
            nacl.crypto_sign_SECRETKEYBYTES(privatekey);
        },
        sign: () => {
            let signedmessage;
            nacl.crypto_sign(signedmessage, verifyingKey.privatekey);
            return signedmessage;
        }
    })
}
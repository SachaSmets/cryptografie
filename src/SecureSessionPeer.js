const nacl = require('libsodium-wrappers');

module.exports = () => {
    return Object.freeze({
        publicKey: () => {
            let publickey;
            nacl.crypto_box_PUBLICKEYBYTES(publickey);
        },
        _privateKey: () => {
           let privatekey;
           nacl.crypto_box_SECRETKEYBYTES(privatekey);
        },
        encrypt: (msg) => {
            let nonce;
            let key;
            let encryptedMessage;
            nacl.crypto_secretbox_keygen(key);
            nacl.randombytes_buf(8,nonce);
            nacl.crypto_secretbox_easy(msg,nonce,key,encryptedMessage);
            return encryptedMessage;
        }
    })
}
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
            let key = nacl.crypto_sign_keypair(publicKey.publickey, _privateKey.privatekey)
            // let nonce;
            let encryptedMessage = crypto_sign(msg, key)
            // nacl.crypto_secretbox_keygen(key);
            // nacl.randombytes_buf(8,nonce);
            // nacl.crypto_secretbox_easy(msg,nonce,key,encryptedMessage);
            return encryptedMessage;
        }
    })
}
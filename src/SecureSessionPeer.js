const nacl = require('libsodium-wrappers');
const enc = require('./Encryptor');
const dec = require('./Decryptor');

module.exports = async (peer=null) => {
    await nacl.ready;
    let sodium = nacl;
    const {publicKey, privateKey} = sodium.crypto_kx_keypair();

    let seshKeys, secureSesh ={}, encrypt,decrypt,msgpeer;

    if(peer){
        secureSesh=peer;

        seshKeys ={
            sharedTx,
            sharedRx
        }= sodium.crypto_kx_server_session_keys(publicKey,privateKey,secureSesh.publicKey);
        encrypt = await enc(seshKeys.sharedTx);
        decrypt = await dec(seshKeys.sharedRx);
        await peer.connect(publicKey);
    }

    let tempobj = {}

    tempobj.publicKey = publicKey;

    tempobj.setSesh = (Sesh) =>{
        secureSesh = Sesh;
    }

    tempobj.setmsg = (msg) =>{
        msgpeer = msg;
    }

    tempobj.send = (msg) =>{
        let encrypted = tempobj.encrypt(msg);
        secureSesh.setmsg(encrypted);
    }

    tempobj.receive = () =>{
        return tempobj.decrypt(msgpeer.ciphertext, msgpeer.nonce);
    }

    tempobj.encrypt = (msg) =>{
        const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
        const ciphertext = encrypt.encrypt(msg,nonce)
        return {ciphertext, nonce}
    }

    tempobj.decrypt = (ciphertext,nonce) =>{
        return decrypt.decrypt(ciphertext,nonce);
    }

    tempobj.connect = async(secPubKey) => {
        seshKeys ={
            sharedTx,
            sharedRx
        }= sodium.crypto_kx_client_session_keys(publicKey,privateKey,secPubKey);
        encrypt = await enc(seshKeys.sharedTx);
        decrypt = await dec(seshKeys.sharedRx);
    }

    if(peer){
        peer.setSesh(tempobj);
    }

    return Object.freeze(tempobj);
}
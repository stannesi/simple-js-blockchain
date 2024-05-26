// import crypto from 'crypto';
// // const crypto = require('crypto');

// // this is the elliptic curve used by Bitcoin and Ethereum
// const elliptic = require('elliptic');
// import { ec } from 'elliptic';
// const EC = elliptic.ec;
// const ec = new EC('secp256k1');

import { createHash } from 'crypto';
import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1'); // This is the elliptic curve used by Bitcoin and Ethereum


// const ec = new elliptic.ec('secp256k1');

// Create a SHA256 hash of a string
// const SHA256 = (value) => createHash('sha256').update(value).digest('hex');


class KeyGen
{
    constructor()
    {
        this.keyPair = EC.genKeyPair();
        this.publicKey = this.keyPair.getPublic('hex');
        this.privateKey = this.keyPair.getPrivate('hex');
        // this.address = SHA256(this.publicKey);    
    }

    SHA256(value, digest='hex')
    {
        return createHash('sha256').update(value).digest(digest);
    }

    get publicKey()
    {
        return this.publicKey;
    }

    get privateKey() { return this.privateKey; }
    get address() { return this.address; }
}

export default KeyGen;

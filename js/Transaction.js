import { createHash, createSign, createVerify } from 'crypto';

import ecPkg from 'elliptic';

// This is the elliptic curve used by Bitcoin and Ethereum
const { ec: EC } = ecPkg;
const ec = new EC('secp256k1');

// Transaction class
class Transaction
{
    constructor(senderAddress, recipientAddress, amount)
    {
        this.senderAddress = senderAddress;
        this.recipientAddress = recipientAddress;
        this.amount = amount;
    }

    // get hash function
    getHash()
    {
        return createHash('sha256').update(this.senderAddress + this.recipientAddress + this.amount).digest('hex');
    }

    // sign the transaction with a private key
    signTransaction(signingKey)
    {
        if (!signingKey) {
            throw new Error('No private key provided for signing the transaction.');
        }

        if (!this.senderAddress) {
            throw new Error('No sender address provided for signing the transaction.');
        }

        // if (signingKey.getPublic('hex') !== this.senderAddress) {
        //     throw new Error('You cannot sign transactions for other wallets!');
        // }

        // sign the transaction
        const hashTx = this.getHash();
        // const signature = signingKey.sign(hashTx, 'base64');
        // this.signature = signature.toDER('hex');

        this.signature = createSign('SHA256').update(hashTx).sign('ssecret', 'hex');
    }

    // verify the transaction
    verifyTransaction() {
        if (!this.recipientAddress) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }
        const hashTx = this.getHash();
        const key = ec.keyFromPublic(this.senderAddress, 'hex');
        console.log(hashTx);
        console.log(key);
        return publicKey.verify(hashTx, this.signature);
        // const publicKey = createVerify('SHA256').update(hashTx).verify(this.senderAddress, this.signature, 'hex');
        // return publicKey;
    }

    isValid()
    {
        return this.verifyTransaction();
    }   
}

export default Transaction;
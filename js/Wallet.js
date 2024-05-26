
import { createHash, generateKeyPairSync } from 'crypto';
import ecPkg from 'elliptic';
import Transaction from './Transaction.js';

// This is the elliptic curve used by Bitcoin and Ethereum
const { ec: EC } = ecPkg;
const ec = new EC('secp256k1');

class Wallet
{
    constructor()
    {
        this.keyPair = ec.genKeyPair();
        // this.keyPair = generateKeyPairSync('rsa', {
        //     modulusLength: 2048,
        //     publicKeyEncoding: {
        //         type: 'spki',
        //         format: 'pem'
        //     },
        //     privateKeyEncoding: {
        //         type: 'pkcs8',
        //         format: 'pem'
        //     }
        // });

        this.privateKey = this.keyPair.getPrivate('hex');
        this.publicKey = this.keyPair.getPublic('hex');
        this.address = this.generateAddress(this.publicKey);
    }

    generateAddress(key)
    {
        const publicKeyHash = createHash('sha256').update(key).digest();
        const address = createHash('ripemd160').update(publicKeyHash).digest('hex');
        return address;
    }

    // signTransaction(transaction)
    // {
    //     const hashTX = createHash('sha256').update(JSON.stringify(transaction)).digest('hex');
    //     const signature = this.keyPair.sign(transactionHash);
    //     return signature.toDER('hex');
    // }

    static verifySignature(publicKey, transaction, signature)
    {
        const transactionHash = createHash('sha256').update(JSON.stringify(transaction)).digest('hex');
        const key = ec.keyFromPublic(publicKey, 'hex');
        return key.verify(transactionHash, signature);
    }

    sendFunds(recipientAddress, amount)
    {
        const transaction = new Transaction(this.address, recipientAddress, amount);
        transaction.signTransaction(this.keyPair);
        return transaction;
    }

    printWalletInfo()
    {
        console.log('*******************************************');
        console.log('Wallet Info');
        console.log('Address:', this.address);
        console.log('Private key:', this.privateKey);
        console.log('Public key:', this.publicKey);
        console.log('*******************************************');
    }
}

export default Wallet;
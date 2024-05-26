import { createHash } from 'crypto';

// create a SHA256 hash of a string
// const SHA256 = (value) => createHash('sha256').update(value).digest('hex');

// Block class
class Block 
{
    constructor(index = 0, transactions, previousHash = '') 
    {
        this.index = index;
        // this.timestamp = new Date().toISOString()
        this.timestamp = Date.now();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        // hash is automatically calculated
        // when creating a new Block
        this.hash = this.getHash();
    }

    // get hash function
    getHash()
    {
        // create a SHA256 hash of a string
        return createHash('sha256').update(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.nonce
        ).digest('hex');
    }

    // mine function
    mine(difficulty) 
    {
        const target = Array(difficulty + 1).join('0');

        while (this.hash.substring(0, difficulty) !== target)
        {
            this.nonce++;
            this.hash = this.getHash();
        }

        console.log(`:: BLOCK MINED: ${this.hash}`);
    }

    // verify function
    hasValidTransactions()
    {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}

export default Block;
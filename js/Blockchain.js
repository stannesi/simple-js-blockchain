import Block from './Block.js';
import Transaction from './Transaction.js';

// Blockchain class
class Blockchain
{
    constructor(id)
    {
        this.id = id;
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 10;
        this.difficulty = 2;
        // this.blockTime = 30000;
        // this.difficulty += Date.now() - parseInt(this.lastBlock.timestamp) < this.blockTime ? 1 : -1;
    }

    // create the genesis block
    createGenesisBlock()
    {
        return new Block(0, [], '0',);
    }

    // get the last block
    get lastBlock()
    {
        return this.chain[this.length - 1];
    }

    get length()
    {
        return this.chain.length;
    }

    getBlock(index)
    {
        return this.chain[index];
    }

    // add a new block 
    addBlock(transactions)
    {
        const previousHash = this.lastBlock.hash;
        const block = new Block(this.length, transactions, previousHash);       
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(this.lastBlock));
        console.log(':: BLOCK #' + block.index + '  has been successfully mined!');
        return block;
    }

    // check if the chain is valid
    isChainValid() {
      const len = this.chain.length;

      for (let i = 1; i < len; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];

        if (currentBlock.index - 1 != previousBlock.index) {
          return false;
        } else if (currentBlock.hash !== currentBlock.getHash()) {
          console.log('Invalid block current ', currentBlock);
          return false;
        } else if (currentBlock.previousHash !== previousBlock.hash) {
          console.log('Invalid block previous', previousBlock);
          return false;
        }
        return true;
      }
    }

    // mine a block
    minePendingTransactions(miningRewardAddress)
    {      
        const rewardTransaction = new Transaction( null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTransaction);
        
        console.log(':: Mining pending transactions...');
        console.log(':: Reward transaction: ', rewardTransaction);
        console.log(':: Pending transactions: ', this.pendingTransactions);
        console.log(':: Previous block: ', this.lastBlock);

        this.addBlock(this.pendingTransactions, this.lastBlock.hash);
        
        // this.difficulty += Date.now() - parseInt(this.lastBlock.timestamp) < this.blockTime ? 1 : -1;
        // console.log(':: Difficulty: ', this.difficulty);

        this.pendingTransactions = [];
    }

    // add a new transaction
    addTransaction(transaction)
    {
      if (!transaction.senderAddress || !transaction.recipientAddress) {
        throw new Error('Transaction must include a sender and recipient address');
    }

    if (transaction.senderAddress === transaction.recipientAddress) {
        throw new Error('Transaction sender and recipient cannot be the same');
    }

    if (!transaction.amount || transaction.amount <= 0) {
        throw new Error('Transaction must include a positive amount and to address');
    }

    if (!transaction.isValid()) {
        throw new Error('Cannot add invalid transaction to chain');
    }

      this.pendingTransactions.push(transaction);
    }

    // get balance of an address
    getBalanceOfAddress(address)
    {
        let balance = 0;
        for (const block of this.chain)
        {
            if (block.transactions.length > 0)
            {
                for (const transaction of block.transactions)
                {
                    if (transaction !== null) 
                    {
                        if (transaction.senderAddress === address)
                        {
                            balance -= transaction.amount;
                        }

                        if (transaction.recipientAddress === address)
                        {
                            balance += transaction.amount;
                        }
                    }
                }
            }
        }

        return balance;
    }
}

export default Blockchain;
import Blockchain from './js/Blockchain.js';
import Wallet  from './js/Wallet.js';


const simpleCoin = new Blockchain("simple-coin");
console.log('...Starting BLOCKCHAIN: ', simpleCoin.id);

const myWallet = new Wallet();
const benWallet = new Wallet();

myWallet.printWalletInfo();

console.log('\nMy Wallet Public Key:', myWallet.address);
console.log('Ben Wallet Public Key:', benWallet.address+ '\n');

console.log('Creating a transaction...');
const tx1 = myWallet.sendFunds(benWallet.address, 4.5);

console.log('Transaction:', tx1);

console.log('Mining block...');
simpleCoin.addTransaction(tx1);
simpleCoin.minePendingTransactions(myWallet.address);

console.log('My balance:', simpleCoin.getBalanceOfAddress(myWallet.publicKey));
console.log('Ben balance:', simpleCoin.getBalanceOfAddress(benWallet.publicKey));

// Creating a transaction
// const myTransaction = new Transaction(myWallet.address, 'recipient_address', 10);
// console.log('Transaction:', myTransaction);

// Signing the transaction
// const signature = myWallet.signTransaction(myTransaction);
// console.log('Signature:', signature);

// Verifying the transaction
// const isValid = Wallet.verifySignature(myWallet.publicKey, myTransaction, signature);
// console.log('Is transaction valid?', isValid);

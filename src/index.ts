import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';
import { publicKey } from './Adresses';
import bs58 from 'bs58';

const app = express();

const Helius_Response = { 
    "nativeTransfers": [{ 
        "amount": 1000000000, 
        "fromUserAccount": "E6gZBUdyWJmLwisKq8yy5RxoYKXSwkqMjgzgZeF45vqD", 
        "toUserAccount": "CmFy3bnyYgJLy7JPeojRYzdGa5wPdPpMjWPE65kzrFxU" 
    }]}
app.post('/helius' , async(req , res ) =>{

    const incomingTransaction  = Helius_Response.nativeTransfers.find(
        (transaction) => transaction.toUserAccount === publicKey
    )
    
    if(!incomingTransaction){
        res.json({message : "processed"});
        return
    }
    const fromAddress = incomingTransaction.fromUserAccount;
    const toAddress = publicKey;
    const amount = incomingTransaction.amount;
    const type = "recieved_netive_sol"

    await mintTokens(fromAddress , amount);

    // if(type === 'recieved_netive_sol'){
    //     await mintTokens(fromAddress , amount);
    // }else{
    //     await burnTokens(fromAddress, toAddress, amount);
    //     await sendNativeTokens(fromAddress, toAddress, amount);
    // }

    res.send('Transaction completed');
})

app.listen(3000 , () => {
    console.log('Server is running on port 3000');
})
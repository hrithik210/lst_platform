import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { mintAdress, privateKey } from "./Adresses";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const privateKeyDecoded  = bs58.decode(privateKey!);

const payer = Keypair.fromSecretKey(Uint8Array.from(privateKeyDecoded));
console.log(`payer public key: ${payer.publicKey.toBase58()}`);
const mint = new PublicKey(mintAdress!);

export const mintTokens = async ( fromAddress:string , amount: number ) => {
    try {
        //create ata or get existing ata
        const userPublicKey = new PublicKey(fromAddress);
        
        const userATA = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            userPublicKey
        )
        console.log(`associated token account created for ${fromAddress}, ${userATA.address.toBase58()}`);
        const amountToMint = amount * 0.90;

        await mintTo(
            connection,
            payer,
            mint,
            userATA.address,
            payer.publicKey,
            amountToMint,
        );
        console.log(`Tokens minted successfully to account${fromAddress}: ${amountToMint}`);
        return amountToMint;
    } catch (error) {
        console.log(error);
        
    }
}

export const burnTokens = async ( fromAddress:string , toAddress:string , amount: number ) => {
    console.log(`Burned ${amount} tokens`);
}

export const sendNativeTokens = async ( fromAddress:string , toAddress:string , amount: number ) => {   
    console.log(`Sent ${amount} native tokens`);
}
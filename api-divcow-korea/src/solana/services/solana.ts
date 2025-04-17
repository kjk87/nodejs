import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { Keypair, Transaction, Connection, PublicKey, clusterApiUrl, SystemProgram } from "@solana/web3.js";
import { createTransferCheckedInstruction, getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import bs58 from 'bs58'



@Service()
export class SolanaService extends CoreService {

    


    public async transaction(fromAddress:string, toAddress:string, amount:number){

        const fromPubkey = new PublicKey(fromAddress);
        const toPubkey = new PublicKey(toAddress);
        const mintPubkey = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");

        const transaction = new Transaction();
        transaction.add(
            createTransferCheckedInstruction(
                fromPubkey,
                mintPubkey,
                toPubkey,
                fromPubkey,
                amount,
                9,
                [],
                TOKEN_2022_PROGRAM_ID
            )
        );

        // transaction.add(
        //     SystemProgram.transfer({
        //         fromPubkey: fromPubkey,
        //         toPubkey: toPubkey,
        //         lamports: 100,
        //       })
        
        // );

        const NETWORK = clusterApiUrl("devnet");
        const connection = new Connection(NETWORK);

        transaction.feePayer = fromPubkey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        const serializedTransaction = transaction.serialize({requireAllSignatures: false});

        return bs58.encode(serializedTransaction);
    }
}
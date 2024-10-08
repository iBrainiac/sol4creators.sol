import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from '../idl.json'; // Ensure you have the IDL file for your contract

const { SystemProgram } = web3;

const NFTInteraction = () => {
    const wallet = useWallet();
    const connection = new web3.Connection(web3.clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_NETWORK), 'confirmed');
    const programId = new web3.PublicKey(process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID);
    const provider = new Provider(connection, wallet, {});
    const program = new Program(idl, programId, provider);

    const mintNFT = async (uri) => {
        try {
            const mint = web3.Keypair.generate(); // Generate a new mint keypair

            await program.rpc.mintNft(uri, {
                accounts: {
                    mint: mint.publicKey,
                    authority: wallet.publicKey,
                    metadataProgram: new web3.PublicKey('MetaPlexMetadataProgramID'), // Replace with actual MetaPlex program ID
                },
                signers: [mint],
            });

            console.log('NFT minted:', mint.publicKey.toString());
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    };

    const tipCreator = async (receiverPublicKey, amount) => {
        try {
            await program.rpc.tipCreator(new web3.BN(amount), {
                accounts: {
                    sender: wallet.publicKey,
                    receiver: receiverPublicKey,
                    tokenProgram: TOKEN_PROGRAM_ID,
                },
            });

            console.log('Tip sent:', amount);
        } catch (error) {
            console.error('Error tipping creator:', error);
        }
    };

    return (
        <div>
            <button onClick={() => mintNFT('https://example.com/metadata.json')}>Mint NFT</button>
            <button onClick={() => tipCreator('ReceiverPublicKeyHere', 1000000)}>Tip Creator</button>
        </div>
    );
};

export default NFTInteraction;
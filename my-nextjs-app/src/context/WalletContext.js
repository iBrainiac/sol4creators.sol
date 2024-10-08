import React, { createContext, useContext } from 'react';
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';

const WalletContext = createContext();

export const WalletContextProvider = ({ children }) => {
    const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
    const endpoint = clusterApiUrl(network);
    const wallets = [new SolflareWalletAdapter()];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const useWalletContext = () => {
    return useContext(WalletContext);
};
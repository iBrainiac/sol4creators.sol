import Head from 'next/head';
import NFTInteraction from '../components/NFTInteraction';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Solana DApp</title>
            </Head>
            <main>
                <h1>Welcome to the Solana DApp</h1>
                <NFTInteraction />
            </main>
        </div>
    );
}
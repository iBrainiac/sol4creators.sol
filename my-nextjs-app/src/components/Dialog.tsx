"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWallet } from "@solana/wallet-adapter-react"
import { flex, vstack } from "@/styled-system/patterns"
import Image from "next/image"
import { clipAddress } from "@/lib/utils"
import { css } from "@/styled-system/css"
import { ModalProps } from "./modal"
import { useTheme } from "next-themes"
import { useState } from "react"

export function WalletDialog() {

	const { publicKey } = useWallet();
	const { theme } = useTheme();
	const [listWalletModal, setListWalletModal] = useState(false);

	let isConnected = publicKey ?? false;

	
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{isConnected? (
						<DisconnectWallet />
					) : "Connect Wallet"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isConnected? (
												<DisconnectWallet />

					) : "Connect Wallet"}</DialogTitle>
        
        </DialogHeader>
        <div className="grid gap-4 py-4">
         	{/* ! hack to set modal width below that's why empty element */}
				<section style={{ width: "30vw" }}></section>{" "}
				<section
					className={css({
						color: "textFixedLight",
						fontSize: " headline30",
						fontWeight: " headline30",
						maxWidth: "100vw",
						padding: "20px 0",
					})}
				>
					Select Wallet
				</section>
				<section
					style={{
						fontWeight: "normal",
					}}
				>
					<WalletList />
				</section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type WalletListModalProps = Omit<ModalProps, "children">;
function WalletListModal({ isOpen, onClose }: WalletListModalProps) {
	return (
		<>
				{/* ! hack to set modal width below that's why empty element */}
				<section style={{ width: "30vw" }}></section>{" "}
				<section
					className={css({
						color: "textFixedLight",
						fontSize: " headline30",
						fontWeight: " headline30",
						maxWidth: "100vw",
						padding: "20px 0",
					})}
				>
					Select Wallet
				</section>
				<section
					style={{
						fontWeight: "normal",
					}}
				>
					<WalletList />
				</section>
			
		</>
	);
}

function WalletList() {
	const { wallets, select } = useWallet();

	const installedWallets = wallets.filter(
		(wallet) => wallet.readyState === "Installed"
	);

	return (
		<section
			className={vstack({
				alignItems: "flex-start",
				border: "2px solid token(colors.borderPrimary)",
				borderRadius: 20,
				color: "textFixedLight",
				gap: 2,
				padding: 6,
			})}
		>
			{installedWallets.length === 0 && (
				<section>
					Please Install a Compatible Solana wallet to continue
				</section>
			)}

			{installedWallets.map((wallet) => (
				<WalletItem
					key={wallet.adapter.name}
					name={wallet.adapter.name}
					iconSrc={wallet.adapter.icon}
					connect={() => select(wallet.adapter.name)}
				/>
			))}
		</section>
	);
}

type WalletItemProps = {
	name: string;
	iconSrc: string;
	connect: () => void;
};
function WalletItem({ name, iconSrc, connect }: WalletItemProps) {
	return (
		<section
			onClick={connect}
			className={flex({
				border: "2px solid token(colors.primaryText)",
				gap: 2,
				padding: "5px 10px",
				width: "100%",
				_hover: {
					background: "token(colors.accentLightBackground)",
					color: "token(colors.primaryText)",
					cursor: "pointer",
				},
			})}
		>
			<section>
				{/* <Image nextHeight={36} nextWidth={36} src={iconSrc} />
				 */}

				<Image
					style={{ objectFit: "cover" }}
					src={iconSrc}
					alt={"wallet icon"}
					height={36}
					width={36}
				/>
			</section>
			<section style={{ margin: "auto 0" }}>{name}</section>
		</section>
	);
}

function DisconnectWallet() {
	const { publicKey, disconnect } = useWallet();

	return (
		<span>
			<button onClick={disconnect}>
				{clipAddress(publicKey?.toBase58() ?? "unknown")}
			</button>
		</span>
	);
}
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, Transfer};
use mpl_token_metadata::instruction as metadata_instruction;
use mpl_token_metadata::state::{Metadata, MetadataAccount};

declare_id!("YourProgramIDHere");

#[program]
pub mod my_solana_project {
    use super::*;

    // Function to initialize the connection (for wallet purposes)
    pub fn connect_wallet(ctx: Context<ConnectWallet>) -> ProgramResult {
        Ok(())
    }

    // Function to mint video/photo as an NFT
    pub fn mint_nft(ctx: Context<MintNFT>, uri: String) -> ProgramResult {
        let metadata_accounts = &mut ctx.accounts;
        let mint = &metadata_accounts.mint;

        // Create metadata
        let metadata_instruction = metadata_instruction::create_metadata_accounts_v2(
            ctx.accounts.metadata_program.key(),
            mint.key(),
            metadata_accounts.authority.key(),
            metadata_accounts.authority.key(),
            metadata_accounts.authority.key(),
            uri,
            "My NFT".to_string(), // Name
            "MYNFT".to_string(),  // Symbol
            None,                  // URI for the NFT
            None,                  // Seller Fees Basis Points
            true,                  // Is mutable
            None,                  // Collection
            None,                  // Uses
        );

        // Call the token metadata program
        invoke(
            &metadata_instruction,
            &[
                metadata_accounts.metadata_program.to_account_info(),
                mint.to_account_info(),
                metadata_accounts.authority.to_account_info(),
            ],
        )?;

        Ok(())
    }

    // Function to tip the creator
    pub fn tip_creator(ctx: Context<TipCreator>, amount: u64) -> ProgramResult {
        let cpi_accounts = Transfer {
            from: ctx.accounts.sender.to_account_info(),
            to: ctx.accounts.receiver.to_account_info(),
            authority: ctx.accounts.sender.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

        Ok(())
    }
}

// Contexts for the functions
#[derive(Accounts)]
pub struct ConnectWallet {}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(init)]
    pub mint: Account<'info, Mint>,
    pub authority: Signer<'info>,
    pub metadata_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct TipCreator<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,
    #[account(mut)]
    pub receiver: Account<'info, TokenAccount>,
    pub token_program: AccountInfo<'info>,
}
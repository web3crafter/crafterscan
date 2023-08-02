export const blockToolTipText = {
  blockHeight:
    "Also known as Block Number. Indicates the length of the blockchain",
  timestamp: "The date and time at which a block is produced.",
  transaction: "The number of transactions in the block.",
  feeRecipient: "Address receiving fees from transactions in this block",
  gasUsed: "The total gas used in the block",
  gasLimit: "Total gas limit provided by all transactions in the block",
  baseFeePerGas:
    "Post-London Upgrade, this represent the minimum gasUsed multiplier required for a tx to be included in a block",
  burntFees:
    "Post-London Upgrade, this represent the part of the tx fee that is burnt: baseFeePerGas * gasUsed",
  blockHash: "The hash of the block header of the current block",
  parentHash:
    "The hash of the block from which this block was generated, also known as the parent block",
}

export const txToolTipText = {
  transactionHash:
    "Transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed",
  status: "The status of the transaction.",
  block: "Number of the block which the transaction is recorded.",
  timestamp: "The date and time at which a transaction is produced",
  from: "The sending party of the transaction",
  to: "The receiving party of the transaction (could be a contract address)",
  value: "The value being transacted in Ether",
  transactionFee:
    "Amount paid to the block producer for processing the transaction",
  gasPrice:
    "Cost per unit of gas specified for the transaction, in Gwei. The higher the gas price the higher chance of getting included in a block",
}

# CrafterScan - Ethereum Block Explorer

CrafterScan is a block explorer for the ethereum blockchain created as part of the Alchemy University course.
The Design is inspired by etherscan.
It allows users to explore and inspect the blockchain data, including blocks, transactions, and addresses, providing a user-friendly interface for interacting with the network.

![CrafterScan Screenshot](screenshot.png)

## Features

- View details of individual blocks and transactions.
- Search for specific blocks, transactions and addresses by their block number, transaction hash or address.
- Browse through the latest blocks and transactions on the blockchain.
- Visualize data using Tanstack Table for an easy-to-understand representation.

## Technologies Used

- Next.js 13
- TypeScript
- Tailwind CSS
- Shadcn
- Alchemy SDK
- ethers.js
- Tanstack Table

## Getting Started

To run CrafterScan locally, follow these steps:

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/crafterscan.git

```

2. install dependencies:

```bash
   npm install

```

3. Set up environment variables:

```bash
ALCHEMY_API_KEY=YOUR_API_KEY
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and go to:

```bash
 http://localhost:3000
```

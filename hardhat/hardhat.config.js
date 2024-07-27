require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();


const apiKey = process.env.API_KEY;

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log("Account address:", account.address);
    const balance = await account.provider.getBalance(account.address);
    console.log("Account balance:", balance.toString());

    // Get the chain ID as a decimal
    const chainIdDecimal = await ethers.provider.getNetwork().then(network => network.chainId);

    // Convert decimal chain ID to hexadecimal
    const chainIdHex = chainIdDecimal.toString(16);

    console.log("Chain ID (hex):", "0x" + chainIdHex);

    // Additional account information (optional)
    console.log("Account object:", account);
    console.log("Account mnemonic (if available):", account.mnemonic); // Might be undefined
    console.log("Account privateKey (if available):", account.privateKey); // Might be undefined
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url:`https://sepolia.infura.io/v3/${apiKey}` ,
      accounts: ["58e2d0562033480ff542f510eb6344c70cf81aa0d939b8c313c67545119e382d","0d1b1ec7ac04946ed8d60610c55fc886549bcc27ea43fee99bd0bcbde2ea7b75"]
    },
    

},
paths: {
  sources: "./contracts",
  tests: "./test",
  cache: "./cache",
  artifacts: "./artifacts"
},
};

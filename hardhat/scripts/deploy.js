const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  const PrescriptionStorage = await hre.ethers.getContractFactory("PrescriptionStorage");
  const prescriptionStorage = await PrescriptionStorage.deploy();

  await prescriptionStorage.deployed();

  console.log("PrescriptionStorage deployed to:", prescriptionStorage.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

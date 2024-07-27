const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PrescriptionStorage", (m) => {
 
  const prescriptionStorage = m.contract("PrescriptionStorage");

  return { prescriptionStorage };
});



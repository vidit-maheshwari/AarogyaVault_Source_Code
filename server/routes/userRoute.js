const express = require("express");
const {
  registerController,
  loginController,
  authController,
  userInfo,
} = require("../controllers/userCTRL");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/getUserData", authMiddleware, authController);
router.get("/userInfo", authMiddleware, userInfo);


// Example: Protect a route that requires the user to be a doctor
// router.get("/doctor-dashboard", authMiddleware, roleMiddleware("doctor"), (req, res) => {
//   res.json({ message: "Welcome to the doctor dashboard" });
// });

// // Example: Protect a route that requires the user to be a patient
// router.get("/patient-dashboard", authMiddleware, roleMiddleware("patient"), (req, res) => {
//   res.json({ message: "Welcome to the patient dashboard" });
// });

module.exports = router;

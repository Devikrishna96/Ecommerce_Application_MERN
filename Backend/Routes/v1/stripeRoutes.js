const express = require("express");
const router = express.Router();
const { stripeWebhook } = require("../../Controllers/stripewebhookController");

// ⚠ Use raw body parser, do NOT use auth middleware
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

module.exports = router;

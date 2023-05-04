const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
// const auth = require("../middleware/auth");


router.post("/add-sub-account", userCtrl.addSubAccount);

router.post("/get-sub-accounts", userCtrl.getSubAccounts);

router.post("/delete-sub-account", userCtrl.deleteSubAccount);

router.post("/create-sender-identity", userCtrl.createSenderIdentity);


router.post("/create-list", userCtrl.createList);

router.post("/get-lists", userCtrl.getLists);

router.post("/create-recipient", userCtrl.createRecipient);

router.post("/create-campaign", userCtrl.createCampaign);

router.post("/get-campaigns", userCtrl.getCampaigns);

router.post("/schedule-campaign", userCtrl.scheduleCampaign);

router.post("/get-stats", userCtrl.getStats);

// router.post("/test", userCtrl.test);
// router.post("/domain-auth", userCtrl.domainAuth);

module.exports = router;

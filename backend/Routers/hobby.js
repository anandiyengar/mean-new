const express = require("express")
const router = express.Router()
const {csvUpload} = require("./../controllers/hobby")
router.post("/upload/csv",csvUpload);
module.exports = router
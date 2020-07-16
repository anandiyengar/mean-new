const mongoose = require("mongoose")
const HobbyScheme = new mongoose.Schema({
	name:{
		type:String
	},
	hobby:{
		type:String
	}
})

module.exports = mongoose.model("Hobby",HobbyScheme)
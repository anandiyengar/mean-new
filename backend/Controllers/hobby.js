const Hobby = require("./../Models/Hobby")
const formidable = require("formidable")
const csv=require('csvtojson') 
exports.csvUpload = (req,res) =>{
 let temp;
 let form = new formidable.IncomingForm();
    form.parse(req,(error,fields,file)=>{
    const csvFilePath=file.picture.path

	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
		 for(var x=0;x<jsonObj;x++){   
         jsonObj[x].name = temp;  
         jsonObj[x].hobby = temp;  
         
     } 
		Hobby.insertMany(jsonObj,(error,csv)=>{
			if(error){
				return res.json("Error in CSV "+error);
			}
			return res.json(csv)
		})
	})
	    })
}
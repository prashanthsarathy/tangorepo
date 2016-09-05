var mongoose=require('mongoose');

var ReviewSchema = new mongoose.Schema({
	//sprintID: Number,
	forPaper: [{type:Number,ref:'Paper'}],
	paperauthor: [{type:Number,ref:'Paper'}],
	doneBy: [{type:Number,ref:'User'}],
	summary : String,
	overallRating:String,
	reviewerExpertise:String,
	strongPoints:String,
	weakPoints:String,
	detailedComments:String
});



mongoose.model('Review',ReviewSchema);
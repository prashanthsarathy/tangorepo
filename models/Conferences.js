var mongoose= require('mongoose');

var ConferenceSchema = new mongoose.Schema({

	confTitle:String,
	confDesc:String,
	initPaperDeadline:{type:Date, min:Date(Date.now)},
	finalPaperDeadline:{type:Date, min:Date(Date.now)},
	Chairpersons:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]

});

mongoose.model('Conference',ConferenceSchema);
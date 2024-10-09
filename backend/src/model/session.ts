var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

module.exports = function() {
    var Session = new Schema({
       questionId      : String,
       answerText      : String,
       sessionId       : String,
       startTime       : Date,
       endTime         : Date
    });
    mongoose.model("Session", Session);
};
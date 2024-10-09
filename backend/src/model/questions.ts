var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

module.exports = function() {
    var Questions = new Schema({
       text      : String
    });
    mongoose.model("Questions", Questions);
};

require('../model/model').initialize();
const mongoose = require('mongoose');

var Questions = mongoose.model("Questions");

export async function getAllquestions() {
       try {
          var returnValue = await Questions.find({});
          return returnValue;
       } catch (err) { 
           return (err);
       }
}

export async function checkQuestion(text: String) {
       try {
          var returnValue = await Questions.find({ text: text });
          return returnValue.length === 0 ? true : false;
       } catch (err) { 
           return (err);
       }
}

export async function insertQuestions(text: String) {
     try {
        const question = new Questions({ text: text });
        await question.save();
     } catch (err) {
       return (err);
     }
}

export async function deleteQuestions(_id: String) {
     try {
         const question = new Questions({ _id: _id });
         await question.deleteOne({ _id: _id });
     } catch (err) {
       return (err);
     }
}


   
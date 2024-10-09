import { Router } from 'express';
import { getAllquestions, insertQuestions } from '../services/questions_services';
import { generateQuestionAI } from '../services/openAI_services';
import moment from 'moment';
import * as mongoose from "mongoose";

var Session = mongoose.model("Session");
const router = Router();


// Main page Route
router.get('/', (req: any, res) => {
    res.send("Hello Chatbot");
});

router.post('/dialog', async (req: any, res) => {
    var question_Id = "";
    if(req.session.questions === undefined){ 
        const allQuestions = await getAllquestions();
        req.session.questions = allQuestions; 
        req.session.startTime = moment().format(); // session start time added first time
    }
        
    if (req.session.questionCount !== undefined) {
        
        if(req.session.questionCount >= req.session.questions.length - 1){
            // After Complete 10 temp local questions Open AI questions call here 
            var newQuestion = await generateQuestionAI();
            await insertQuestions(newQuestion);
            const allQuestions = await getAllquestions();
            req.session.questions = allQuestions; 
            
            // update questions in session
            question_Id = req.session.questions[req.session.questionCount]._id
            req.session.questionCount++;
            res.send(req.session.questions[req.session.questionCount]);

        } else{
            // local questions ask in db
            question_Id = req.session.questions[req.session.questionCount]._id
            req.session.questionCount++;
            res.send(req.session.questions[req.session.questionCount]);
        }

        // Added chat logs here
        try {
            const session = new Session({ questionId: question_Id, sessionId: req.session.id, startTime: req.session.startTime , answerText: req.body.answerText.toString()  });
            await session.save();
         } catch (err) {
            return (err);
         }

    }
    else {
        req.session.questionCount = 0; //first question
        res.send(req.session.questions[req.session.questionCount]);
    }
});

router.post('/destroySession', async (req: any, res) => {
    req.session.endTime = moment().format();
       await Session.updateMany({  sessionId: req.session.id }, { endTime: req.session.endTime }).exec(); 
       req.session.destroy(async (err: any)  => {
            if(err){
                res.status(500).send(err);
            }else {
                
                res.send("Thank you for all answer.")
            }
       })
});


export default router;





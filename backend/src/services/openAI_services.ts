const { OpenAI } = require("openai");
import dotenv from 'dotenv';
import { checkQuestion } from './questions_services';
dotenv.config();


const apiKey = process.env.OPENAPI_APIKEY;
const baseURL = "https://api.aimlapi.com/v1";
const userPrompt = "generate a one different question about cat";

const api = new OpenAI({
  apiKey,
  baseURL,
});

export async function generateQuestionAI() {
    try{
           const completion = await api.chat.completions.create({
           model: "gpt-4",
           messages: [
               {
                   role: "user",
                   content: userPrompt,
               },
           ]
          });
      
          const response = completion.choices[0].message.content;

          if(await checkQuestion(response)){
            return response;
          }else {
            generateQuestionAI();
          }
          


       } catch (err) { 
           return (err);
       }
}



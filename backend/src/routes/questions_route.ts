import { Router } from 'express';
import { getAllquestions, insertQuestions, deleteQuestions } from '../services/questions_services'

const router = Router();

/**
 * @swagger
 * /questions/getAllquestions:
 *   get:
 *     summary: Get a list of Questions
 *     description: Retrieve a list of questions from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of questions.
 */
router.get('/getAllquestions', async (req, res) => {
    const parameters = await getAllquestions();
    res.send(parameters);
});

/**
 * @swagger
 * /questions/addNewQuestions:
 *   post:
 *     summary: Creates a new question
 *     description: The question to create. 
 *     content:
 *        application/json: 
 *     parameters:
 *      - in: body
 *        name: question
 *        description: The question to create.
 *        schema:
 *          type: object
 *          properties:
 *            text:
 *              type: string
 *     responses:
 *       200:
 *         description: Successful create a list of questions.
 */
router.post('/addNewQuestions', async (req, res, next) => {
    await insertQuestions(req.body.text);
    res.send("200");
});

router.delete('/delete', async (req, res, next) => {
    await deleteQuestions(req.body._id);
    res.send("200");
});


export default router;


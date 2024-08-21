import { AppError, BadRequest, Unauthorized } from "../services/error.js";
import { saveBook } from "../services/connection.js";
import chalk from 'chalk';


async function createBook(req, res){
    console.log(chalk.blackBright.bgGreen.bold('Creating Book'));
    try{
        const title = req.body.title;
        const author = req.body.author;
        const publishedDate = req.body.publishedDate;
        const parsedDate = new Date(publishedDate);

        const reqData = {
            title: title,
            author: author,
            publishedDate: parsedDate
        }
        const isCreated = await saveBook(reqData);
        if(!isCreated){
            throw new BadRequest('BOOK_CREATED_FAILED')
        }
        
        const response = {
            httpCode: 200,
            httpMessage: 'SUCCESSFULY_CREATED_BOOK',
        };
        
        return res.status(200).json(response);
        
    } 
    
    catch(error){

        if(error instanceof AppError){
            return res.status(error.httpCode).json({
                httpCode: error.httpCode,
                httpMessage: error.message
            })
        }
        const response = {
            httpCode: 500,
            httpMessage: `ERROR: ${error.message}`
        }
        return res.status(500).json(response)
    }
   
}

export default createBook;
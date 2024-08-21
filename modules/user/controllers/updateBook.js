import { updateBookbyId } from "../services/connection.js";
import { AppError, BadRequest, Unauthorized } from "../services/error.js";
import chalk from 'chalk';

async function updateBook(req, res){
    console.log(chalk.blackBright.bgGreen.bold('This is Update of Books'));
    try{
        const id = req.body.id;
        const title = req.body.title;
        const author = req.body.author;
        const publishedDate = req.body.publishedDate;
        const parsedDate = new Date(publishedDate);
   
        const formattedData = {
            title: title,
            author: author,
            published_date: parsedDate
        }
        const isUpdated = await updateBookbyId(id, formattedData)
        if(!isUpdated){
            throw new BadRequest('BOOK_UPDATE_FAILED')
        }
        
        const response = {
            httpCode: 200,
            httpMessage: 'Successfully updated new book!',
        };
        
        return res.status(200).json(response);
        

    }catch(error){
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

export default updateBook
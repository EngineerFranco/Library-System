import { AppError, BadGateway, BadRequest, Unauthorized } from "../services/error.js";
import { getAllBooks } from "../services/connection.js";
import chalk from 'chalk';

async function readBook(req, res){
    console.log(chalk.blackBright.bgGreen.bold('This is Read of All Books'));
    try{

        const data = await getAllBooks();
        if(!data || data === 0){
            throw new BadRequest('NO_BOOKS_AVAILABLE')
        }
        const response = {
            httpCode: 200,
            httpMessage: data,
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

export default readBook
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
        return res.render('readAllBook', {
            books: data
        });
        
    } 
    
    catch(error){

        console.error('Error encountered:', error); 

        if (error instanceof AppError) {
            return res.status(error.httpCode).render('error', {
                httpCode: error.httpCode,
                httpMessage: error.message,
                moreInformation: error.message
            });
        }
        return res.status(500).render('error', {
            httpCode: 500,
            httpMessage: error.message,
            moreInformation: error.message
        });
    }
}

export default readBook
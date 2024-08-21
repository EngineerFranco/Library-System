import { deleteBookById } from "../services/connection.js";
import { AppError, BadGateway, BadRequest, Unauthorized } from "../services/error.js";
import chalk from 'chalk';

async function deleteBook(req, res){
    console.log(chalk.blackBright.bgGreen.bold('This is Deletion of Books'));
    try{
        const id = req.params.id; 
        console.log(`REQ: ${id}`);
        const isDeleted = await deleteBookById(id);
        if(!isDeleted){
            throw new BadRequest("Book not found!")
        }

        const response = {
            httpCode: 200,
            httpMessage: `SUCCESSFULY_DELETED_BOOK`,
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

export default deleteBook
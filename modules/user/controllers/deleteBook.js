import { deleteBookById } from "../services/connection.js";
import { AppError, BadRequest } from "../services/error.js";
import chalk from 'chalk';

async function deleteBook(req, res){
    console.log(chalk.blackBright.bgGreen.bold('This is Deletion of Books'));
    try{
        const id = req.params.id.trim(); 
        console.log(`REQ: ${id}`);
        const isDeleted = await deleteBookById(id);
        if(!isDeleted){
            throw new BadRequest("Book not found!");
        }
        
        // Render the view with a success message
        return res.render('deleteBook', {
            success: true,
            message: 'Book successfully deleted!'
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

export default deleteBook;

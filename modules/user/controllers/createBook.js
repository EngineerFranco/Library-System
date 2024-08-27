import { AppError, BadRequest, Unauthorized } from "../services/error.js";
import { saveBook } from "../services/connection.js";
import chalk from 'chalk';
import { format } from 'date-fns';


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
        const data = await saveBook(reqData);
        if(!data){
            throw new BadRequest('BOOK_CREATED_FAILED')
        }

        // Format the date
        const formattedDate = format(new Date(data.published_date), 'MMMM dd, yyyy');

        const book = {
            id : data.id,
            title: data.title,
            author: data.author,
            date: formattedDate
        }
        
        return res.render('createStatus', {
            success: true,
            message: 'Book successfully created!',
            book: book
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

export default createBook;
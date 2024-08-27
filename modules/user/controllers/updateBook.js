import { updateBookbyId } from "../services/connection.js";
import { AppError, BadRequest, Unauthorized } from "../services/error.js";
import chalk from 'chalk';

async function updateBook(req, res){
    console.log(chalk.blackBright.bgGreen.bold('This is Update of Books'));
    try{
        const { id } = req.params; 
        const title = req.body.title;
        const author = req.body.author;
        const publishedDate = req.body.publishedDate;
        const parsedDate = new Date(publishedDate);
   
        const formattedData = {
            title: title,
            author: author,
            published_date: parsedDate
        }
        const data = await updateBookbyId(id, formattedData)
        console.log("data:", data)
        if(!data){
            throw new BadRequest('BOOK_UPDATE_FAILED')
        }
        console.log("Book: ", data);
        return res.render('updateStatus', {
            success: true,
            message: 'Book successfully updated!',
            book: data
        });
        

    }catch(error){
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

export default updateBook
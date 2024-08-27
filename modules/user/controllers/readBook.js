import { AppError, BadRequest } from "../services/error.js";
import { getBookById } from "../services/connection.js";
import chalk from 'chalk';
import { format } from 'date-fns';

async function readBook(req, res) {
    console.log(chalk.blackBright.bgGreen.bold('This is Read of Books'));
    try {
        const id = req.params.id;
        console.log(`REQ: ${id}`);
        const data = await getBookById(id);
        console.log("Data:", data);
        
        if (!data || data.length === 0) {
            throw new BadRequest(`BOOK_NOT_FOUND`);
        }
        
        // Format the date
        const formattedDate = format(new Date(data.published_date), 'MMMM dd, yyyy');
        console.log(formattedDate);
        
        // Render the view with a title and formatted date
        return res.render('readBook', {
            book: {
                id: data.id,
                title: data.title,
                author: data.author,
                formattedDate: formattedDate
            }
        });
    } catch (error) {
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

export default readBook;

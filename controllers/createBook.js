import { AppError, BadRequest, Unauthorized } from "../services/error.js";
import { saveBook } from "../services/connection.js";

async function createBook(req, res){
    console.log('This is Creation of Books')
    try{
        const title = req.body.title;
        if (!title){
            throw new BadRequest('Title field required!')
        }
        if (typeof title !== 'string') {
            throw new BadRequest('Invalid format of title!');
        }
        
        const author = req.body.author;
        if (!author){
            throw new BadRequest('Author field required!')
        }
        if (typeof author !== 'string' ) {
            throw new BadRequest('Invalid format of author!');
        }
      
        const publishedDate = req.body.publishedDate;
        if (!publishedDate){
            throw new BadRequest('PublishedDate field required!')
        }
        const parsedDate = new Date(publishedDate);
        if (isNaN(parsedDate.getTime())) {
            throw new BadRequest('Invalid format of publishedDate!');
        }
        console.log(`REQ: ${title}, ${author}, ${publishedDate}`);

        const reqData = {
            title: title,
            author: author,
            publishedDate: parsedDate
        }
        const isCreated = await saveBook(reqData);
        if(!isCreated){
            throw new BadRequest('Error in creating book!')
        }
        
        const response = {
            httpCode: 200,
            httpMessage: 'Successfully created new book!',
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
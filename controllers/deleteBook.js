import { deleteBookById } from "../services/connection.js";
import { AppError, BadGateway, BadRequest, Unauthorized } from "../services/error.js";

async function deleteBook(req, res){
    console.log('This is Deletion of Books')
    try{
        const id = req.params.id; 
        console.log(`REQ: ${id}`);
        const isDeleted = await deleteBookById(id);
        if(!isDeleted){
            throw new BadRequest("Book not found!")
        }

        const response = {
            httpCode: 200,
            httpMessage: `Successfuly deleted!`,
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
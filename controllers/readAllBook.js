import { AppError, BadGateway, BadRequest, Unauthorized } from "../services/error.js";
import { getAllBooks } from "../services/connection.js";
async function readBook(req, res){
    console.log('This is Read of Books')
    try{

        const data = await getAllBooks();
        if(!data || data === 0){
            throw new BadRequest('No books available!')
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
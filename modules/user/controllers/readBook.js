import { AppError, BadGateway, BadRequest, Unauthorized } from "../services/error.js";
import { getBookById } from "../services/connection.js";
async function readBook(req, res){
    console.log('This is Read of Books')
    try{
        const id = req.params.id
        console.log(`REQ: ${id}`);
        const data = await getBookById(id);
        console.log("Data:" , data)
        
        if(!data || data.length === 0){
            throw new BadRequest(`No books found for ${id}.`)
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
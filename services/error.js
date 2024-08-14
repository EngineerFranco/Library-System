
class AppError extends Error {
    constructor(httpCode, httpMessage){
        super(httpMessage);
        this.httpCode = httpCode; 
    }
}

class BadRequest extends AppError{
    constructor(httpMessage) {
        super(400, httpMessage)
    }
}

class Unauthorized extends AppError{
    constructor(httpMessage) {
        super(401, httpMessage)
    }
}

class BadGateway extends AppError{
    constructor(httpMessage){
        super(502, httpMessage)
    }
}

export { AppError, Unauthorized, BadRequest, BadGateway}
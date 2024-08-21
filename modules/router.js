import { Router } from 'express';

// Controllers
import createBook from './user/controllers/createBook.js';
import readBook from './user/controllers/readBook.js';
import updateBook from './user/controllers/updateBook.js';
import deleteBook from './user/controllers/deleteBook.js';
import readAllBook from './user/controllers/readAllBook.js'

// Validations
import { validateCreateBook} from './user/validations/createBookValidation.js';
import { validateUpdateBook} from './user/validations/updateBookValidation.js';
const router = Router()

router.post('/create-book', validateCreateBook, createBook);
router.get('/read-book', readAllBook);
router.get('/read-book/:id', readBook);
router.put('/update-book', validateUpdateBook, updateBook);
router.delete('/delete-book/:id', deleteBook); 

router.use((req, res) => {
    res.status(404).json({
        'httpCode' : '404',
        'httpMessage' : 'NOT_FOUND',
        'moreInformation' : 'NO_URL_FOUND'
    })
});

export default router;

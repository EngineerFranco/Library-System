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
import { validateReadBook } from './user/validations/readBookValidation.js';
import { validateDeleteBook } from './user/validations/deleteBookValidation.js';
const router = Router()

// Route to render the create book form
router.get('/create-book', (req, res) => {
    res.render('createBook'); 
});

router.get('/update-book/:id', (req, res) => {
    const id = req.params.id;
    res.render('updateBook', { id });
});
router.post('/create-book', validateCreateBook, createBook);
router.get('/read-book', readAllBook);
router.get('/read-book/:id', validateReadBook, readBook);
router.post('/update-book/:id', validateUpdateBook, updateBook);
router.post('/delete-book/:id', validateDeleteBook, deleteBook);

// Static Pages
router.get('/about', (req, res) => {
    res.render('about'); // Renders about.ejs
});

router.get('/contact', (req, res) => {
    res.render('contact'); // Renders contact.ejs
});


router.use((req, res) => {
    res.status(404).render('error', {
        httpCode: 404,
        httpMessage: 'NOT_FOUND',
        moreInformation: 'NO_URL_FOUND'
    });
});

export default router;

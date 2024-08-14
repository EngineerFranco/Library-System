import { Router } from 'express';

import createBook from './controllers/createBook.js';
import readBook from './controllers/readBook.js';
import updateBook from './controllers/updateBook.js';
import deleteBook from './controllers/deleteBook.js';
import readAllBook from './controllers/readAllBook.js'

const router = Router()

router.post('/create-book', createBook);
router.get('/read-book', readAllBook);
router.get('/read-book/:id', readBook);
router.put('/update-book', updateBook);
router.delete('/delete-book/:id', deleteBook); 

export default router;

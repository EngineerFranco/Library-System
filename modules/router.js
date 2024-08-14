import { Router } from 'express';

import createBook from './user/controllers/createBook.js';
import readBook from './user/controllers/readBook.js';
import updateBook from './user/controllers/updateBook.js';
import deleteBook from './user/controllers/deleteBook.js';
import readAllBook from './user/controllers/readAllBook.js'

const router = Router()

router.post('/create-book', createBook);
router.get('/read-book', readAllBook);
router.get('/read-book/:id', readBook);
router.put('/update-book', updateBook);
router.delete('/delete-book/:id', deleteBook); 

export default router;

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ejsLayouts from 'express-ejs-layouts';
import router from './modules/router.js';
import methodOverride from 'method-override';



dotenv.config();

const app = express();

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(ejsLayouts);
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout'); 

// Use your router
app.use('/library', router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

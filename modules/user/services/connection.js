import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
import { AppError, BadGateway, Unauthorized, BadRequest } from './error.js';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export default pool;

export async function getAllBooks() {
  let client;
  try {
    client = await pool.connect();
    const query = 'SELECT * FROM books';
    const result = await client.query(query);
    if (result.rowCount === 0) {
      throw new BadRequest('NO_BOOKS_FOUND');
    }
    return result.rows;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error instanceof BadRequest) {
      throw error;
    }
    throw new BadGateway('ERROR_FETCHING_BOOKS');
  } finally {
    if (client) client.release();
  }
}

export async function getBookById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await client.query(query, [id]);
    if (result.rowCount === 0) {
      throw new BadRequest('BOOK_NOT_FOUND');
    }
    return result.rows[0]; // Assuming you want a single book
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error instanceof BadRequest) {
      throw error;
    }
    throw new BadGateway('ERROR_FETCHING_BOOK');
  } finally {
    if (client) client.release();
  }
}

export async function saveBook(reqData) {
  let client;
  try {
    client = await pool.connect();
    const query = `
      INSERT INTO books (title, author, published_date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [
      reqData.title,
      reqData.author,
      reqData.publishedDate,
    ];
    const result = await client.query(query, values);
    if (result.rowCount === 0) {
      throw new BadRequest('NO_BOOK_CREATED');
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error instanceof BadRequest) {
      throw error;
    }
    throw new BadGateway('ERROR_CREATING_BOOK');
  } finally {
    if (client) client.release();
  }
}

export async function deleteBookById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = 'DELETE FROM books WHERE id = $1';
    const result = await client.query(query, [id]);
    if (result.rowCount === 0) {
      throw new BadRequest('BOOK_NOT_FOUND');
    }
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error instanceof BadRequest) {
      throw error;
    }
    throw new BadGateway('ERROR_DELETING_BOOK');
  } finally {
    if (client) client.release();
  }
}

export async function updateBookbyId(id, data) {
  let client;
  try {
    client = await pool.connect();

    // Check if the book exists through id
    const checkQuery = 'SELECT 1 FROM books WHERE id = $1';
    const checkResult = await client.query(checkQuery, [id]);
    if (checkResult.rowCount === 0) {
      throw new BadRequest('NO_BOOK_UPDATED');
    }

    // Prepare the update query
    const setClause = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(data)) {
      setClause.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    values.push(id);

    const query = `UPDATE books SET ${setClause.join(', ')} WHERE id = $${index}`;
    const result = await client.query(query, values);
    if (result.rowCount === 0) {
      throw new BadRequest('BOOK_NOT_UPDATED');
    }
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error instanceof BadRequest) {
      throw error;
    }
    throw new BadGateway('ERROR_UPDATING_BOOK:');
  } finally {
    if (client) client.release();
  }
}

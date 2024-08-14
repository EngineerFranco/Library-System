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
    const data = result.rows;
    return data; 
  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw new BadGateway('Error getting books!');
  } finally {
    if (client) {
      client.release();
    }
  } 
}

export async function getBookById(id) {
  let client;
  try {
    client = await pool.connect();

    const query = `SELECT * FROM books WHERE id = $1`;
    const result = await client.query(query, [id]);
    const data = result.rows;
    return data;

  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw new BadGateway('Error getting book!');
  } finally {
    if (client) {
      client.release();
    }
  } 
}

export async function saveBook(reqData){
  let client;
  console.log("Req Data", reqData)
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
      reqData.publishedDate
    ];
    console.log("Query Values:", values);
    const result = await client.query(query, values);
    if(result.rows[0].length === 0){
      return false;
    }else{
      return true;
    }

  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw new BadGateway('Error saving book!');
  } finally {
    if (client) {
      client.release();
    }
  } 
}

export async function deleteBookById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = 'DELETE FROM books WHERE id = $1';
    const result = await client.query(query, [id]);
    if (result.rowCount === 0) {
      return false;
    } else{
    return true}

  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw new BadGateway('Error deleting book!');
  } finally {
    if (client) {
      client.release();
    }
  } 
}

export async function updateBookbyId(id, data){
  let client;
  try {
     client = await pool.connect();
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
         return false; 
     }

     return true;

  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw new BadGateway('Error updating book!');
  } finally {
    if (client) {
      client.release();
    }
  } 
}
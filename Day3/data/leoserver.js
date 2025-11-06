import http from 'http';
import url from 'url';
import path from 'path';
import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';

const file = fileURLToPath(import.meta.url);
const dir = path.dirname(file);
const movie = path.join(dir,  'movies.txt');

const server = http.createServer(async (req, res) => {
  const one = url.parse(req.url, true);
  const pathname = one.pathname;

  if (pathname === '/' || pathname === '/home') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`
      <h1>Welcome to Sachin Movie Booking System</h1> 
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/movies">Movies</a></li>
        <li><a href="/booking?movie=sachin">Book Ticket</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    `);
  } 
  
  else if (pathname === '/movies') {
    try {
      const list = await fs.readFile(movie, 'utf-8');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write('<h1>Available Movies</h1>');
      res.write(`<ul>${list}</ul>`);
      res.end(`<a href="/home">Back to Home</a>`);
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/html' });
      res.end(`<h1>Error reading movie list</h1><p>${err.message}</p>`);
    }
  } 
  
  else if (pathname === '/booking') {
    try {
      const moviename = one.query.movie || 'unknown';
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write('<h1>Thank you for booking with Sachin Movie Booking System</h1>');
      res.write(`<h2>Enjoy ${moviename} movie!</h2>`);
      res.end(`<a href="/home">Back to Home</a>`);
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/html' });
      res.end(`<h1>Failed to book tickets</h1><p>${err.message}</p>`);
    }
  } 
  
  else if (pathname === '/contact') {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Contact Us</h1>
        <p>Email: agri@leobooking.com</p>
        <p>Phone: +91 000 000 0000</p>
        <a href="/home">Back to Home</a>
      `);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Error loading contact page</h1>');
    }
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page Not Found</h1>');
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/home`);
});

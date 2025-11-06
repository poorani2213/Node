import http from 'http'
import url from 'url'
import path from 'path'
import * as fs from 'fs/promises'
import { fileURLToPath } from 'url'


const file = fileURLToPath(import.meta.url)
const dir = path.dirname(file)

const movie = path.join(dir, 'data', 'movies.txt')

const server = http.createServer(async (req, res) => {
  const one = url.parse(req.url, true)
  const pathname = one.pathname

  try {
    if (pathname === '/' || pathname === '/home') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`
        <h1>Welcome to Leo Movie Booking System 🎬</h1> 
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="/booking?movie= GILLI">Book Ticket</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      `)
    }

    else if (pathname === '/movies') {
      try {
        const list = await fs.readFile(movie, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>Available Movies</h1>')
        res.write(`<ul>${list.split('\n').map(m => `<li>${m}</li>`).join('')}</ul>`)
        res.end('<a href="/home">Back to Home</a>')
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' })
        res.end(`<h1>Error reading movie list</h1><p>${err.message}</p>`)
      }
    }

    else if (pathname === '/booking') {
      try {
        const moviename = one.query.movie || 'Unknown'
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>Thank you for booking with gilli Movie Booking System</h1>')
        res.write(`<h2>Enjoy watching ${moviename} </h2>`)
        res.end('<a href="/home">Back to Home</a>')
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' })
        res.end(`<h1>Failed to book tickets</h1><p>${err.message}</p>`)
      }
    }

    else if (pathname === '/contact') {
      try {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`
          <h1>Contact Us</h1>
          <p>Email: GOOAT@leobooking.com</p>
          <p>Phone: +00 0000 0000</p>
          <a href="/home">Back to Home</a>
        `)
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' })
        res.end(`<h1>Error loading contact page</h1><p>${err.message}</p>`)
      }
    }

    else {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Page Not Found </h1>')
    }

  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end(`<h1>Server Error</h1><p>${error.message}</p>`)
  }
})

const port = 3000
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/home`)
})


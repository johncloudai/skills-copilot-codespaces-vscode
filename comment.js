// Create web server
// Create a web server that listens on port 3000 and serves the following responses:
// GET /comments - returns a list of comments
// POST /comments - creates a new comment
// GET /comments/:id - returns a single comment with the id :id
// PUT /comments/:id - updates a single comment with the id :id
// DELETE /comments/:id - deletes a single comment with the id :id
// The list of comments is stored in a file comments.json
// The comments should have the following structure:
// {    "id": 1,     "author": "John",     "text": "Saying something" }         


const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();      // Create an instance of express            
const port = 3000;           // Set the port to 3000
const comments = require('./comments.json'); // Load the comments from the JSON file

app.use(bodyParser.json());  // Use the body-parser middleware to parse JSON requests   


// GET /comments - returns a list of comments
app.get('/comments', (req, res) => {
    res.json(comments);
});     


// POST /comments - creates a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;   // Get the comment from the request body
    comment.id = comments.length + 1;  // Set the id of the new comment
    comments.push(comment);     // Add the new comment to the list of comments
    fs.writeFileSync('./comments.json', JSON.stringify(comments));  // Save the comments to the JSON file
    res.json(comment);  // Return the new comment
});


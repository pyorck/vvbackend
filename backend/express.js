const express = require('express');
const app = express();

app.get('/result', (req, res) => {
    const userCategory = req.query.category;
    // Based on the userCategory, you can generate content or fetch data from a database
    let pageContent = "";

    if (userCategory === 'tech') {
        pageContent = "<h1>Latest Tech News</h1>";
    } else if (userCategory === 'health') {
        pageContent = "<h1>Health Tips</h1>";
    } else if (userCategory === 'finance') {
        pageContent = "<h1>Finance Updates</h1>";
    } else {
        pageContent = "<h1>Invalid Category</h1>";
    }

    // Send the generated HTML response
    res.send(`
        <html>
            <head><title>Dynamic Page</title></head>
            <body>${pageContent}</body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

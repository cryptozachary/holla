const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080
const filepath = path.join(__dirname, '../build')

// Serve the static files from the React app
app.use(express.static(filepath))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/token', (req, res, next) => {
    res.send({
        token: 'test123'
    });

    next()
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: filepath })
})

app.listen(port, () => console.log('API is running on http://localhost:8080'));

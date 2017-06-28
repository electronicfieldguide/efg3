const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Welcome to EFG3!')
})

app.listen(3000, function () {
    console.log('Server listening on port 3000.')
})
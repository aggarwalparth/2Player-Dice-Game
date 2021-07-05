const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../Public')

app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.sendFile('index.html')
})

app.listen(port,()=>{
   console.log(" Dice Game is listening on "+port)
})
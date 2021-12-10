const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/test', (req, res) => {
    
    fs.readFile('test.txt', 'utf-8', function(err, data) {
        res.json(data);
    })
    
})


app.post('/test', (req, res) => {
    var user = { username: req.body.username, password: req.body.password};
    var text = JSON.stringify(user);
    fs.appendFile("test.txt", text, (err) => {
        if(err) throw err;
    })
    res.redirect('/');
    //res.send("hello");


})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started  at localhost:${PORT}`));
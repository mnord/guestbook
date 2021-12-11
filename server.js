const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

let userInput = new Array;


app.post('/', (req, res) => {
    
    const timestamp = Date.now();
    const nyinput = {
        timestamp: timestamp,
        namn: req.body.username,
        email: req.body.email,
        message: req.body.message
    };
   
    const savedData = fs.readFileSync("test.txt");

    
    userInput.push(nyinput);

    fs.writeFile("test.txt", JSON.stringify(userInput, null, 2), (err) => {
        if(err) throw err;
    });
    userInput = JSON.parse(savedData);
    
    console.log(fs.readFileSync("test.txt", "utf8"));
    
    

    fs.readFile("./public/index.html", (err, data) => {
        let nyHTML = data.toString().replace("test", "hejsan");

        res.send(nyHTML);
        
    });
    //res.json(userinput);
    //res.redirect('/');
    //res.send("hello");


});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started  at localhost:${PORT}`));
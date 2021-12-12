const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


app.post('/', (req, res) => {
    //Tid när inlägg tas emot
    const timestamp = Date.now();
//Läser in fil-innehåll till en variabel
    const testar = fs.readFileSync('test.txt');
//Lägger till en array med alla inputs
    let userInput = JSON.parse(testar);

    //Kollar skadlig input
    function escapeHtml(unsafe)
    {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
    }
//Formaterar input från formulär
    const nyinput = {
        timestamp: timestamp,
        namn: escapeHtml(req.body.username),
        email: escapeHtml(req.body.email),
        message: escapeHtml(req.body.message)
    };
  //Lägger till ny input till array
    userInput.push(nyinput);

//Skriver inputs till filen test.txt i JSON format
    fs.writeFile("test.txt", JSON.stringify(userInput, null, 2), (err) => {
        if(err) throw err;
//Läser från filen med sparade inlägg och formaterar
    const userPosts = JSON.parse(fs.readFileSync("test.txt", "utf-8"));
    let displayPosts = "";
    //console.log(userPosts);
    for (let i = 0; i < userPosts.length; i++) {
        displayPosts += `<div><h3>${new Date(userPosts[i].timestamp).toLocaleDateString()} ${new Date(userPosts[i].timestamp).toLocaleTimeString()}</h3><h4>FROM: ${userPosts[i].namn} EMAIL: ${userPosts[i].email}</h4><p>${userPosts[i].message}</p></div>`;
        
    }
//Ersätter data i html filen med inlägg som sparats i test.txt och skickar
//den nya ändrade html file.
    fs.readFile("./public/index.html", (err, data) => {
        let nyHTML = data.toString().replace("test", displayPosts);

        res.send(nyHTML);
        
    });

    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started  at localhost:${PORT}`));
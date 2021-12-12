document.getElementById("forum-form").addEventListener("submit", submitForm);
//Eventuell felhantering om jag hinner

//Kollar att input inte är tomt
const isRequired = value => value === '' ? false : true;

//Kollar format på email
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Felmeddelande
function errorMessage (msg) {
    const displayError = document.getElementById("errormsg");
    displayError.innerHTML = msg;
}


//Kollar så att namn är skrivet, skickar felmeddelande om tomt
const checkName = () => {
    const username = document.getElementById("username").value;
    if (!isRequired(username)) {
        errorMessage("Namn får inte vara tomt.");
        return false
    } else {
        return true
    }
    
}
//Kollar email format och skickar felmeddelande
const checkEmail = () => {
    const email = document.getElementById("email").value;
    if (!isEmailValid(email)) {
        errorMessage("Fel format på email.");
        return false
    } else {
        return true
    }
}
//Kollar att det finns något meddelande skrivet, felmeddelande
const checkMsg = () => {
    const msg = document.getElementById("message").value;
    if (!isRequired(msg)) {
        errorMessage("Skriv ett meddelande.");
        return false
    } else {
        return true
    }
}

//Skickar inte in om någon av check-functionerna ger false
 function submitForm(e) {
    if (!checkName() || !checkEmail() || !checkMsg()) {
        e.preventDefault();
    }
 }
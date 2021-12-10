//const form = document.getElementById("reg-form");
const messages = document.getElementById("msg");

getData();

async function getData() {
   
    const response = await fetch('/test');
    const data = await response.json();

    console.log(data);

}

//form.addEventListener('submit', registerUser);

/*
function registerUser(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

}
*/
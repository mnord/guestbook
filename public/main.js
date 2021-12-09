const form = document.getElementById("reg-form");
form.addEventListener('submit', registerUser);

function registerUser(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

}
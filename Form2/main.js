let getElement = elem => document.querySelector(elem);
let userData = document.forms.userData;
let usersDatabase = [];
let loginRegExp = /^[a-zA-Z]{4,16}$/;
let passRegExp = /^[\w-_\.]{4,16}$/;
let emailRegExp = /^[\w-\.]+@[a-z\.]+$/;

function addUser() {
    if(userData.userLogin.value != '' && userData.userPass.value != '' && userData.userEmail.value != '' && loginRegExp.test(userData.userLogin.value) && passRegExp.test(userData.userPass.value) && emailRegExp.test(userData.userEmail.value)) {
    let userLogin = userData.userLogin.value;
    let userPass = userData.userPass.value;
    let userEmail = userData.userEmail.value;
    let newUser = {
        login: userLogin,
        password: userPass,
        email: userEmail
    }
    usersDatabase.push(newUser);
    userData.userLogin.value = '';
    userData.userPass.value = '';
    userData.userEmail.value = '';
    render();
    }
}

function render() {
    getElement('tbody').innerHTML = '';
    for (i = 0; i < usersDatabase.length; i++) {
            getElement('tbody').insertAdjacentHTML('beforeend', `<tr><td>${i+1}</td><td>${usersDatabase[i].login}</td><td>${usersDatabase[i].password}</td><td>${usersDatabase[i].email}</td><td><input type="button" value="Edit" onclick="editUser()" id="editUser"></td><td><input type="button" value="Delete" onclick="deleteUser()" id="deleteUser"></td></tr>`);
    }
}

getElement('#addUser').addEventListener('click', addUser);

function deleteUser() {
    usersDatabase.splice(event.target.parentElement.parentElement.rowIndex-1, 1);
    render();
}
let userIndex;
function editUser() {
    userIndex = event.target.parentElement.parentElement.rowIndex-1;
    let userEdit = usersDatabase[userIndex];
    userData.userLogin.value = userEdit.login;
    userData.userPass.value = userEdit.password;
    userData.userEmail.value = userEdit.email;
    getElement('#addUser').classList.add('hide');
    getElement('#edit').classList.remove('hide');
}

function saveEditUser() {
    if(userData.userLogin.value != '' && userData.userPass.value != '' && userData.userEmail.value != '' && loginRegExp.test(userData.userLogin.value) && passRegExp.test(userData.userPass.value) && emailRegExp.test(userData.userEmail.value)) {
    let userLogin = userData.userLogin.value;
    let userPass = userData.userPass.value;
    let userEmail = userData.userEmail.value;
    let newUser = new EditUser(userLogin, userPass, userEmail);
    usersDatabase[userIndex] = newUser;
    userData.userLogin.value = '';
    userData.userPass.value = '';
    userData.userEmail.value = '';
    render();
    getElement('#addUser').classList.remove('hide');
    getElement('#edit').classList.add('hide');
    }
}

function EditUser(userLogin, userPass, userEmail) {
    this.login = userLogin,
    this.password = userPass,
    this.email = userEmail
}
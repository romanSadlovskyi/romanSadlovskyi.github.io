

let closeMenu =  document.getElementsByClassName('closeMenu')[0];

closeMenu.addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementsByTagName('ul')[0].style.display = 'none';
    document.getElementsByClassName('burger-icon')[0].style.display = 'block';
})


let burger = document.getElementsByClassName('burger-icon')[0];

burger.addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementsByTagName('ul')[0].style.display = 'block';
    closeMenu.style.display = 'block';
})

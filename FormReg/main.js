let getElement = elem => document.querySelector(elem);
let nameExp = /^[a-zA-Z]{2,20}$/;
let emailExp = /^[\w\.-]+@[a-z\.]+$/;
let passExp = /^\w{8,15}$/;

let regExp = [nameExp, nameExp, emailExp, passExp];
let fields = document.getElementsByClassName('field');
let wrongData = ['.wrFirst', '.wrLast', '.wrEmail', '.wrPassword'];
let before = ['fwFirst', 'fwLast', 'fwEmail', 'fwPassword'];

for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('input', () => {
        let fieldValue = event.target.value;
        event.target.style.paddingTop = '12px';
        event.target.parentElement.classList.add(before[i]);
        if (regExp[i].test(fieldValue)) {
            getElement(wrongData[i]).style.opacity = 0;
            event.target.classList.add('bgCheck');
            event.target.classList.remove('bgClose');
        } else {
            getElement(wrongData[i]).style.opacity = 1;
            event.target.classList.add('bgClose');
            event.target.classList.remove('bgCheck');
        }
        if (fieldValue == '') {
            event.target.parentElement.classList.remove(before[i]);
            event.target.style.paddingTop = 0;
        }
        if (getElement('#checkbox').checked && regExp[0].test(fields[0].value) && regExp[1].test(fields[1].value) && regExp[2].test(fields[2].value) && regExp[3].test(fields[3].value)) {
            getElement('[type="button"]').disabled = false;
            getElement('[type="button"]').classList.add('btn-active');
            getElement('[type="button"]').style.cursor = 'pointer';
        } else {
            getElement('[type="button"]').disabled = true;
            getElement('[type="button"]').classList.remove('btn-active');
            getElement('[type="button"]').style.cursor = 'default';
        }
    })
    fields[i].addEventListener('blur', () => {
        let fieldValue = event.target.value;
        if (regExp[i].test(fieldValue)) {
            getElement(wrongData[i]).style.opacity = 0;
            event.target.classList.add('bdColor');
        } else if (fieldValue == '') {
            getElement(wrongData[i]).style.opacity = 0;
            event.target.classList.remove('bdColor');
            event.target.classList.remove('bgClose');
        } else {
            getElement(wrongData[i]).style.opacity = 1;
            event.target.classList.remove('bdColor');
        }
    })
}

getElement('#checkbox').addEventListener('click', () => {
    if (event.target.checked && regExp[0].test(fields[0].value) && regExp[1].test(fields[1].value) && regExp[2].test(fields[2].value) && regExp[3].test(fields[3].value)) {
        getElement('[type="button"]').disabled = false;
        getElement('[type="button"]').classList.add('btn-active');
        getElement('[type="button"]').style.cursor = 'pointer';
    } else {
        getElement('[type="button"]').disabled = true;
        getElement('[type="button"]').classList.remove('btn-active');
        getElement('[type="button"]').style.cursor = 'default';
    }
})

getElement('[type="button"]').addEventListener('click', () => {
    getElement('.popWrapper').classList.remove('hide');   
})

getElement('.start').addEventListener('click', () => {
    for (let i=0; i<fields.length; i++) {
        fields[i].value = '';
        fields[i].style.paddingTop = 0;
        fields[i].parentElement.classList.remove(before[i]);
        fields[i].classList.remove('bgCheck');
        fields[i].classList.remove('bdColor');
    }
    getElement('#checkbox').checked = false;
    getElement('[type="button"]').disabled = true;
    getElement('[type="button"]').classList.remove('btn-active');
    getElement('[type="button"]').style.cursor = 'default';
    getElement('.popWrapper').classList.add('hide');
})





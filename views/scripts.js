


const addBtn = document.querySelector('#addBtn')
if (addBtn) {
    addBtn.addEventListener('click', hideAddcard);
    function hideAddcard() {
        document.getElementById('addCard').style.display = 'inline';
    }
}
const valueIncard = document.querySelector('.valueIncard');
const editformCancelBtn = document.querySelector('.cancelBtn')

// get a new array of object with a valueIncard class
const allElements = document.querySelectorAll('*');
const idArr = [];
for (let i = 0; i < allElements.length; ++i) {
    let el = allElements[i];
    if (el.className == 'valueIncard') {
        idArr.push(allElements[i]);
    }
}

// get a new array of object with an idEditform class
const idEditform = [];
for (let i = 0; i < allElements.length; ++i) {
    let el = allElements[i];
    if (el.className == 'editForm') {
        idEditform.push(allElements[i]);
    }
}

// get a new array of object with an idEditform class
const mngBtn = [];
for (let i = 0; i < allElements.length; ++i) {
    let el = allElements[i];
    if (el.className == 'mngBtn') {
        mngBtn.push(allElements[i]);
    }
}

// compare id of elements and link it
function reply_click(buttonId) {
    for (let i = 0; i < idArr.length; ++i) {
        let el = idArr[i];
        let idEdform = idEditform[i];
        let idmngBtn = mngBtn[i];
        if (el.id == buttonId) {
            if (idEdform.id == buttonId) {
                if (idmngBtn.id == buttonId) {
                    idmngBtn.style.display = 'none';
                    el.style.display = 'none';
                    idEdform.style.display = 'inline';
                }
            }
        }
    }
}

function refreshPage() {
    window.location.reload();
}

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.editForm, .validAddForm, .validated-form')
    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

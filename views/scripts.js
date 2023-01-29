const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', hideAddcard);
function hideAddcard() {
    document.getElementById('addCard').style.display = 'inline';
}


const valueIncard = document.querySelector('.valueIncard');
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





// let x = 0;
// for (let i = 0; i < allElements.length; ++i) {
//     let el = allElements[i];
//     if (el.id == 'valueIncard') {
//         idArr.push(x);
//         document.getElementById("valueIncard").id = x;
//         document.getElementById("editBtn").id = x;
//         x++;
//     }
// }

// const allBtn = document.querySelectorAll('button');
// const idBtn = [];
// for (let i = 0; i < allBtn.length; ++i) {
//     let la = allBtn[i];
//     if (la.id == i) {
//         idBtn.push(i);
//     }
// }
// console.log(allBtn)
// console.log(idBtn)



// editBtn.addEventListener('click', function () {
//     if (idArr.id == idBtn.id) {
//         console.log('hello matafaka')
//     }
// })




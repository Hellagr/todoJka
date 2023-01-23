const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', hideAddcard);
function hideAddcard() {
    document.getElementById('addCard').style.display = 'inline';
}

var editBtn = document.querySelector('#editBtn');
const cardValue = document.querySelector('#valueIncard');

// Gave a dynamic id to card id
const allElements = document.querySelectorAll('*');
const idArr = [];

let x = 0;
for (let i = 0; i < allElements.length; ++i) {
    let el = allElements[i];
    if (el.id == 'valueIncard') {
        idArr.push(x);
        document.getElementById("valueIncard").id = x;
        document.getElementById("editBtn").id = x;
        x++;
    }
}

const allBtn = document.querySelectorAll('button');
const idBtn = [];
for (let i = 0; i < allBtn.length; ++i) {
    let la = allBtn[i];
    if (la.id == i) {
        idBtn.push(i);
    }
}
console.log(allBtn)
console.log(idBtn)



editBtn.addEventListener('click', function () {
    if (idArr.id == idBtn.id) {
        console.log('hello matafaka')
    }
})




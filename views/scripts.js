const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', hideAddcard);
function hideAddcard() {
    document.getElementById('addCard').style.display = 'inline';
}

const editBtn = document.querySelector('#editBtn');
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






editBtn.addEventListener('click', function () {
    document.getElementById().style.display = "none";
})



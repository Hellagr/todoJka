const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', hideAddcard);
function hideAddcard() {
    document.getElementById('addCard').style.display = 'inline';
}



const editBtn = document.querySelector('#editBtn');
editBtn.addEventListener('click', function () {

    var card = document.getElementById('card'),
        childDiv = card.getElementsByTagName('div')[0].style.display = "none";
    // document.getElementsByTagName(childDiv).style.display = "none";
    document.getElementById('editForm').style.display = "inline";

});
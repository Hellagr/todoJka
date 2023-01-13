const addBtn = document.querySelector('#addBtn')
const editBtn = document.querySelector('#editBtn')


addBtn.addEventListener('click', hideAddcard);
function hideAddcard() {
    document.getElementById('addCard').style.display = 'inline';
}

editBtn.addEventListener('click', hideEditcard);
function hideEditcard() {
    console.log('work')
    document.getElementById('valueTitleTask').style.display = 'none';
    document.getElementById('editForm').style.display = 'inline';
}
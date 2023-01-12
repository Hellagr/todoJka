const btn = document.querySelector('#addBtn')
const card = document.querySelector('#card')

btn.addEventListener('click', hideAddcard);
function hideAddcard() {
    document.getElementById('card').style.display = 'inline';
}
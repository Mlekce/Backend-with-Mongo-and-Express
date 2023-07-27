const addUser = document.getElementById("add-btn")
const addUserDrawer = document.querySelector('.add-user-drawer')

addUser.addEventListener('click', function(){
    addUserDrawer.classList.toggle('open')
})
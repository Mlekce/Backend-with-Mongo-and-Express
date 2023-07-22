const drwButton = document.getElementById('drawer-btn')
const mobileDrawer = document.getElementById('mobile-drawer')

drwButton.addEventListener('click', function(){
    mobileDrawer.classList.toggle('open')
})

const addUser = document.getElementById("add-btn")
const addUserDrawer = document.querySelector('.add-user-drawer')

addUser.addEventListener('click', function(){
    addUserDrawer.classList.toggle('open')
})
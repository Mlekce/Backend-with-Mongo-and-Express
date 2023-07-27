const drwButton = document.getElementById('drawer-btn')
const mobileDrawer = document.getElementById('mobile-drawer')

drwButton.addEventListener('click', function(){
    mobileDrawer.classList.toggle('open')
})


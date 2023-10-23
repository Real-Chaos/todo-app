// ------------------------------- THEME TOGGLER -------------------------------- //

const toggleTheme = (function () {
  const checkboxToggler = document.querySelector('.checkbox-toggle')
  const root = document.documentElement
  root.className = 'light'
  checkboxToggler.addEventListener('change', () => {
    checkboxToggler.checked
      ? (root.className = 'dark')
      : (root.className = 'light')
  })
})()

// ------------------------------- NAV TOGGLER -------------------------------- //

const toggleNav = (function () {
  const navToggler = document.querySelector('.nav-toggler')
  const sideNav = document.querySelector('.side-nav')
  navToggler.addEventListener('click', () => {
    if (sideNav.style.transform == 'translateX(-20vw)') {
      sideNav.style.transform = 'translateX(0vw)'
      sideNav.style.width = '20vw'
    } else {
      sideNav.style.transform = 'translateX(-20vw)'
      sideNav.style.width = '0vw'
    }
  })
})()

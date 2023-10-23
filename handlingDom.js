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

// ----------------------------- TOGGLE PROJECT FORM ------------------------------ //

const toggleProjectForm = (function () {
  const addProjectText = document.querySelector('.add-project-text')
  const addProjectForm = document.querySelector('.add-project-form')
  const hideProjectForm = document.querySelector('.cancel')
  addProjectText.addEventListener('click', () => {
    addProjectForm.style.display = 'block'
  })

  hideProjectForm.addEventListener('click', () => {
    addProjectForm.style.display = 'none'
  })
})()

// ----------------------------- TOGGLE TASK FORM ------------------------------ //

const toggleTasksForm = (function () {
  const toggler = document.querySelector('.add-tasks h4')
  const div = document.querySelector('.add-task-form-div')
  const cancelTask = document.querySelector('.cancel-task')

  toggler.addEventListener('click', () => {
    div.style.display = 'block'
    addTask()
  })

  cancelTask.addEventListener('click', () => {
    div.style.display = 'none'
  })
})()

// ----------------------------- DISPLAY TASKS DOM ------------------------------ //

const displayTasks = (tasks) => {
  // const tasks = taskCollection.tasks
  const tasksDiv = document.querySelector('.task-div')
  tasksDiv.innerHTML = ''
  tasks.forEach((task) => {
    const html = `
    <div class="task" data-index="${task.index}">
    <div class="name">
      <div class="task-completion completed"></div>
      <h3>${task.name}</h3>
    </div>
    <div class="extra-options">
      <button class="details-btn">Details</button>
      <h5>${task.date}</h5>
      <i class="fa-solid fa-user-pen edit-task-btn"></i>
      <i class="fa-solid fa-trash-can delete-task-btn"></i>
    </div>
    <dialog>
      <div>
        <h3>${task.name}</h3>
        <i class="fa-regular fa-circle-xmark close-dialog"></i>
      </div>
      <div class="real-details">
        <div>
          <h4>Project:</h4>
          <p>Home</p>
        </div>
        <div>
          <h4>Priority:</h4>
          <p>${task.priority}</p>
        </div>
        <div>
          <h4>Due Date:</h4>
          <p>${task.date}</p>
        </div>
        <div>
          <h4>Description: </h4>
          <p>
            ${task.description}
          </p>
        </div>
      </div>
    </dialog>
  </div>
    `
    tasksDiv.innerHTML += html
  })
}

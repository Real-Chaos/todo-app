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
      <button class="details-btn" onclick="openModal(this)">Details</button>
      <h5>${task.date}</h5>
      <i class="fa-solid fa-user-pen edit-task-btn" onclick="editTask(this)"></i>
      <i class="fa-solid fa-trash-can delete-task-btn" onclick="deleteTask(this)"></i>
    </div>
    <dialog>
      <div>
        <h3>${task.name}</h3>
        <i class="fa-regular fa-circle-xmark close-dialog" onclick="closeModal(this)"></i>
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

// ----------------------------- DISPLAY TASKS DETAILS ------------------------------ //

const openModal = function (e) {
  console.log(e.parentElement.parentElement.getElementsByTagName('dialog')[0])
  const dialog = e.parentElement.parentElement.getElementsByTagName('dialog')[0]
  const closeButtons = document.querySelectorAll('.close-dialog')

  // "Show the dialog" button opens the dialog modally

  dialog.showModal()

  // closeButtons.forEach((closeButton, index) => {
  //   closeButton.addEventListener('click', () => {
  //     dialogs[index].close()
  //   })
  // })
}

const closeModal = function (e) {
  console.log(e.parentElement.parentElement.getElementsByTagName('dialog')[0])
  const dialog = e.parentElement.parentElement
  const closeButtons = document.querySelectorAll('.close-dialog')

  // "Show the dialog" button opens the dialog modally

  dialog.close()

  // closeButtons.forEach((closeButton, index) => {
  //   closeButton.addEventListener('click', () => {
  //     dialogs[index].close()
  //   })
  // })
}

// ----------------------------- EDIT TASK FROM DIV------------------------------ //

const editTaskFormDOM = (task) => {
  const formDiv = document.querySelector('.edit-tasks-form-div')
  const form = document.querySelector('.edit-task-form')

  formDiv.style.display = 'block'
  form.elements.taskName.value = task.name
  form.elements.description.value = task.description
  form.elements.date.value = task.date
  form.elements.priority.value = task.priority
}

// ----------------------------- ADD PROJECT TO NAV ------------------------------ //
const addProjectToSidenavDOM = (projects) => {
  const projectSidebar = document.querySelector('.project-sidebar')
  projectSidebar.innerHTML = ''
  projects.forEach((project) => {
    const html = `<div class="project-card project-name-div" data-index="${project.index}">
    <div class="text">
      <i class="fa-solid fa-list-check"></i>
      <h4>${project.name}</h4>
    </div>
    <div class="options">
      <i class="fa-solid fa-ellipsis-vertical options-toggler" onclick="toggleProjectOptions(this)"></i>

      <div class="options-text">
        <h5 onclick="renameProject(this)">Rename</h5>
        <h5 onclick="deleteProject(this)">Delete</h5>
      </div>
    </div>
  </div>`
    projectSidebar.innerHTML += html
  })
}


'use strict'

function onInit() {
    console.log('Document is ready')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()

    if (todos.length) {
        const strHTMLs = todos.map(todo =>
            `<li onclick="onToggleTodo('${todo.id}')" class="${(todo.isDone) ? 'done' : ''}">
            <span>${todo.txt}</span>
            <span class="importance">${todo.importance}</span>
            <span class="created-date">${todo.createdAt}</span>
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
            </li>`
        )
        document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    } else document.querySelector('.todo-list').innerHTML =
        (gFilterBy === 'DONE') ? `<span>No Done Todos</span>`
            : (gFilterBy === 'ACTIVE') ? `<span>No Active Todos</span>`
                : `<span>No Todos</span>`

    document.querySelector('.todo-total-count').innerText = getTotalCount()
    document.querySelector('.todo-active-count').innerText = getActiveCount()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)

    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=todo-txt]')
    const elImportanceTxt = document.querySelector('[name=todo-importance-txt]')

    if (!elTxt.value) return alert(`You can't add an empty task`)
    elImportanceTxt.value = (elImportanceTxt.value <= 3 && elImportanceTxt.value >= 1) ?
        elImportanceTxt.value : 1

    addTodo(elTxt.value, elImportanceTxt.value)
    renderTodos()

    elTxt.value = ''
    elImportanceTxt.value = ''
}

function onSetFilter(filterBy) {
    // console.log('Setting filter', filterBy)
    setFilter(filterBy)

    renderTodos()
}

function onSetSort(sortBy) {
    // console.log('Setting filter', filterBy)
    setSort(sortBy)

    renderTodos()
}
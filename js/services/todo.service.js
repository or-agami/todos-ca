'use strict'

var gTodos
var gFilterBy = 'ALL'
var gSortBy = 'DATE'
_createTodos()

function getTodosForDisplay() {
    getSortedTodosForDisplay()
    if (gFilterBy === 'ALL') return gTodos
    const todos = gTodos.filter(todo =>
        (gFilterBy === 'DONE' && todo.isDone) ||
        (gFilterBy === 'ACTIVE' && !todo.isDone))

    // if (todos.length === 0 && gFilterBy === 'DONE') return 'No Done'
    // if (todos.length === 0 && gFilterBy === 'ACTIVE') return 'No Active'

    return todos
}

function getSortedTodosForDisplay() {
    if (gSortBy === 'DATE') {
        // gTodos.sort((todoA, todoB) => Date.parse(todoA.createdAt) - Date.parse(todoB.createdAt)).reverse()
        gTodos.sort((todoA, todoB) => Date.parse(todoB.createdAt) - Date.parse(todoA.createdAt))
    }

    if (gSortBy === 'ALPHABETICAL') {
        gTodos.sort((todoA, todoB) => {
            const todoTxtA = todoA.txt.toUpperCase()
            const todoTxtB = todoB.txt.toUpperCase()

            return (todoTxtA < todoTxtB) ? -1
                : (todoTxtA > todoTxtB) ? 1
                    : 0
        })
    }

    if (gSortBy === 'IMPORTANCE') {
        gTodos.sort((todoA, todoB) => +todoB.importance - +todoA.importance)
    }

    return gTodos
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    _saveTodosToStorage()

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

// Private functions - used only by the service itself
function _createTodos() {

    var todos = loadFromStorage('todoDB')
    if (!todos || !todos.length) {
        todos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS')
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}

function _createTodo(txt, importance = '1') {
    const todo = {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date().toLocaleString(),
        importance
    }
    return todo
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

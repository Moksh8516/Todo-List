import { useState, useEffect } from "react"
import { TodoProvider } from "./Context/Todo";
import TodoItem from "./Components/TodoList";
import TodoForm from "./Components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: Date.now(), ...todo }, ...prev
    ])
  }

  const updateTodo = (todo, id) => {
    setTodos((prev) => {
      return prev.map((prevTodoElements) => {
        if (prevTodoElements.id === id) {
          return todo;
        } else {
          return prevTodoElements;
        }
      });
    });
  }


  const removeTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((removeTodoitem) => {
        return removeTodoitem.id !== id;
      });
    });
  }

  const toggleBtn = (id) => {
    setTodos((prev) =>
      prev.map((prevItems) =>
        prevItems.id === id ? { ...prevItems, complete: !prevItems.complete } : prevItems
      )
    )
  }

  // LocalStorage starts

  useEffect(() => {
    const todoKey = JSON.parse(localStorage.getItem('Todokey'));
    if (todoKey && todoKey.length > 0) {
      setTodos(todoKey)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("Todokey", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, removeTodo, toggleBtn, updateTodo }} >
      <div className="bg-[#1a3153]  min-h-screen py-8">
        <div className="w-full max-w-2xl bg-[#172c47] mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Create Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => {
              if (!todo) {
                console.error('Invalid todo object passed to TodoItem');
                return null;
              }

              return (
                <div className="w-full" key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </TodoProvider>
  )
}


export default App;
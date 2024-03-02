import { useState } from "react";
import useTodo from "../Context/Todo";

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, removeTodo, toggleBtn } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsEditing(false)
  }

  const toggleClick = () => {
    toggleBtn(todo.id)
  }

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.complete ? "bg-[#d9f286de]" : "bg-[#f5f5f8] slide "
        }`}
    >

      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.complete}
        onChange={toggleClick}
      />

      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${isEditing ? "border-black/10 px-2" : "border-transparent"
          } ${todo.complete ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isEditing}
      />

      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.complete) return;

          if (isEditing) {
            editTodo();
          } else setIsEditing((prev) => !prev);
        }}
        disabled={todo.complete}
      >
        {isEditing ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => removeTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;

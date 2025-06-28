import type { ToDoRequest } from "./todos.types";

export async function getToDos() {
  const response = await fetch("http://localhost:8000/todos/");
  if (!response.ok) {
    throw new Error("Could not get Todos");
  }

  return response.json();
}

export async function completeToDo(id: number) {
  const response = await fetch(`http://localhost:8000/todos/${id}/complete`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error(`Could not complete task with id:${id}`);
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export async function createToDo(todo: ToDoRequest) {
  const response = await fetch("http://localhost:8000/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("ToDo could not be created");
  }

  if (response.status === 201) {
    return null;
  }
}

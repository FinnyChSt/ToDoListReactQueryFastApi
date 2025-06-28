import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "primereact/checkbox";
import { DataScroller } from "primereact/datascroller";
import { completeToDo, createToDo, getToDos } from "./TodoList/ToDo.query";
import { Button } from "primereact/button";
import type { ToDo, ToDoRequest } from "./TodoList/todos.types";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

function ToDoList() {
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useQuery({
    queryKey: ["todo", "list"],
    queryFn: getToDos,
  });

  const { mutate: updateToDoMutation } = useMutation({
    mutationFn: (id: number) => completeToDo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", "list"] });
    },
  });

  const { mutate: createTodoMutation } = useMutation({
    mutationFn: (todo: ToDoRequest) => createToDo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo", "list"],
      });
      setIsVisible(!isVisible);
    },
  });

  const [newToDo, setNewToDo] = useState<ToDoRequest>({
    title: "",
    description: "",
  });
  const itemTemplate = (data: ToDo) => {
    return (
      <div className="p-2 border-2 m-2 rounded-2xl border-blue-200 flex justify-between">
        <div>
          <div className="text-3xl pb-2"> {data.title}</div>
          <div className="text-sm"> {data.description}</div>
        </div>
        <div className="flex justify-center items-center">
          <Checkbox
            checked={data.is_complete}
            onChange={() => {
              updateToDoMutation(data.id);
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="flex justify-end p-2">
        <Button
          icon={"pi pi-plus"}
          aria-label="Add ToDo"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />
      </div>
      <DataScroller
        value={data}
        itemTemplate={itemTemplate}
        header={"ToDo List"}
        rows={100}
      />
      <Dialog
        visible={isVisible}
        onHide={() => {
          setIsVisible(!isVisible);
        }}
        header="New ToDo"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTodoMutation(newToDo);
          }}
        >
          <FloatLabel>
            <InputText
              id="title"
              onChange={(e) =>
                setNewToDo((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
            />
            <label htmlFor="title">Title</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="description"
              onChange={(e) => {
                setNewToDo((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
            />
            <label htmlFor="descripion">Description</label>
          </FloatLabel>
          <Button label="Create" type="submit" />
        </form>
      </Dialog>
    </>
  );
}

export default ToDoList;

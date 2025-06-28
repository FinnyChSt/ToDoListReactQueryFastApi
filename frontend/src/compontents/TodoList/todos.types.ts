export type ToDo = {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
};

export type ToDoRequest = Omit<ToDo, "id" | "is_complete">;

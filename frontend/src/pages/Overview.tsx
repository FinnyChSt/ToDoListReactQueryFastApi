import { Card } from "primereact/card";
import { DataScroller } from "primereact/datascroller";

import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

function Overview() {
  const [isCompleted, setIsCompleted] = useState(false);
  const items = [
    {
      title: "some toDo",
      description: "some description",
      isCompleted: isCompleted,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
    {
      title: "some toDo",
      description: "some description",
      isCompleted: false,
    },
  ];

  const itemTemplate = (data: (typeof items)[0]) => {
    return (
      <div className="p-2 border-2 m-2 rounded-2xl border-blue-200 flex justify-between">
        <div>
          <div className="text-3xl pb-2"> {data.title}</div>
          <div className="text-sm"> {data.description}</div>
        </div>
        <div className="flex justify-center items-center">
          <Checkbox
            checked={data.isCompleted}
            onChange={() => {
              setIsCompleted(isCompleted);
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <Card className="  w-svw max-w-4xl">
      <DataScroller
        value={items}
        itemTemplate={itemTemplate}
        header={"ToDo List"}
        rows={100}
      />
    </Card>
  );
}

export default Overview;

"use client";

import Image from "next/image";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateTask } from "@/lib/actions/tasks";
import TaskForm from "./TaskForm";

const TaskCard = ({ title, dueDate, completed, id }) => {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <CardTitle>{title}</CardTitle>
          <p> Due Date: {format(dueDate, "PPP")}</p>
        </div>

        <div className="flex justify-center items-center gap-x-2">
          <TaskForm
            id={id}
            completed={completed}
            buttonText={"Edit"}
            title={title}
            dueDate={dueDate}
          />

          <button
            onClick={() => updateTask(id, !completed, title, dueDate)}
            className="!size-10 flex justify-center items-center rounded-full bg-black-400"
          >
            {completed && (
              <Image src="/check.svg" alt="Checkmark" width={28} height={28} />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

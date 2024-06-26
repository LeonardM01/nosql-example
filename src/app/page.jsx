import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { getTasks } from "@/lib/actions/tasks";
import { completedVsPendingTasks } from "@/lib/actions/aggregation";

export default async function Home() {
  const tasks = await getTasks();
  const summary = await completedVsPendingTasks();

  return (
    <main className="dark bg-black-200 min-h-screen text-white sm:px-20 px-10 py-10">
      <h1 className="text-[40px] leading-[120%] font-bold">To-Do App</h1>

      <section className="mt-10">
        <TaskForm buttonText={"Add a task ➕"} />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-3 mt-10">
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              dueDate={task.dueDate}
              completed={task.completed}
              id={task._id.toString()}
              tag={task.tag}
            />
          ))}
        </div>
      </section>

      {summary && (
        <section className="mt-10">
          <h2 className="text-[40px] leading-[120%] font-bold">Summary</h2>

          <div className="space-y-2 mt-5">
            <p>
              Total tasks: <span className="font-bold">{summary[0].total}</span>
            </p>
            <p>
              Completed tasks:{" "}
              <span className="font-bold">{summary[0].completed}</span>
            </p>
            <p>
              Pending tasks:{" "}
              <span className="font-bold">{summary[0].pending}</span>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

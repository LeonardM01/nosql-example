import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";

async function getData() {
  const tasks = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks`, {
    cache: "no-cache",
    next: {
      tags: ["tasks"],
    },
  }).then(async (res) => await res.json());

  const summary = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/aggregation`,
    {
      cache: "no-cache",
      next: {
        tags: ["summary"],
      },
    }
  ).then(async (res) => await res.json());

  return { tasks, summary };
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="dark bg-black-200 min-h-screen text-white sm:px-20 px-10 py-10">
      <h1 className="text-[40px] leading-[120%] font-bold">To-Do App</h1>

      <section className="mt-10">
        <TaskForm buttonText={"Add a task ➕"} />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-3 mt-10">
          {data.tasks.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              dueDate={task.dueDate}
              completed={task.completed}
              id={task._id}
              tag={task.tag}
            />
          ))}
        </div>
      </section>

      {data.summary && (
        <section className="mt-10">
          <h2 className="text-[40px] leading-[120%] font-bold">Summary</h2>

          <div className="space-y-2 mt-5">
            <p>
              Total tasks:{" "}
              <span className="font-bold">{data.summary[0].total}</span>
            </p>
            <p>
              Completed tasks:{" "}
              <span className="font-bold">{data.summary[0].completed}</span>
            </p>
            <p>
              Pending tasks:{" "}
              <span className="font-bold">{data.summary[0].pending}</span>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

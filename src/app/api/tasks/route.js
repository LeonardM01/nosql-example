import { getTasks } from "@/lib/actions/tasks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const tasks = await getTasks();
    return Response.json(tasks.tasks, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

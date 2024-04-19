import { completedVsPendingTasks } from "@/lib/actions/aggregation";

export async function GET() {
  try {
    const res = await completedVsPendingTasks();
    return Response.json(res.summary, { status: 200 });
  } catch (error) {
    return Response.error({ status: 500, error });
  }
}

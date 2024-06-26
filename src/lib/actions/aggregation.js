import Task from "@/schemas/task.model";
import { connectToDatabase } from "../mongoose";

export async function completedVsPendingTasks() {
  connectToDatabase();

  try {
    const summary = await Task.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: {
              $cond: ["$completed", 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          completed: 1,
          pending: { $subtract: ["$total", "$completed"] },
        },
      },
    ]);

    return summary;
  } catch (error) {
    return { status: 500, error };
  }
}

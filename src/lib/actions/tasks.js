"use server";

import Task from "@/schemas/task.model";
import { connectToDatabase } from "../mongoose";
import { revalidateTag } from "next/cache";

export async function createTask(title, dueDate, tag) {
  connectToDatabase();

  try {
    const task = new Task({
      title,
      dueDate,
      tag,
    });

    await task.save();

    revalidateTag("tasks");
    revalidateTag("summary");

    return { status: 200 };
  } catch (error) {
    console.log("Error creating task", error);
    return { status: 500, error };
  }
}

export async function getTasks() {
  connectToDatabase();

  try {
    const tasks = await Task.find();

    return { status: 200, tasks };
  } catch (error) {
    console.log("Error getting tasks", error);
    return { status: 500, error };
  }
}

export async function updateTask(id, completed, title, dueDate, tag) {
  connectToDatabase();

  try {
    const tasks = await Task.updateOne(
      { _id: id },
      { completed, title, dueDate, tag }
    );

    revalidateTag("tasks");
    revalidateTag("summary");

    return { status: 200, tasks };
  } catch (error) {
    console.log("Error getting tasks", error);
    return { status: 500, error };
  }
}

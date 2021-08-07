import createAxiosInstance from "../config/axios-config";
import { Task } from "../models/Task";
import { getToken } from "../storage";
import { Priority } from "../types/Priority";

const axiosInstance = createAxiosInstance();
axiosInstance.interceptors.request.use((config) => {
  config.headers.token = getToken();
  return config;
});
type AddTaskResponse = {
  id: string;
};

type GetTaskResponse = {
  _id: string;
  content: string;
  createdOn: string;
  priority: Priority;
};

export type UpdateTaskBody = {
  id: string;
  content?: string;
  priority?: Priority;
};
export function getTasks(): Promise<Task[]> {
  return axiosInstance.get<GetTaskResponse[]>("/task").then(({ data: tasks }) =>
    tasks.map((task) => {
      const mappedTask = new Task(
        task.content,
        task.priority,
        new Date(task.createdOn),
        task._id
      );

      return mappedTask;
    })
  );
}

export function deleteTask(id: string) {
  return axiosInstance.delete(`/task/${id}`);
}

export function addTask(task: Omit<Task, "id">) {
  return axiosInstance.post<AddTaskResponse>("/task", task);
}

export function updateTask(task: UpdateTaskBody) {
  return axiosInstance.put("/task", task);
}

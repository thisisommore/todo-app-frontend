import { Priority } from "../types/Priority";

export class Task {
  constructor(
    public content: string,
    public priority: Priority = "medium",
    public createdOn = new Date(),
    public id: string = ""
  ) {}
  getId() {
    return this.id;
  }
  setId(id: string) {
    this.id = id;
  }

  copy() {
    return new Task(this.content, this.priority, this.createdOn, this.id);
  }
}

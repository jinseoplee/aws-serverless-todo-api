import { v4 } from "uuid";

export class Todo {
  constructor(username, title) {
    this.id = v4();
    this.username = username;
    this.title = title;
    this.completed = false;
  }
}

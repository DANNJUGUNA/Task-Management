
class User {
  static nextId = 1;
  public id: number;
  public name: string;
  public email: string;

  constructor(name: string, email: string) {
    this.id = User.nextId++;
    this.name = name;
    this.email = email;
  }
}

class Task {
  static nextId = 1;
  public id: number;
  public title: string;
  public description: string;
  public assignedTo: number | null;

  constructor(title: string, description: string) {
    this.id = Task.nextId++;
    this.title = title;
    this.description = description;
    this.assignedTo = null;
  }
}

class UserService {
  private users: User[] = [];

  createUser(name: string, email: string): User {
    const user = new User(name, email);
    this.users.push(user);
    return user;
  }

  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  updateUser(id: number, name: string, email: string): boolean {
    const user = this.getUser(id);
    if (!user) return false;
    user.name = name;
    user.email = email;
    return true;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  listUsers(): User[] {
    return this.users;
  }
}

class TaskService {
  private tasks: Task[] = [];

  createTask(title: string, description: string): Task {
    const task = new Task(title, description);
    this.tasks.push(task);
    return task;
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  updateTask(id: number, title: string, description: string): boolean {
    const task = this.getTask(id);
    if (!task) return false;
    task.title = title;
    task.description = description;
    return true;
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  assignTask(taskId: number, userId: number): boolean {
    const task = this.getTask(taskId);
    if (!task) return false;
    task.assignedTo = userId;
    return true;
  }

  unassignTask(taskId: number): boolean {
    const task = this.getTask(taskId);
    if (!task) return false;
    task.assignedTo = null;
    return true;
  }

  getTasksByUser(userId: number): Task[] {
    return this.tasks.filter(t => t.assignedTo === userId);
  }

  listTasks(): Task[] {
    return this.tasks;
  }
}

const userService = new UserService();
const taskService = new TaskService();


const John = userService.createUser("John Doe", "jdoe@example.com");
const bob = userService.createUser("Bob Jonson", "bobjson@example.com");


const task1 = taskService.createTask("Fix login bug", "Fix the login issue on the mobile app.");
const task2 = taskService.createTask("Write API docs", "Document all public API endpoints.");


taskService.assignTask(task1.id, John.id);
taskService.assignTask(task2.id, bob.id);


console.log("All Users:", userService.listUsers());

console.log("All Tasks:", taskService.listTasks());

console.log(`Tasks assigned to ${John.name}:`, taskService.getTasksByUser(John.id));

taskService.unassignTask(task2.id);

// Get Tasks Assigned to Bob After Unassigning
console.log(`Tasks assigned to ${bob.name} after unassignment:`, taskService.getTasksByUser(bob.id));

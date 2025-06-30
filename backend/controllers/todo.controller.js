import Todo from '../models/todo.model.js';

// Get all todos
export const getTodos = async (req, res) => {
  const { userId } = req.body;
  const todos = await Todo.find({ userId });
  res.json(todos);
};

// Add a new todo
export const addTodo = async (req, res) => {
  const { userId, text } = req.body;
  const todo = new Todo({ userId, text });
  await todo.save();
  res.json(todo);
};

// Toggle completed
export const toggleTodo = async (req, res) => {
  const { id } = req.body;
  const todo = await Todo.findById(id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

// Delete todo
export const deleteTodo = async (req, res) => {
  const { id } = req.body;
  await Todo.findByIdAndDelete(id);
  res.json({ success: true });
};

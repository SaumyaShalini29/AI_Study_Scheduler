import express from 'express';
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo
} from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/get', getTodos);
router.post('/add', addTodo);
router.post('/toggle', toggleTodo);
router.post('/delete', deleteTodo);

export default router;

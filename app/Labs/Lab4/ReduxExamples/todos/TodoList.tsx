import { useState } from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { todo } from "node:test";
import { RootState } from "../../store";
import { setTodo, addTodo, updateTodo, deleteTodo } from "./todosReducer";



type Todo = { id: string; title: string };

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);


  return (
    <div>
      <h2>Todo List</h2>

      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />

        ))}

      </ListGroup>

      <hr />
    </div>
  );
}
package com.demo.app.todo.domain;

import java.util.List;

import com.demo.app.todo.services.schemaobjects.TodoItemSO;

public interface TodoDomain {

	public List<TodoItemSO> getTodoList(String state);

	public TodoItemSO saveTodo(TodoItemSO itemSO);

	public void deleteTodo(Long id);

	public TodoItemSO getTodoItem(Long id);

}

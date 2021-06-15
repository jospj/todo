package com.demo.app.todo.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.demo.app.todo.domain.TodoDomain;
import com.demo.app.todo.services.TodoService;
import com.demo.app.todo.services.schemaobjects.TodoItemSO;

@Service
public class TodoServiceImpl implements TodoService {
	@Autowired
	TodoDomain domain;
	@Override
	public List<TodoItemSO>  getTodoList(String state)  {
		return domain.getTodoList(state);
	}

	@Override
	@Transactional(readOnly=false)
	public TodoItemSO saveTodo(TodoItemSO itemSO) {
		return domain.saveTodo(itemSO);
	}

	@Override
	@Transactional(readOnly=false)
	public void deleteTodo(Long id) {
		domain.deleteTodo(id);

	}

	@Override
	public TodoItemSO getTodoItem(Long id) {
		return domain.getTodoItem(id);
	}

}

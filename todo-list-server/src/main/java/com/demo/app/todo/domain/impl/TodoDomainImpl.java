package com.demo.app.todo.domain.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.demo.app.todo.domain.TodoDomain;
import com.demo.app.todo.domain.entity.TodoItem;
import com.demo.app.todo.repository.TodoDataRepository;
import com.demo.app.todo.services.schemaobjects.TodoItemSO;

@Component
public class TodoDomainImpl implements TodoDomain {
	@Autowired
	TodoDataRepository repository;

	@Override
	public List<TodoItemSO> getTodoList(String state) {
		Iterable<TodoItem> findAll = null ;
		if(state == null) {
			findAll = repository.findAll();
		}else {
			findAll = repository.findCompleted();
		}
		
		List<TodoItemSO> items					= new ArrayList<>();
		if(findAll!= null){
			for (TodoItem entity : findAll) {
				items.add(new TodoItemSO(entity.getId(),entity.getText(),entity.getStatus()));
			}
		}
		return items;
	}

	@Override
	public TodoItemSO saveTodo(TodoItemSO itemSO) {
		TodoItem item	= new TodoItem(itemSO.getId(), itemSO.getText(), itemSO.getStatus());
		repository.save(item);
		return itemSO;
	}

	@Override
	public void deleteTodo(Long id) {
		repository.deleteById(id);

	}

	@Override
	public TodoItemSO getTodoItem(Long id) {
		Optional<TodoItem> findById = repository.findById(id);
		TodoItem item	= findById.get();
		return new TodoItemSO(item.getId(),item.getText(),item.getStatus());
	}

}

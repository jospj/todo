package com.demo.app.todo.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.demo.app.todo.repository.TodoDataCustomRepository;

public class TodoDataCustomRepositoryImpl implements TodoDataCustomRepository{

	@PersistenceContext
	EntityManager entityManager;
	
	public Integer getTodoCount() {
		Query createQuery = entityManager.createQuery("select count(t.id) from TodoItem t");
		int firstResult = createQuery.getFirstResult();
		System.out.println("firstResult :::" +firstResult);
		return 0;
	}

}

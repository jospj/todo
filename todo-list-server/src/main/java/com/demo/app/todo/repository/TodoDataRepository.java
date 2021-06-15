package com.demo.app.todo.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.app.todo.domain.entity.TodoItem;

@Repository
public interface TodoDataRepository  extends CrudRepository<TodoItem, Long>,TodoDataCustomRepository {

	@Query("select t from TodoItem t where status='COMPLETED' ")
	Iterable<TodoItem> findCompleted();

}

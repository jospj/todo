package com.demo.app.todo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.app.todo.services.TodoService;
import com.demo.app.todo.services.schemaobjects.TodoItemSO;

/**
 * @author Prince
 */
@RestController
public class TodoController {

	@Autowired
	TodoService service;
	
    @GetMapping("/api/todos")
    public ResponseEntity<Iterable<TodoItemSO>> getTodoList() {
    	List<TodoItemSO> todoList = service.getTodoList(null);
        return new ResponseEntity<>(todoList, HttpStatus.OK);
    }
    
    @GetMapping("/api/todos/completed")
    public ResponseEntity<Iterable<TodoItemSO>> getTodoCompletedList() {
    	String state = "COMPLETED";
    	List<TodoItemSO> todoList = service.getTodoList(state);
        return new ResponseEntity<>(todoList, HttpStatus.OK);
    }
    
    @GetMapping("/api/todos/{id}")
    public ResponseEntity<TodoItemSO> getTodoItem(@PathVariable("id") Long id) {
    	TodoItemSO itemSO = service.getTodoItem(id);
        return new ResponseEntity<>(itemSO, HttpStatus.OK);
    }
    
    @PostMapping("api/todos")
    public ResponseEntity<TodoItemSO> create(@RequestBody TodoItemSO todoItemSO) {
        return saveTodo(todoItemSO);
    }

    @PutMapping("api/todos/{id}")
    public ResponseEntity<TodoItemSO> saveTodo(@RequestBody TodoItemSO todoItemSO) {
    	todoItemSO = service.saveTodo(todoItemSO);
        return new ResponseEntity<>(todoItemSO, HttpStatus.CREATED);
    }

    @DeleteMapping("api/todos/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
    	service.deleteTodo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

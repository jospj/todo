package com.demo.app.todo.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * @author Prince
 */
@Entity
@Table(name="todo_item")
public class TodoItem {
    @Id
    @GeneratedValue
    private Long id;
    private String text;
    private String status;
    
    public TodoItem(){}
    
    
	public TodoItem(Long id, String text, String status) {
		super();
		this.id = id;
		this.text = text;
		this.status = status;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    
    

}

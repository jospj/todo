package com.demo.app.todo.services.schemaobjects;

import java.io.Serializable;

/**
 * @author Prince
 */
public class TodoItemSO implements Serializable{
    private Long id;
    private String text;
    private String status;

    public TodoItemSO(Long id, String text, String status) {
        this.id = id;
        this.text = text;
        this.status=status;
    }
    public TodoItemSO() {}
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

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import { getEntities, updateEntity } from './todo-list.reducer';

class TodoList extends React.Component {

    componentDidMount() {
        this.props.getEntities();
    }

    markAsComplete(todo) {
        this.props.updateEntity({...todo, status: 'COMPLETED'});
    }

    render() {
        //const todos = [{id: 1, status: 'PENDING', text: 'Note 1'}, {id: 2, status: 'COMPLETED', text: 'Note 2'}];
        const { match, todos } = this.props;
        console.log(todos)
        return (<div>
                    <h2>
                        Todo List
                        <Link to={`${match.url}/new`} className="btn btn-primary float-right">
                            <FaPlus /> Add New
                        </Link>
                        <Link to={`${match.url}/completed`} className="btn btn-primary float-right" >
                            <FaPlus /> Completed
                        </Link>
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th />
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                            {
                                todos.map((todo, i) => (
                                    <tr key={`entity-${i}`} className={`todo-list--status--${todo.status}`}>
                                        {/*<td>
                                            <Button tag={Link} to={`${match.url}/${todo.id}`} color="link" size="sm">
                                                {todo.id}
                                            </Button>
                                        </td>*/}

                                        <td>
                                        {todo.status !== 'COMPLETED' ? <ul className='ul--pending'><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{todo.text}</li></ul>: <ul className='ul--completed'><li>&nbsp;&nbsp;{todo.text}</li></ul>}


                                        </td>
                                        <td className="text-right">
                                            <div className="btn-group flex-btn-group-container">
                                                {todo.status !== 'COMPLETED' ? <Button className="todo-list--editor--action-button" onClick={() => this.markAsComplete(todo)} color="info" size="sm">
                                                    <FaEye/> <span className="d-none d-md-inline" >Complete</span>
                                                </Button> : null}
                                                {todo.status !== 'COMPLETED' ? <Button className="todo-list--editor--action-button" tag={Link} to={`${match.url}/${todo.id}/edit`} color="primary" size="sm">
                                                    <FaPencil/> <span className="d-none d-md-inline">Edit</span>
                                                </Button> : null }
                                                <Button className="todo-list--editor--action-button" tag={Link} to={`${match.url}/${todo.id}/delete`} color="danger" size="sm">
                                                    <FaTrash/> <span className="d-none d-md-inline">Delete</span>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                 </div>)
    }

}

const mapStateToProps = storeState => ({
    todos: storeState.todoList.entities
});

const mapDispatchToProps = { getEntities, updateEntity };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

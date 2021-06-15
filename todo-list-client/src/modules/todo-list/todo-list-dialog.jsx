import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './todo-list.reducer';


export class TodoListDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNew: !this.props.match.params || !this.props.match.params.id,
            showModal: true
        };
    }

    componentDidMount() {
        !this.state.isNew && this.props.getEntity(this.props.match.params.id);
    }

    saveEntity = (event, errors, values) => {
        const {id, status} = this.props.todo;
        if (this.state.isNew) {
            this.props.createEntity({...values, status: 'PENDING'});
        } else {
            this.props.updateEntity({...values, id, status});
        }
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            showModal: false
        });
        this.props.history.push('/todo');
    }

    render() {
        const isInvalid = false;
        const { todo, loading, updating } = this.props;
        const { showModal, isNew } = this.state;
		var modelheader	= '';
		if(this.state.isNew){
			modelheader = 'New Todo';
		}else{
			modelheader = 'Edit Todo';
		}
        return (
            <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
                   toggle={this.handleClose} size="lg">
                <ModalHeader toggle={this.handleClose}>
                     {modelheader}					
                </ModalHeader>
                { loading ? <p>Loading...</p>
                    : <AvForm model={isNew ? {} : todo} onSubmit={this.saveEntity} >
                        <ModalBody>
                            {/* todo.id ?
                                <AvGroup>
                                    <Label for="id">ID</Label>
                                    <AvInput type="text" className="form-control" name="id" required readOnly/>
                                </AvGroup>
                                : null
                            */}
                            <AvGroup>
                                <Label id="textLabel" for="text">Text</Label>
                                <AvInput type="text" className="form-control" name="text" required />
                                <AvFeedback>This field is required.</AvFeedback>
                                <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
                            </AvGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.handleClose}>
                                <FaBan/>&nbsp;Cancel
                            </Button>
                            <Button color="primary" type="submit" disabled={isInvalid || updating}>
                                <FaFloppyO/>&nbsp;Save
                            </Button>
                        </ModalFooter>
                    </AvForm>
                }
            </Modal>
        );
    }
}

const mapStateToProps = storeState => ({
    todo: storeState.todoList.entity,
    loading: storeState.todoList.loading,
    updating: storeState.todoList.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDialog);

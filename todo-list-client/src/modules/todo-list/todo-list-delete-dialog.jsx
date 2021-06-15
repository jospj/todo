import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaBan, FaTrash } from 'react-icons/lib/fa';

import { getEntity, deleteEntity } from './todo-list.reducer';

export class TodoListDeleteDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }

    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }

    confirmDelete = () => {
        this.props.deleteEntity(this.props.field.id);
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            showModal: false
        });
        this.props.history.push('/todo');
    }

    render() {
        const { field } = this.props;
        const { showModal } = this.state;
        return (
            <Modal
                isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
                toggle={this.handleClose}
            >
                <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
                <ModalBody>
                        Are you sure you want to delete this Field? {field.text}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleClose}>
                        <FaBan/>&nbsp;Cancel
                    </Button>
                    <Button color="danger" onClick={this.confirmDelete}>
                        <FaTrash/>&nbsp;Delete
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = storeState => ({
    field: storeState.todoList.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDeleteDialog);

"use client";
/* eslint-disable */
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';
import AssignmentEditor from './AssignmentEditor';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { addAssignment, deleteAssignment, updateAssignment } from './reducer';
import AssignmentControlButtons from "./AssignmentControlButtons";

function AssignmentListItem({ assignment }: { assignment: any }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(assignment.name);
    const [desc, setDesc] = useState(assignment.description);

    if (assignment.editing) {
        return (
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3 align-items-center">
                    <div>
                        <FormControl id={`wd-edit-name-${assignment._id}`} value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <FormControl id={`wd-edit-description-${assignment._id}`} value={desc}
                            onChange={(e) => setDesc(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button id={`wd-save-assignment-${assignment._id}`} onClick={() => dispatch(updateAssignment({ ...assignment, name, description: desc, editing: false }))}>Save</button>
                    <button id={`wd-cancel-edit-assignment-${assignment._id}`} onClick={() => dispatch(updateAssignment({ ...assignment, editing: false }))}>Cancel</button>
                </div>
            </ListGroup.Item>
        );
    }
    return (
        <ListGroup.Item key={assignment._id} className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3 align-items-center">
                <div id={`wd-name-${assignment._id}`} className="form-control-plaintext">{assignment.name}</div>
                <div>{assignment.description}</div>
            </div>
            <div>
                <AssignmentControlButtons assignment={assignment} />
            </div>
        </ListGroup.Item>
    );
}

export default function Assignments() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer as any);
    const [show, setShow] = useState(false);
    const [assignmentName, setAssignmentName] = useState("");
    const [description, setDescription] = useState("");
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div id="wd-assignments">
            <FormControl placeholder="Search for Assignments"
                id="wd-search-assignment" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment" onClick={handleShow}>+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button> </h3>
            <ListGroup id="wd-assignment-list">
                <ListGroup.Item id="wd-assignments-header" className="d-flex justify-content-between align-items-center fw-bold">
                    <div className="d-flex gap-3 align-items-center">
                        <div id="wd-name-header">Name</div>
                        <div id="wd-description-header">Description</div>
                    </div>
                    <div id="wd-actions-header"></div>
                </ListGroup.Item>
                {assignments.filter((a: any) => a.course === cid).map((assignment: any) => (
                    <AssignmentListItem key={assignment._id} assignment={assignment} />
                ))}
            </ListGroup>
            <AssignmentEditor show={show} handleClose={handleClose} dialogTitle="Add Assignment"
                assignmentName={assignmentName} setAssignmentName={setAssignmentName}
                description={description} setDescription={setDescription}
                addAssignment={() => {
                    dispatch(addAssignment({ name: assignmentName, course: cid, description }));
                    setAssignmentName("");
                    setDescription("");
                }} />
        </div>
    );
}

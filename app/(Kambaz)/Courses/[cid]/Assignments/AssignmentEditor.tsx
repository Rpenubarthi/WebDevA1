import { Modal, FormControl, Button } from "react-bootstrap";
export default function AssignmentEditor({ show, handleClose, dialogTitle, assignmentName, setAssignmentName, addAssignment, description, setDescription }:
    { show: boolean; handleClose: () => void; dialogTitle: string; assignmentName: string; setAssignmentName: (name: string) => void; addAssignment: () => void; description?: string; setDescription?: (d: string) => void }) {
    return (
        <Modal id="wd-add-assignment-modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl value={assignmentName}
                    onChange={(e) => { setAssignmentName(e.target.value); }} placeholder="Assignment name" />
                <br />
                <FormControl as="textarea" value={description} onChange={(e) => setDescription?.(e.target.value)} placeholder="Description" />
            </Modal.Body>
            <Modal.Footer>
                <Button id="wd-add-assignment-cancel" variant="secondary" onClick={handleClose}> Cancel </Button>
                <Button id="wd-add-assignment-confirm" variant="primary"
                    onClick={() => {
                        addAssignment();
                        handleClose();
                    }} > Add Assignment </Button>
            </Modal.Footer>
        </Modal>
    );
}


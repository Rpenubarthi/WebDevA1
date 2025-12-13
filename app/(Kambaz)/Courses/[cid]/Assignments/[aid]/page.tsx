"use client";
/* eslint-disable */
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { FormControl } from "react-bootstrap";

export default function AssignmentEditor() {
    const { aid } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer as any);
    const assignment = assignments.find((a: any) => a._id === aid);

    return (
        <div id="wd-assignments-editor">
            <h3 id="wd-assignments-editor-title">Assignment</h3>
            <div className="mb-3">
                <label htmlFor="wd-name">Name</label>
                <FormControl id="wd-name" defaultValue={assignment?.name} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-description">Description</label>
                <FormControl id="wd-description" as="textarea" defaultValue={assignment?.description} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-points">Points</label>
                <FormControl id="wd-points" defaultValue={assignment?.points ?? 100} readOnly />
            </div>
        </div>
    );
}

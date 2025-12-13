"use client";
/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useDispatch } from "react-redux";
import { deleteAssignment, editAssignment } from "./reducer";

export default function AssignmentControlButtons({ assignment }: { assignment: any }) {
    const dispatch = useDispatch();

    function handleDelete() {
        if (!confirm("Delete this assignment?")) return;
        dispatch(deleteAssignment(assignment._id));
    }

    function handleEdit() {
        dispatch(editAssignment(assignment._id));
    }

    return (
        <div className="d-flex gap-2 align-items-center">
            <FaPencil id={`wd-edit-assignment-${assignment._id}`} onClick={handleEdit} className="text-primary me-2" />
            <FaTrash id={`wd-delete-assignment-${assignment._id}`} className="text-danger me-2" onClick={handleDelete} />
            <GreenCheckmark />
            <IoEllipsisVertical />
        </div>
    );
}

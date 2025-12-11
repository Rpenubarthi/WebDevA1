<<<<<<< HEAD
=======
"use client"
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import ModulesControls from "@/app/(Kambaz)/Courses/[cid]/Modules/ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";

>>>>>>> origin/A3
export default function Modules() {
    const { cid } = useParams();
    const modules = db.modules;
    return (
        <div>
<<<<<<< HEAD
            <div>
                <button>Collapse</button>
                <button>View Progress</button>
                <select id="wd-select-one-genre" defaultValue="ALL">
                    <option value="ALL">Publish All</option>
                </select>
                <button>+ Module</button>
            </div>
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                </li>
            </ul>
=======
            <ModulesControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">

                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> Week 1 </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            LEARNING OBJECTIVES </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            Introduction to the course </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            Learn what is Web Development </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            LESSON 1 </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            LESSON 2 </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
            <ModulesControls /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 1 <ModulesControls />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
                        </ListGroupItem>
                        ...
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>

>>>>>>> origin/A3
        </div>
    );
}

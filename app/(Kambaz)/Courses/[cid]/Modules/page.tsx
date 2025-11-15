"use client"
/* eslint-disable */
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import ModulesControls from "@/app/(Kambaz)/Courses/[cid]/Modules/ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import * as client from "../../client";
import { useDispatch, useSelector } from "react-redux";
import ModuleControlButtons from "./ModuleControlButtons";
import { v4 as uuidv4 } from "uuid";


export default function Modules() {
    const { cid } = useParams();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const fetchModules = async () => {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModules();
    }, []);
    const [moduleName, setModuleName] = useState("");
    const addModule = () => {
        setModules([...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] }]);
        setModuleName("");
    };


    // const onCreateModuleForCourse = async () => {
    //     if (!cid) return;
    //     const newModule = { name: moduleName, course: cid };
    //     const module = await client.createModuleForCourse(cid, newModule);
    //     dispatch(setModules([...modules, module]));
    // };
    const onRemoveModule = async (moduleId: string) => {
        await client.deleteModule(moduleId);
        dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    };
    // const onUpdateModule = async (module: any) => {
    //     await client.updateModule(module);
    //     const newModules = modules.map((m: any) => m._id === module._id ? module : m);
    //     dispatch(setModules(newModules));
    // };
    return (
        <div>
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

        </div>


    );
}


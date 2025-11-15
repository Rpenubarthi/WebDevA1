"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import * as client from "../Courses/client";




export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const fetchCourses = async () => {
        try {
            const courses = await client.findMyCourses();
            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [currentUser]);
    const dispatch = useDispatch();
    const [course, setCourse] = useState({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        department: "New Department",
        credits: 0,
        description: "New Description",
    });
    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        dispatch(setCourses([...courses, newCourse]));
    };
    const onDeleteCourse = async (courseId: string) => {
        const status = await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    };
    const onUpdateCourse = async () => {
        await client.updateCourse(course);
        dispatch(setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })));
    };

    return (
        <Container fluid className="ms-md-5" style={{ marginLeft: "150px" }}>
            <h1 className="mt-3">Dashboard</h1>
            <h5>New Course
                <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={() => { dispatch(addNewCourse(course)); onAddNewCourse }}> Add </button>
                <button className="btn btn-warning float-end me-2"
                    onClick={() => { dispatch(updateCourse(course)); onUpdateCourse }} id="wd-update-course-click">
                    Update </button>

            </h5>
            <hr />
            <br />
            <FormControl value={course.name} className="mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <FormControl as="textarea" value={course.description} rows={3}
                onChange={(e) => setCourse({ ...course, description: e.target.value })} />


            <hr />
            <h4 className="mb-4">Published Courses ({courses.length})</h4>
            <Row className="gy-4 gx-4">
                {courses.
                    map((course) => (
                        <Col
                            key={course._id}
                            xs="12"
                            sm="6"
                            md="4"
                            lg="3"
                            style={{ width: "300px" }}
                        >
                            <Card>
                                <Link
                                    href={`/Courses/${course._id}/Home`}
                                    className="text-decoration-none text-dark"
                                >
                                    <CardImg src="/images/react.png" height={160} />
                                    <CardBody>
                                        <CardTitle className="text-nowrap overflow-hidden">
                                            {course.name}
                                        </CardTitle>
                                        <CardText className="overflow-hidden" style={{ height: "100px" }}>
                                            {course.description}
                                        </CardText>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            onDeleteCourse(course._id);
                                            dispatch(deleteCourse(course._id));
                                        }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">
                                            Delete
                                        </button>
                                        <button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}
                                            className="btn btn-warning me-2 float-end" >
                                            Edit
                                        </button>
                                        <button className="btn btn-primary"
                                            id="wd-add-new-course-click">
                                            Go </button>
                                    </CardBody>


                                </Link>
                            </Card>





                        </Col>

                    ))}


            </Row>
        </Container >
    );
}



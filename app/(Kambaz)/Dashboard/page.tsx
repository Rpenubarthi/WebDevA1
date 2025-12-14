"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg,
    FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import * as client from "../Courses/client";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { courses } = useSelector(
        (state: RootState) => state.coursesReducer
    );
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );

    const [course, setCourse] = useState({
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        department: "New Department",
        credits: 0,
        description: "New Description",
    });

    const fetchCourses = async () => {
        try {
            const courses = await client.findMyCourses();
            dispatch(setCourses(courses));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!currentUser) return;
        fetchCourses();
    }, [currentUser]);

    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        dispatch(setCourses([...courses, newCourse]));
    };

    const onDeleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    };

    const onUpdateCourse = async () => {
        await client.updateCourse(course);

    };

    return (
        <Container fluid className="ms-md-5" style={{ marginLeft: "150px" }}>
            <h1 className="mt-3">Dashboard</h1>

            <h5>
                New Course
                <button
                    className="btn btn-primary float-end"
                    onClick={onAddNewCourse}
                    id="wd-add-new-course-click"
                >
                    Add
                </button>

                <button
                    className="btn btn-warning float-end me-2"
                    onClick={onUpdateCourse}
                    id="wd-update-course-click"
                >
                    Update
                </button>
            </h5>

            <hr />

            <FormControl
                value={course.name}
                className="mb-2"
                onChange={(e) =>
                    setCourse({ ...course, name: e.target.value })
                }
            />

            <FormControl
                as="textarea"
                value={course.description}
                rows={3}
                onChange={(e) =>
                    setCourse({ ...course, description: e.target.value })
                }
            />

            <hr />

            <h4 className="mb-4">
                Published Courses ({courses.length})
            </h4>

            <Row className="gy-4 gx-4">
                {courses.map((course) => (
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

                                    <CardText
                                        className="overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        {course.description}
                                    </CardText>

                                    <button
                                        className="btn btn-danger float-end"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onDeleteCourse(course._id);
                                        }}
                                        id="wd-delete-course-click"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="btn btn-warning me-2 float-end"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCourse(course);
                                        }}
                                        id="wd-edit-course-click"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        id="wd-go-course-click"
                                    >
                                        Go
                                    </button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

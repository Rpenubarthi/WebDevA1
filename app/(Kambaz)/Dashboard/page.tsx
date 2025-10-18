"use client";

import Link from "next/link";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg } from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
    const courses = db.courses;

    return (
        <Container fluid className="ms-md-5" style={{ marginLeft: "150px" }}>
            <h1 className="mt-3">Dashboard</h1>
            <hr />
            <h4 className="mb-4">Published Courses ({courses.length})</h4>
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
                                <CardImg src="/images/reactjs.jpg" height={160} />
                                <CardBody>
                                    <CardTitle className="text-nowrap overflow-hidden">
                                        {course.name}
                                    </CardTitle>
                                    <CardText className="overflow-hidden" style={{ height: "100px" }}>
                                        {course.description}
                                    </CardText>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

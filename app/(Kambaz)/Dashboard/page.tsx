
"use client";

import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg } from "react-bootstrap";

export default function Dashboard() {
    return (
        <Container fluid className="ms-md-5" style={{ marginLeft: "150px" }}>
            {/* Title */}
            <h1 className="mt-3">Dashboard</h1>
            <hr />
            <h4 className="mb-4">Published Courses</h4>

            {/* Grid of Courses */}
            <Row className="gy-4 gx-4">
                {/* Course 1 */}
                <Col xs="12" sm="6" md="4" lg="3" style={{ width: "300px" }}>
                    <Card>
                        <Link href="/Courses/1234/Home" className="text-decoration-none text-dark">
                            <CardImg src="/images/blue.png" height={160} alt="React JS" />
                            <CardBody>
                                <CardTitle className="text-nowrap overflow-hidden">
                                    CS1234 React JS
                                </CardTitle>
                                <CardText
                                    className="overflow-hidden"
                                    style={{ height: "100px" }}
                                >
                                    Full Stack software developer
                                </CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                {/* Course 2 */}
                <Col xs="12" sm="6" md="4" lg="3" style={{ width: "300px" }}>
                    <Card>
                        <Link href="/Courses/21/Home" className="text-decoration-none text-dark">
                            <CardImg src="/images/green.jpg" height={160} alt="CS21 Course" />
                            <CardBody>
                                <CardTitle className="text-nowrap overflow-hidden">
                                    CS21 Data Structures
                                </CardTitle>
                                <CardText
                                    className="overflow-hidden"
                                    style={{ height: "100px" }}
                                >
                                    Fundamentals of arrays, lists, trees, and graphs
                                </CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                {/* Course 3 */}
                <Col xs="12" sm="6" md="4" lg="3" style={{ width: "300px" }}>
                    <Card>
                        <Link href="/Courses/22/Home" className="text-decoration-none text-dark">
                            <CardImg src="/images/red.jpeg" height={160} alt="CS22 Course" />
                            <CardBody>
                                <CardTitle className="text-nowrap overflow-hidden">
                                    CS22 Algorithms
                                </CardTitle>
                                <CardText
                                    className="overflow-hidden"
                                    style={{ height: "100px" }}
                                >
                                    Algorithm design and analysis
                                </CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                {/* Course 4 */}
                <Col xs="12" sm="6" md="4" lg="3" style={{ width: "300px" }}>
                    <Card>
                        <Link href="/Courses/23/Home" className="text-decoration-none text-dark">
                            <CardImg src="/images/green.jpg" height={160} alt="CS23 Course" />
                            <CardBody>
                                <CardTitle className="text-nowrap overflow-hidden">
                                    CS23 Databases
                                </CardTitle>
                                <CardText
                                    className="overflow-hidden"
                                    style={{ height: "100px" }}
                                >
                                    Introduction to relational databases and SQL
                                </CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                {/* Course 5 */}
                <Col xs="12" sm="6" md="4" lg="3" style={{ width: "300px" }}>
                    <Card>
                        <Link href="/Courses/24/Home" className="text-decoration-none text-dark">
                            <CardImg src="/images/blue.png" height={160} alt="CS24 Course" />
                            <CardBody>
                                <CardTitle className="text-nowrap overflow-hidden">
                                    CS24 Networking
                                </CardTitle>
                                <CardText
                                    className="overflow-hidden"
                                    style={{ height: "100px" }}
                                >
                                    Computer networks and protocols
                                </CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                {/* Course 6 */}
                <Col xs="12" sm="6" md="4" lg="3" style={{ width: "300px" }}>
                    <Card>
                        <Link href="/Courses/25/Home" className="text-decoration-none text-dark">
                            <CardImg src="/images/green.jpg" height={160} alt="CS25 Course" />
                            <CardBody>
                                <CardTitle className="text-nowrap overflow-hidden">
                                    CS25 Machine Learning
                                </CardTitle>
                                <CardText
                                    className="overflow-hidden"
                                    style={{ height: "100px" }}
                                >
                                    Basics of supervised and unsupervised learning
                                </CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                {/* Course 7 */}
                <Col xs="12" sm="6" md="4" lg="3" style={{ width: "300px" }}>
                    <Card>
                        <Link href="/Courses/26/Home" className="text-decoration-none text-dark">
                            <CardImg src="/images/red.jpeg" height={160} alt="CS26 Course" />
                            <CardBody>
                                <CardTitle className="text-nowrap overflow-hidden">
                                    CS26 Security
                                </CardTitle>
                                <CardText
                                    className="overflow-hidden"
                                    style={{ height: "100px" }}
                                >
                                    Principles of computer security and cryptography
                                </CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}


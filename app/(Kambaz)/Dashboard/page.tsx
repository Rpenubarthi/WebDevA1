import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (16)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/blue.png" alt="React JS Course" width={200} height={150} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/21" className="wd-dashboard-course-link">
                        <Image src="/images/green.jpg" alt="CS21 Course" width={200} height={150} />
                        <div>
                            <h5> CS21 Data Structures </h5>
                            <p className="wd-dashboard-course-title">
                                Fundamentals of arrays, lists, trees, and graphs
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/22" className="wd-dashboard-course-link">
                        <Image src="/images/red.jpeg" alt="CS22 Course" width={200} height={150} />
                        <div>
                            <h5> CS22 Algorithms </h5>
                            <p className="wd-dashboard-course-title">
                                Algorithm design and analysis
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/23" className="wd-dashboard-course-link">
                        <Image src="/images/green.jpg" alt="CS23 Course" width={200} height={150} />
                        <div>
                            <h5> CS23 Databases </h5>
                            <p className="wd-dashboard-course-title">
                                Introduction to relational databases and SQL
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/24" className="wd-dashboard-course-link">
                        <Image src="/images/blue.png" alt="CS24 Course" width={200} height={150} />
                        <div>
                            <h5> CS24 Networking </h5>
                            <p className="wd-dashboard-course-title">
                                Computer networks and protocols
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/25" className="wd-dashboard-course-link">
                        <Image src="/images/green.jpg" alt="CS25 Course" width={200} height={150} />
                        <div>
                            <h5> CS25 Machine Learning </h5>
                            <p className="wd-dashboard-course-title">
                                Basics of supervised and unsupervised learning
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/26" className="wd-dashboard-course-link">
                        <Image src="/images/red.jpeg" alt="CS26 Course" width={200} height={150} />
                        <div>
                            <h5> CS26 Security </h5>
                            <p className="wd-dashboard-course-title">
                                Principles of computer security and cryptography
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


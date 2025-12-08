import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150} alt="reactjs" />
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
                    <Link href="/Courses/1111" className="wd-dashboard-course-link">
                        <Image src="/images/cs.jpg" width={200} height={150} alt="reactjs" />
                        <div>
                            <h5> CS4530 Software Eng </h5>
                            <p className="wd-dashboard-course-title">
                                Software engineering
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/2234" className="wd-dashboard-course-link">
                        <Image src="/images/writing.webp" width={200} height={150} alt="reactjs" />
                        <div>
                            <h5> First Year Writing </h5>
                            <p className="wd-dashboard-course-title">
                                Intro writing course
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/101" className="wd-dashboard-course-link">
                        <Image src="/images/hist.jpg" width={200} height={150} alt="reactjs" />
                        <div>
                            <h5> HIST101 </h5>
                            <p className="wd-dashboard-course-title">
                                Intro history course
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1365" className="wd-dashboard-course-link">
                        <Image src="/images/math.webp" width={200} height={150} alt="reactjs" />
                        <div>
                            <h5> MATH 1365</h5>
                            <p className="wd-dashboard-course-title">
                                Math reasoning
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/7778" className="wd-dashboard-course-link">
                        <Image src="/images/phys.webp" width={200} height={150} alt="reactjs" />
                        <div>
                            <h5> PHY 7778 </h5>
                            <p className="wd-dashboard-course-title">
                                Rocket science
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/2755" className="wd-dashboard-course-link">
                        <Image src="/images/game.jpeg" width={200} height={150} alt="reactjs" />
                        <div>
                            <h5> CS2755 Intro to Game Design </h5>
                            <p className="wd-dashboard-course-title">
                                Game theory + design
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


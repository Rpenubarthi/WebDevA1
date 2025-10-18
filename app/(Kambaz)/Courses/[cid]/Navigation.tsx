"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { cid } = useParams();
    const pathname = usePathname();
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                const isActive = pathname === `/Courses/${cid}/${link}`;
                return (
                    <Link
                        key={link}
                        href={`/Courses/${cid}/${link}`}
                        id={`wd-course-${link.toLowerCase()}-link`}
                        className={`list-group-item border-0 ${isActive ? "active" : ""}`}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>

    );
}


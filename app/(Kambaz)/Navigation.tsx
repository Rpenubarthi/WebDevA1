"use client";

import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";


export default function Navigation() {
    const pathname = usePathname();
    const links = [
        { label: "Account", path: "/Account", icon: FaRegCircleUser },
        { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
        { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
        { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
        { label: "Inbox", path: "/Inbox", icon: FaInbox },
        { label: "Labs", path: "/Labs", icon: LiaCogSolid },
    ];

    return (
        <ListGroup
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 120 }}
            id="wd-kambaz-navigation"
        >
            {/* Northeastern external link */}
            <ListGroupItem
                className="bg-black border-0 text-center"
                as="a"
                target="_blank"
                href="https://www.northeastern.edu/"
                id="wd-neu-link"
            >
                <img src="/images/neu2.webp" width="75px" alt="Northeastern University" />
            </ListGroupItem>


            {links.map((link) => (
                <ListGroupItem key={link.path} as={Link} href={link.path}
                    className={`bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
                    {link.icon({ className: "fs-1 text-danger" })}
                    <br />
                    {link.label}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

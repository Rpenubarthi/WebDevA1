"use client";
/* eslint-disable */
import { useState } from "react";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import * as client from "../client";
import { useRouter } from "next/navigation";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({ username: "", password: "" });
    const [currentUser, setCurrentUser] = useState<any>();
    const router = useRouter();
    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        setCurrentUser(user);
        router.refresh();
        router.push("/Dashboard");
        router.refresh();
    };

    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            <Form.Control id="wd-username"
                placeholder="username"
                className="mb-2"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <Form.Control id="wd-password"
                placeholder="password" type="password"
                className="mb-2"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button id="wd-signin-btn"
                onClick={signin}
                className="btn btn-primary w-100 mb-2">
                Sign in
            </button>
            <Link id="wd-signup-link" href="/Account/Signup">Sign up</Link>
        </div>);
}
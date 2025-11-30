/*eslint-disable*/
"use client";
import { useState, useEffect } from "react";
import PeopleTable from "../../Courses/People/Table";
import * as client from "../client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };


  const fetchUsers = async () => {
    const data = await client.findAllUsers();
    setUsers(data);
  };

  const fetchUsersByRole = async (role: string) => {
    if (!role) {
      fetchUsers();
      return;
    }
    const data = await client.findUsersByRole(role);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsersByRole(role);
  }, [role]);

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };


  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <FormControl onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name" />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

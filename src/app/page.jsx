"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users`
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (err) {}
    };
    fetchUsers();
  }, [update]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        name: newUser,
      });
      setNewUser("");
      setUpdate(!update);
    } catch (err) {}
  };

  return (
    <div>
      <div className="text-center text-2xl text-green-600 font-bold">
        TEST APP
      </div>
      <div className="text-center">Users</div>
      <div className="text-center font-semibold">
        <div>Add new user</div>
        <input
          className="border m-2 p-2 rounded-lg shadow-lg"
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="border m-2 p-2 rounded-lg shadow-lg"
        >
          Submit
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {users.map((user) => (
          <div
            key={user._id}
            className="border m-2 p-2 rounded-lg shadow-lg text-center"
          >
            <div>{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Framework & CSS */
import React, { useState } from "react";
import "./profile.css";
import { useAppState } from "../../providers/AppStateProvider";
import { Navigate } from "react-router-dom";
import RoundBtn from "../../components/roundBtn/RoundBtn";
import userEdit from "../../images/user-pen-solid.svg";
import back from "../../images/arrow-left-solid.svg";
import save from "../../images/floppy-disk-solid.svg";

import Input from "../../components/Input/Input";
import UserDetail from "../../components/userDetail/UserDetail";

export default function Profile() {
  const [{ user }, appStateDispatch] = useAppState();
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <>
      {!user && <Navigate to="/" />}
      {!editMode && (
        <div>
          <h1>Edit Settings</h1>
          <RoundBtn icon={userEdit} onClick={() => setEditMode(true)} />
          <UserDetail label="Email:" value={user.email} />
          <UserDetail label="First Name:" value={user.firstName} />
          <UserDetail label="Last Name:" value={user.lastName} />
          <UserDetail label="Username:" value={user.username} />
          <UserDetail label="Password:" value={"********"} />
        </div>
      )}
      {editMode && (
        <div>
          <h1>Edit Settings</h1>
          <div className="buttons">
            <RoundBtn icon={back} onClick={() => setEditMode(false)} />
            <RoundBtn icon={save} onClick={() => console.log("save")} />
          </div>
          <Input
            label={"Email:"}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label={"First Name:"}
            placeholder={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <Input
            label={"Last Name:"}
            placeholder={user.lastName}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <Input
            label={"Username:"}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            label={"Password:"}
            type={"password"}
            placeholder={"**********"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      )}
    </>
  );
}

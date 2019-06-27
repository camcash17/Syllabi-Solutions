import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { MDBDataTable } from "mdbreact";

const UserTable = props => {
  const userList = [];
  props.users.forEach(user => {
    userList.push({
      username: user.username,
      id: user.uid,
      email: user.email,
      role: user.role,
      details: (
        <Link style={{ color: "pink" }} to={`${ROUTES.ADMIN}/${user.uid}`}>
          Details
        </Link>
      )
    });
  });
  const data = {
    columns: [
      {
        label: "Username",
        field: "username",
        sort: "asc",
        width: 150
      },
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 150
      },
      {
        label: "Details",
        field: "details",
        width: 100
      }
    ],
    rows: userList
  };

  return (
    <MDBDataTable
      // striped
      bordered
      small
      data={data}
    />
  );
};

export default UserTable;

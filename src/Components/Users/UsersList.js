import { Link } from "react-router-dom";
import "./UsersStyles.scss";
import { UsersTable } from "./UsersTable";

export const UsersList = () => {
  const { data } = require("../../lib/mock/usersMock.json");

  return (
    <div>
      <div className="return">
        <Link className="return__button" to="/backoffice/users/create">
          Regresar
        </Link>
      </div>

      <UsersTable users={data} />
    </div>
  );
};

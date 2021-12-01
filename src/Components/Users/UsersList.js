import { Link } from "react-router-dom";
import "./UsersStyles.scss";
import { UsersTable } from "./UsersTable";
import { data } from "./usersMock.json";

export const UsersList = () => {
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

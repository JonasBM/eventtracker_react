import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDUserProfile } from "../../actions/user/actionUserProfile";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userprofiles.users);

  useEffect(() => {
    dispatch(actionCRUDUserProfile.read());
  }, [dispatch]);

  const onDelete = (user) => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar este Usuário?";
    confirm_alert += newLine;
    confirm_alert += "Usuário: " + user.username;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDUserProfile.delete(user.id));
    }
  };

  return (
    <table className="table table-sm table-light table-striped table-bordered my-2">
      <caption>
        Lista de usuários{" "}
        <button
          data-toggle="modal"
          data-target="#ModalUser"
          data-modalcall="none"
          data-user_id="0"
          type="button"
          className="btn btn-sm btn-outline-primary"
        >
          Adicionar
        </button>
      </caption>
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Usuário</th>
          <th scope="col">Nome</th>
          <th scope="col">Sobrenome</th>
          <th scope="col">Email</th>
          <th scope="col">Matrícula</th>
          <th scope="col">Administrador</th>
          <th scope="col">Último Login</th>
          <th scope="col">Ativo</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.profile.matricula}</td>
            <td>{user.is_staff ? "Sim" : "Não"}</td>
            <td>{user.last_login}</td>
            <td>{user.is_active ? "Sim" : "Não"}</td>
            <td>
              <button
                onClick={() => onDelete(user)}
                className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                type="button"
                title="Deletar usuário"
              >
                <i className={"fa fa-trash"}></i>
              </button>
              <button
                data-toggle="modal"
                data-target="#ModalUser"
                data-modalcall="user"
                data-user_id={user.id}
                className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                type="button"
                title="Editar usuário"
              >
                <i className={"fa fa-pencil-square-o"}></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;

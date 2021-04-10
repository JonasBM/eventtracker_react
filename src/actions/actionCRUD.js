import axios from "axios";
import { returnErrors } from "./actionMessages";
import { tokenConfig } from "../actions/actionAuth";
import { createMessage } from "./actionMessages";
var nomes = [];
var header;

const formatData = (objeto, header) => {
  if (objeto && header) {
    if (header["Content-Type"] === "multipart/form-data") {
      return Object.keys(objeto).reduce((formData, key) => {
        formData.append(key, objeto[key]);
        return formData;
      }, new FormData());
    }
  }
  return objeto;
};

export class actionCRUD {
  constructor(nome, url, header = { "Content-Type": "application/json" }) {
    if (nomes.includes(nome)) {
      throw new Error('nome: "' + nome + '" já existe, o nome deve ser unico.');
    } else {
      nomes.push(nome);
      this.nome = nome;
      this.url = url;
    }
    this.types = {
      CREATE: "CREATE_" + this.nome.toUpperCase(),
      READ: "READ_" + this.nome.toUpperCase(),
      READ_OPTIONS: "READ_OPTIONS" + this.nome.toUpperCase(),
      UPDATE: "UPDATE_" + this.nome.toUpperCase(),
      DELETE: "DELETE_" + this.nome.toUpperCase(),
    };
    this.header = header;
  }

  // CREATE
  create = (objeto) => (dispatch, getState) => {
    axios
      .post(
        this.url,
        formatData(objeto, this.header),
        tokenConfig(getState, this.header)
      )
      .then((res) => {
        dispatch({
          type: this.types.CREATE,
          payload: res.data,
        });
        dispatch(createMessage({ CRUDcreate: "Criado com sucesso" }));
      })
      .catch((err) => dispatch(returnErrors(err)));
  };

  // READ
  read = (objeto) => (dispatch, getState) => {
    let headerWithValues = Object.assign(
      {},
      { params: formatData(objeto, this.header) },
      tokenConfig(getState, this.header)
    );
    axios
      .get(this.url, headerWithValues)
      .then((res) => {
        dispatch({
          type: this.types.READ,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };

  // READ_OPTIONS
  readOptions = () => (dispatch, getState) => {
    axios
      .options(this.url, tokenConfig(getState, this.header))
      .then((res) => {
        dispatch({
          type: this.types.READ_OPTIONS,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err)));
  };

  // UPDATE
  update = (objeto) => (dispatch, getState) => {
    axios
      .patch(
        this.url + objeto.id + "/",
        formatData(objeto, this.header),
        tokenConfig(getState, this.header)
      )
      .then((res) => {
        dispatch({
          type: this.types.UPDATE,
          payload: res.data,
        });
        dispatch(createMessage({ CRUDupdate: "Atualizado com sucesso" }));
      })
      .catch((err) => dispatch(returnErrors(err)));
  };

  //DELETE
  delete = (id) => (dispatch, getState) => {
    axios
      .delete(this.url + id + "/", tokenConfig(getState, header))
      .then((res) => {
        dispatch({
          type: this.types.DELETE,
          payload: id,
        });
        dispatch(createMessage({ CRUDdelete: "Deletado com sucesso" }));
      })
      .catch((err) => dispatch(returnErrors(err)));
  };
}

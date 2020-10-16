import axios from "axios";
import { returnErrors } from "./actionMessages";
import { tokenConfig } from "../actions/actionAuth";

var nomes = [];

export class actionCRUD {
  constructor(nome, url) {
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
  }

  // CREATE
  create = (objeto) => (dispatch, getState) => {
    axios
      .post(this.url, objeto, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: this.types.CREATE,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err)));
  };

  // READ
  read = () => (dispatch, getState) => {
    axios
      .get(this.url, tokenConfig(getState))
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
      .options(this.url, tokenConfig(getState))
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
      .put(this.url + objeto.id + "/", { ...objeto }, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: this.types.UPDATE,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err)));
  };

  //DELETE
  delete = (id) => (dispatch, getState) => {
    axios
      .delete(this.url + id + "/", tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: this.types.DELETE,
          payload: id,
        });
      })
      .catch((err) => dispatch(returnErrors(err)));
  };
}

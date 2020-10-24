import React from "react";

import { CheckboxFormGroup } from "../../common/Forms";

const CommonModalFooter = ({ isEdit = false, onDelete }) => {
  return (
    <div className="modal-footer">
      {isEdit && (
        <button
          type="button"
          className="mr-auto btn btn-danger font-weight-bold"
          onClick={onDelete}
        >
          Deletar
        </button>
      )}

      <button
        type="button"
        className="btn btn-secondary font-weight-bold"
        data-dismiss="modal"
      >
        Fechar
      </button>

      <button type="submit" className="btn btn-primary font-weight-bold">
        Salvar
      </button>
      {isEdit && (
        <CheckboxFormGroup
          name="criarnovo"
          label="Criar novo"
          tooltip="Salva como um novo evento"
        />
      )}
    </div>
  );
};

export default CommonModalFooter;

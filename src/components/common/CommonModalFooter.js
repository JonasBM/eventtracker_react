import React from "react";

import { CheckboxFormGroup } from "./Forms";

const CommonModalFooter = ({
  isDisabled = false,
  canDelete = false,
  canCopy = false,
  onDelete,
  form,
}) => {
  return (
    <div className="modal-footer">
      {canDelete && (
        <button
          type="button"
          className="mr-auto btn btn-danger font-weight-bold"
          onClick={onDelete}
          disabled={isDisabled}
        >
          Deletar
        </button>
      )}
      {form && (
        <button
          type="button"
          className="btn btn-secondary font-weight-bold"
          onClick={() => {
            form.reset();
          }}
          title="Recarregar informações iniciais"
          disabled={isDisabled}
        >
          <i className="fa fa-refresh" />
        </button>
      )}
      <button
        type="button"
        className="btn btn-secondary font-weight-bold"
        data-bs-dismiss="modal"
      >
        Fechar
      </button>

      <button
        type="submit"
        className="btn btn-primary font-weight-bold"
        disabled={isDisabled}
      >
        Salvar
      </button>
      {canCopy && (
        <CheckboxFormGroup
          name="criarnovo"
          label="Criar novo"
          tooltip="Salva como um novo evento"
          disabled={isDisabled}
        />
      )}
    </div>
  );
};

export default CommonModalFooter;

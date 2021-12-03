import { useMemo } from "react";
import DataTable from "react-data-table-component";

const noData = "Sem informações";
const caseInsensitiveSort = (textA, textB) => {
  const a = textA.toLowerCase();
  const b = textB.toLowerCase();

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
};

const sortName = (rowA, rowB) =>
  caseInsensitiveSort(rowA.nome || "", rowB.nome || "");
const sortProjeto = (rowA, rowB) =>
  caseInsensitiveSort(rowA.projeto || "", rowB.projeto || "");

function Table({ alunos, editCallback }) {
  const columns = useMemo(function () {
    return [
      {
        name: "index",
        selector: (row) => row?.index ?? noData,
        sortable: false,
        searchable: false,
        omit: true,
      },
      {
        name: "Projeto",
        selector: (row) => row?.projeto ?? noData,
        sortable: true,
        searchable: true,
        sortFunction: sortProjeto,
      },
      {
        name: "ID Projeto",
        selector: (row) => row?.idProjeto ?? noData,
        sortable: true,
        searchable: true,
      },
      {
        name: "Bolsista",
        selector: (row) => row?.nome ?? noData,
        sortable: true,
        searchable: true,
        wrap: true,
        sortFunction: sortName,
      },
      {
        name: "CPF",
        selector: (row) => row?.cpf ?? noData,
        sortable: true,
        searchable: true,
      },
      {
        name: "valor",
        selector: (row) => row?.valor ?? noData,
        sortable: true,
        searchable: true,
      },
      {
        name: "inicio",
        selector: (row) => row?.inicio ?? noData,
        sortable: true,
        searchable: true,
      },
      {
        name: "final",
        selector: (row) => row?.final ?? noData,
        sortable: true,
        searchable: true,
      },
      {
        name: "Situação atual",
        selector: (row) => row?.situacaoAtual ?? noData,
        sortable: true,
        searchable: true,
        wrap: true,
      },
      {
        name: "Relatório",
        selector: (row) => row?.situacaoAtual ?? noData,
        sortable: true,
        searchable: true,
        wrap: true,
      },
      {
        name: "Atividades",
        selector: (row) => row?.atividades ?? noData,
        sortable: true,
        searchable: true,
        wrap: true,
      },
      {
        name: "Entrega",
        selector: (row) => row?.atividades ?? noData,
        sortable: true,
        searchable: true,
      },
      {
        name: "Editar",
        selector: (row) => (
          <span onClick={() => editCallback(row.index)}>edit</span>
        ),
        sortable: false,
        searchable: false,
      },
    ];
  }, []); // eslint-disable-line

  return (
    <DataTable columns={columns} data={alunos} pagination defaultSortAsc />
  );
}

export default Table;

import { useState, useEffect, useRef } from "react";
import { rehidrate, dehidrate } from "./tools/hydration";
import { exportDataCsv, exportDataJson, importData } from "./tools/Backup";
import Input from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { Header, PageTitle, NotaDeRodape } from "./style";
import Table from "./components/Table";
import ModalNovoAluno from "./components/ModalNovoAluno";

const App = () => {
  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showModalNovoAluno, setShowModalNovoAluno] = useState(false);
  const [editingId, setEditingId] = useState(false);

  const refInput = useRef();

  useEffect(() => {
    const data = rehidrate();
    if (data?.data?.length > 0) {
      setAlunos(() => data.data);
    }
  }, []);

  useEffect(() => {
    const data = rehidrate();
    if (JSON.stringify(data?.data) !== JSON.stringify(alunos)) {
      dehidrate(alunos);
    }
  }, [alunos]);

  useEffect(() => {
    console.log(showModalNovoAluno);
  }, [showModalNovoAluno]);

  const addAluno = () => {
    // const newAlunos = Array(500)
    //   .fill(0)
    //   .map((_, index) => ({ nome: index % 2 === 0 ? "Helton" : "Fábio" }));
    // setAlunos((prevState) => [
    //   ...prevState,
    //   // { nome: alunos.length % 2 === 0 ? "Helton" : "Fábio" },
    //   ...newAlunos,
    // ]);
    setShowModalNovoAluno(true);
  };

  const backupAluno = type => {
    if(type === 'csv'){
      exportDataCsv(alunos);
    }else{
      exportDataJson(alunos);
    }
  };

  const editCallback = (index) => setEditingId(index);

  const clearAluno = () => {
    const response = window.confirm(
      "Você tem certeza de que deseja limpar os dados locais sobre os seus alunos?"
    );
    const confirm = window.confirm(
      "Caso não tenha feito um backup não será possível recuperar os dados!"
    );
    if (response && confirm) {
      setAlunos([]);
    }
  };

  const handleImport = async ({ target }) => {
    if (target.files.length === 0) return;
    const data = await importData(target.files[0]);
    if (data && Array.isArray(data) && data[0]?.name !== "") {
      if (alunos.length > 0) {
        const confirm = window.confirm(
          `Deseja substituir os dados locais pelos dados de ${data.length} alunos?`
        );
        if (confirm) {
          setAlunos(data);
        }
      } else {
        setAlunos(data);
      }
    } else {
      alert("Problemas ao importar dados");
      target.files = null;
    }
  };

  const closeModal = () => {
    setShowModalNovoAluno(false);
    setEditingId(null);
  };

  const handleSave = (aluno) => {
    if (editingId) {
      const currentAlunos = [...alunos];
      currentAlunos[editingId] = aluno;
      setAlunos(currentAlunos);
      setEditingId(null);
    } else {
      setAlunos((prevState) => [...prevState, aluno]);
    }
  };

  const shouldShowModal = () => showModalNovoAluno || !isNaN(String(editingId));

  return (
    <section>
      {shouldShowModal() && (
        <ModalNovoAluno
          show={shouldShowModal()}
          closeModal={closeModal}
          saveData={handleSave}
          aluno={alunos[editingId]}
        />
      )}
      <section>
        <PageTitle>Elze - Gestão de alunos</PageTitle>
        <Header>
          <Button variant="primary" onClick={addAluno}>
            Adicionar aluno
          </Button>
          <Button variant="primary" onClick={() => backupAluno('json')}>
            Fazer backup (.JSON)
          </Button>
          <Button variant="primary" onClick={() => backupAluno('csv')}>
            Fazer backup (.CSV)
          </Button>
          <Button variant="primary" onClick={() => refInput.current.click()}>
            Importar backup (.JSON)
          </Button>
          <Button variant="danger" onClick={clearAluno}>
            Limpar dados
          </Button>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: "none" }}
            ref={refInput}
          />
          <section className="sm-2">
            <Input
              type="text"
              placeholder="Buscar aluno"
              value={filtro}
              onChange={({ target }) => setFiltro(target.value)}
            />
          </section>
        </Header>
      </section>
      <Table
        alunos={alunos
          .filter((aluno) =>
            JSON.stringify(aluno).toLowerCase().includes(filtro.toLowerCase())
          )
          .map((aluno, index) => ({ ...aluno, index }))}
        editCallback={editCallback}
      />
      <NotaDeRodape>
        Nota: os dados contidos nessa página ficam armazenados no seu navegador.
        Caso deseje usar em outro dispositivo faça o backup. Limpar o cache do
        seu navegador também apagará os dados!
      </NotaDeRodape>
    </section>
  );
};

export default App;

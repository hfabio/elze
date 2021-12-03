import { useState, useEffect, useRef } from "react";
import { rehidrate, dehidrate } from "./tools/hydration";
import { exportData, importData } from "./tools/Backup";
import Input from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { Header } from "./style";
import Table from "./components/Table";
import ModalNovoAluno from "./components/ModalNovoAluno";

const App = () => {
  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showModalNovoAluno, setShowModalNovoAluno] = useState(false);

  const refInput = useRef();

  useEffect(() => {
    const data = rehidrate();
    if (data?.data) {
      setAlunos(data.data);
    }
  }, []);
  useEffect(() => {
    dehidrate(alunos);
  }, [alunos]);

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

  const backupAluno = () => {
    exportData(alunos);
  };

  const editCallback = (index) => {
    console.log(index);
  };

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

  const closeModal = () => setShowModalNovoAluno(false);

  return (
    <section>
      <ModalNovoAluno show={showModalNovoAluno} closeModal={closeModal} />
      <section>
        <Header>
          <Button variant="primary" onClick={addAluno}>
            Adicionar aluno
          </Button>
          <Button variant="primary" onClick={backupAluno}>
            Fazer backup
          </Button>
          <Button variant="primary" onClick={() => refInput.current.click()}>
            Importar backup
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
              placeholder="Buscar"
              value={filtro}
              onChange={({ target }) => setFiltro(target.value)}
            />
          </section>
        </Header>
      </section>
      <ul>
        <Table
          alunos={alunos
            .filter((aluno) => JSON.stringify(aluno).includes(filtro))
            .map((aluno, index) => ({ ...aluno, index }))}
          editCallback={editCallback}
        />
      </ul>
    </section>
  );
};

export default App;

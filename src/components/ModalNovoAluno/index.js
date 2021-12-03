import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { ModalContainer } from "./style";
import TextField from "../TextField";
import DateField from "../DateField";

const ModalNovoAluno = ({ show, closeModal, saveData, aluno }) => {
  const [projeto, setProjeto] = useState(aluno?.projeto || "");
  const [projetoId, setProjetoId] = useState(aluno?.projetoId ?? "");
  const [bolsista, setBolsista] = useState(aluno?.nome ?? "");
  const [cpf, setCpf] = useState(aluno?.cpf ?? "");
  const [valor, setValor] = useState(aluno?.valor ?? 0);
  const [inicio, setInicio] = useState(aluno?.inicio ?? "");
  const [final, setFinal] = useState(aluno?.final ?? "");
  const [situacao, setSituacao] = useState(aluno?.situacao ?? "");
  const [relatorio, setRelatorio] = useState(aluno?.relatorio ?? "");
  const [atividades, setAtividades] = useState(aluno?.atividades ?? "");
  const [entrega, setEntrega] = useState(aluno?.entrega ?? "");

  const save = () => {
    const aluno = {
      projeto,
      projetoId,
      nome: bolsista,
      cpf,
      valor,
      inicio,
      final,
      situacao,
      relatorio,
      atividades,
      entrega,
    };
    saveData(aluno);
    closeModal();
  };

  if (!show) return null;
  return (
    // <ModalContainer>
    <Modal show={show} onHide={closeModal} backdrop="static" size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar novo aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col lg={12}>
          <Row>
            <TextField
              value={projeto}
              onChange={setProjeto}
              emptyRule={projeto.length === 0}
              placeholder="nome do projeto"
            />
            <TextField
              value={projetoId}
              onChange={setProjetoId}
              emptyRule={projetoId.length === 0}
              placeholder="Id do projeto"
            />
          </Row>
          <Row>
            <TextField
              value={bolsista}
              onChange={setBolsista}
              emptyRule={bolsista.length === 0}
              placeholder="nome do aluno"
            />
            <TextField
              value={cpf}
              onChange={setCpf}
              emptyRule={cpf.length === 0}
              placeholder="CPF do aluno"
              cpf
            />
          </Row>
          <Row>
            <TextField
              value={valor}
              onChange={setValor}
              emptyRule={valor.length === 0}
              placeholder="Valor da bolsa"
            />
          </Row>
          <Row>
            <DateField
              value={inicio}
              onChange={setInicio}
              emptyRule={!inicio || inicio?.length === 0}
              placeholder="Data de inicio"
            />
            <DateField
              value={final}
              onChange={setFinal}
              emptyRule={!final || final?.length === 0}
              placeholder="Final"
            />
          </Row>
          <Row>
            <TextField
              value={situacao}
              onChange={setSituacao}
              emptyRule={situacao.length === 0}
              placeholder="Situação atual"
              large
              textArea
            />
          </Row>
          <Row>
            <TextField
              value={relatorio}
              onChange={setRelatorio}
              emptyRule={relatorio.length === 0}
              placeholder="Relatório"
              large
              textArea
            />
          </Row>
          <Row>
            <TextField
              value={atividades}
              onChange={setAtividades}
              emptyRule={atividades.length === 0}
              placeholder="Atividades"
              large
              textArea
            />
          </Row>
          <Row>
            <DateField
              value={entrega}
              onChange={setEntrega}
              emptyRule={!entrega || entrega?.length === 0}
              placeholder="Entrega"
            />
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={save}>
          Salvar
        </Button>
      </Modal.Footer>
      {/* </ModalContainer> */}
    </Modal>
  );
};

export default ModalNovoAluno;

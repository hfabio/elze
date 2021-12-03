import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const cpfMask = (value) => {
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export default function index({
  value,
  onChange,
  emptyRule,
  placeholder,
  cpf,
  large,
  textArea,
}) {
  return (
    <Col lg={large ? 12 : 6}>
      <Form.Label>{placeholder}</Form.Label>
      {cpf ? (
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={({ target: { value } }) => onChange(cpfMask(value))}
        />
      ) : (
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          as={textArea ? "textarea" : "input"}
          rows="3"
        />
      )}
      {emptyRule && (
        <Form.Text className="text-muted">
          Este campo não deveria ficar vazio!
        </Form.Text>
      )}
    </Col>
  );
}

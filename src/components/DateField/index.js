import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function index({ value, onChange, emptyRule, placeholder }) {
  return (
    <Col lg={6}>
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
      {emptyRule && (
        <Form.Text className="text-muted">
          Este campo não deveria ficar vazio!
        </Form.Text>
      )}
    </Col>
  );
}

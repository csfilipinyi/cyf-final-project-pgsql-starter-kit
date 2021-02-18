import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const FormField = (props) => {
  const [field, meta] = useField(props);
  return (
    <Container>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      {props.info && <FormInfo>{props.info}</FormInfo>}
      <InputField
        {...field}
        {...props}
        className={meta.touched && meta.error ? "has-error" : "input"}
      />
      {meta.error && meta.touched && <Error>{meta.error}</Error>}
    </Container>
  );
};

export default FormField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const FormLabel = styled.label`
  color: #000000;
  font-family: ${(props) => props.theme.fontFamily.primary};
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  margin-top:20px;
`;
const FormDescription = styled.p`
  color: #000000;
  font-family: ${(props) => props.theme.fontFamily.primary};
  font-size: 16px;
  font-style: italic;
  letter-spacing: 0;
  text-align: left;
  width:65%;
  margin-bottom:15px;
`;
const InputField = styled.input`
  height: ${(props) => props.height || "50px"};
  width: 700px;
  border: 1px solid #333333;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 16px;
  &.has-error {
    border-color: red;
  }
`;

const FormInfo = styled.p`
  color: #000000;
  font-family: Lato;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 19px;
`;

const Error = styled.p`
  font-size: "10px";
  line-height: 14px;
  color: red;
  margin: 0;
  padding: 0;
`;

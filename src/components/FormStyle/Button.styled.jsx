import styled from '@emotion/styled'

export const Button = styled.button`
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: transparent;
  color: b;
  &:not(:last-child) {
    margin-right: 30px;
  }
  &:hover,
  &:focus {
  background-color: wheat;
  border-color: rgb(6, 255, 247);
  }
`
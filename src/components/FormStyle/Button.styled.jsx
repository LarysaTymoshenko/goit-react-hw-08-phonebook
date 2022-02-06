import styled from '@emotion/styled'

export const Button = styled.button`
  padding: 10px;
  border: 1px solid wheat;
  border-radius: 10px;
  background-color: transparent;
  color: wheat;
  &:not(:last-child) {
    margin-right: 30px;
  }
  &:hover,
  &:focus {
    color: rgb(6, 255, 247);
    border-color: rgb(6, 255, 247);
  }
`
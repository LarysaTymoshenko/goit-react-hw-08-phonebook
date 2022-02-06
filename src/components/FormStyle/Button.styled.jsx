import styled from '@emotion/styled'

export const Button = styled.button`
  padding: 10px;
  border: 3px double rgb(117, 111, 58);
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
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
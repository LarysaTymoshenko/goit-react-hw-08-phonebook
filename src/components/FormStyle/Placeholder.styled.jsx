import styled from '@emotion/styled'

export const Placeholder = styled.span`
  display: block;
  position: absolute;
  bottom: 8px;
  left: 20px;
  font-size: 18px;
  pointer-events: none;
  color: rgb(117, 111, 58);
  transition: 250ms linear;
  input:focus + &,
  input:not(:placeholder-shown) + & {
    bottom: 80%;
  }
`
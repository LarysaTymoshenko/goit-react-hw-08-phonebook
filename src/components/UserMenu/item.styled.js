import styled from '@emotion/styled';

export const Item = styled.li`
  padding: 20px 20px;
  list-style: none;
  font-size: 20px;
  &:not(last-child) {
    margin-right: 20px;
  }
`;

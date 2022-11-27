import styled from 'styled-components';

export const ToastContainer = styled.div`
  position: relative;
  backdrop-filter: blur(12px);
  border-radius: 8px;
  ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return {
          color: 'white',
          backgroundColor: '#0673ad',
          border: '1px solid #055780',
        };
      case 'danger':
        return {
          backgroundColor: '#ee2222aa',
          color: 'white',
          border: '1px solid #7A0101AA',
        };
      default:
        return {
          backgroundColor: '#ECF4FDAA',
          color: theme.textMain,
          border: `1px solid ${theme.textBlue}`,
        };
    }
  }}
  & > div {
    padding: 2rem 3rem;
  }
`;

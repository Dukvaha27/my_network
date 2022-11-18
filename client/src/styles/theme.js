export const Theme = {
  blueGrey: '#F2F5F9',
  lightBlue: '#ECF4FD',

  primary: '#003171',
  textSecondary: '#777E86',
  textMain: '#16192E',
  textBlue: '#5493E3',
  textWhite: '#fff',

  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
  lightGray: '#E8E8E8',
  gray: '#858A93',
  darkGray: '#031428',
  buttonTransition: '.1s',
  headerMenu: '#f2f5f7',
  notified: '#33A03C',
  navItems: '#999',
  fontSize: '17px',

  space: [
    '0rem',
    '0.25rem',
    '0.5rem',
    '0.75rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '1.75rem',
    '2rem',
    '2.25rem',
    '2.5rem',
    '2.75rem',
    '3rem',
  ],
  mixins: {
    clip() {
      return {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      };
    },
    innerSpacingX(value) {
      return `& > * {
        margin-right: ${value};
        :last-child {
          margin-right: 0;
        }
      }`;
    },
    styledScroll() {
      return `
      // padding-right: 6px;
              ::-webkit-scrollbar {
              background-color: #f2f5f9;
               width: 6px;
               height: 6px;
             }
             ::-webkit-scrollbar-thumb {
              background-clip: padding-box;
               border-radius: 12px;
               background-color: #777E8688;
             }`;
    },

    innerSpacingY(value) {
      return `& > * {
        margin-bottom: ${value};
        :last-child {
          margin-bottom: 0;
        }
      }`;
    },
  },
};

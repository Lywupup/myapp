import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    optional: {
      color: token.colorTextSecondary,
      fontStyle: 'normal',
    },
    marginBottom: {
      marginBottom: '8px',
    },
  };
});

export default useStyles;

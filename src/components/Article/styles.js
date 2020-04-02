import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      flexShrink: 0,
      backgroundColor: theme.elevationColor[1],
      overflow: 'hidden',
      marginBottom: theme.spacing(4),
      padding: theme.spacing(4),
    },
    banner: {
      width: '40%',
    },
    title: {
      position: 'relative',
      paddingLeft: theme.spacing(4),
      color: '#9CACFF',
      outline: 'none',
      transition: 'transform 300ms ease-in-out',
      '&:focus': {
        transform: `translate(${theme.spacing(3)}px)`,
        '&::after': {
          position: 'absolute',
          content: '""',
          left: theme.spacing(),
          top: theme.spacing(2),
          width: 0,
          height: 0,
          display: 'inline-block',
          borderTop: `${theme.spacing(2)}px solid transparent`,
          borderBottom: `${theme.spacing(2)}px solid transparent`,
          borderLeft: `${theme.spacing(2)}px solid #9CACFF`,
          borderRight: `${theme.spacing(2)}px solid transparent`,
        },
      },
    },
    paragraph: {
      paddingLeft: theme.spacing(4),
      paddingTop: theme.spacing(4),
      fontSize: theme.spacing(2.5),
    },
    link: {
      color: theme.palette.text.primary,
      fontWeight: '700',
      textDecoration: 'none',
      '&:focus, &:hover': {
        outlineOffset: 4,
        outlineStyle: 'dashed',
        outlineWidth: theme.spacing() / 4,
        outlineColor: theme.palette.text.primary,
      },
    },
  };
});

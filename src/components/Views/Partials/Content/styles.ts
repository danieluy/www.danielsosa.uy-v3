import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: 600,
      margin: '0 auto',
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      borderBottom: `2px dashed ${theme.palette.grey[300]}`,
      [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(2),
      },
    },
  });
});

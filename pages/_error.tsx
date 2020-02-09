import React from 'react';
import { NextPageContext } from 'next';
import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import BaseLayout from '../layouts/BaseLayout';

interface Props {
  statusCode?: number;
  title?: string;
}

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext): Promise<Props> => {
  let statusCode;
  if (res)
    statusCode = res.statusCode;
  else
    statusCode = err ? err.statusCode : 404;
  return {
    statusCode,
  };
};

const useStyles = makeStyles(() => createStyles({
  error: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCode: {
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    fontSize: '24px',
    fontWeight: 500,
  },
  title: {
    fontSize: '14px',
    fontWeight: 'normal',
  },
}));

const defaultTitles: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'Page not found',
  405: 'Method Not Allowed',
  500: 'Oops! Something went wrong',
};

const fallbackTitle = 'Unknown error';

function ErrorPage({ statusCode, title }: Props): JSX.Element {
  const displayTitle =
    typeof title === 'undefined'
      ? defaultTitles[statusCode ?? -1] ?? fallbackTitle
      : title;

  let pageTitle = '';
  if (statusCode) pageTitle += `${statusCode}: `;
  pageTitle += displayTitle;

  const classes = useStyles();

  return (
    <BaseLayout title={pageTitle}>
      <div className={classes.error}>
        {statusCode && <h1 className={classes.statusCode}>{statusCode}</h1>}
        <h2 className={classes.title}>{displayTitle}</h2>
      </div>
    </BaseLayout>
  );
}

export default ErrorPage;

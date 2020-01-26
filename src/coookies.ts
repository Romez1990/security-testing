import cookies from 'cookie';
import { IncomingMessage, ServerResponse } from 'http';
import AppError from './error';

function parseCookie(req?: IncomingMessage) {
  return cookies.parse(req
    ? req.headers?.cookie ?? ''
    : document.cookie);
}

function getCookie(name: string, req?: IncomingMessage): string | undefined {
  checkServer({ req });
  const cookies = parseCookie(req);
  return cookies[name];
}

function setCookie(name: string, value: string, res?: ServerResponse): void {
  checkServer({ res });
  const cookie = cookies.serialize(name, value);
  updateCookie(cookie, res);
}

function removeCookie(name: string, res?: ServerResponse): void {
  checkServer({ res });
  const cookie = cookies.serialize(name, '', {
    maxAge: 0,
  });
  updateCookie(cookie, res);
}

function updateCookie(cookie: string, res?: ServerResponse) {
  if (res) {
    res.setHeader('Set-Cookie', cookie);
  } else {
    document.cookie = cookie;
  }
}

class HttpObjectsError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'HttpObjectsError';
  }
}

function checkServer({ req, res }: { req?: IncomingMessage, res?: ServerResponse }) {
  if (!process.browser && !req && !res)
    throw new HttpObjectsError('req or res object not passed');
}

export {
  getCookie,
  setCookie,
  removeCookie,
};

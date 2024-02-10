import https from 'https';

export interface NetHttpsServerOptions extends https.ServerOptions {
  requestCert: boolean;
  rejectUnauthorized: boolean;
}

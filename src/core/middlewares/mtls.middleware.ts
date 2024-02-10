import { X509Certificate } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { TLSSocket } from 'tls';
import logger from '@core/utils/logger';
import config from '@config/config';

// TODO: Add Caching Valid Certificates for high-traffic applications.
// implement a caching mechanism for validated certificates to reduce the overhead of repeated validations.
const requireClientCert = (req: Request, res: Response, next: NextFunction) => {
  const tlsSocket = req.socket as TLSSocket;
  const clientCertPem = tlsSocket?.getPeerCertificate(true)?.raw;

  if (!clientCertPem) {
    logger.error(`Client certificate not found!`);
    return res
      .status(401)
      .send(`Client certificate is required for '/api${req.url}' endpoint`);
  }

  try {
    const clientCert = new X509Certificate(clientCertPem);
    const caCert = config.mTlsCaCert;
    const caCertObj = new X509Certificate(caCert);

    // Check issuer i.e. if the client certificate was signed by our CA
    if (clientCert.issuer !== caCertObj.subject) {
      logger.error(
        `Provided client certificate issuer ${clientCert.issuer} is invalid.`,
      );
      throw new Error('Client certificate is not signed by the trusted CA');
    }
    logger.silly(`Client certificate issuer: OK`);

    // Check certificate expiry
    const validFrom = new Date(clientCert.validFrom);
    const validTo = new Date(clientCert.validTo);

    const now = new Date();
    if (now < validFrom || now > validTo) {
      throw new Error(
        `Client certificate is expired or not yet valid [from:${validFrom}, to:${validTo}]`,
      );
    }
    logger.silly(`Client certificate expiryty: OK`);

    // Confirms that the TLS socket has authorized the client.
    if (!tlsSocket.authorized) {
      throw new Error('Client certificate is invalid. Authorization failed.');
    }
    logger.silly(`Client certificate authorized by TLS socket: OK`);
    return next();
  } catch (error) {
    logger.error(`Certificate validation error: ${error.message}`);
    return res.status(403).send('Invalid client certificate');
  }
};

export default requireClientCert;

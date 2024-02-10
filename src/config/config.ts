import Joi from 'joi';
import { readPackage } from '@core/utils/package';

// All env variables used by the app should be defined in this file.

// To define new env:
// 1. Add env variable to .env.local file;
// 2. Provide validation rules for your env in envsSchema;
// 3. Make it visible outside of this module in export section;
// 4. Access your env variable only via config file.
// Do not use process.env object outside of this file.

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'integration', 'development')
      .required(),
    PORT: Joi.number().default(8080),
    API_KEY_TOKEN: Joi.string().required(),
    MTLS_SERVER_KEY: Joi.string().required(),
    MTLS_SERVER_CERT: Joi.string().required(),
    MTLS_CA_CERT: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly. If you run app locally use docker-compose`,
  );
}
const packageData = readPackage(process.cwd(), true);

// map env vars and make it visible outside module
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  xApiKey: envVars.API_KEY_TOKEN,
  ptojectName: packageData.name,
  projectVersion: packageData.version,
  mTlsServerKey: Buffer.from(envVars.MTLS_SERVER_KEY, 'base64').toString(
    'utf-8',
  ),
  mTlsServerCert: Buffer.from(envVars.MTLS_SERVER_CERT, 'base64').toString(
    'utf-8',
  ),
  mTlsCaCert: Buffer.from(envVars.MTLS_CA_CERT, 'base64').toString('utf-8'),
};

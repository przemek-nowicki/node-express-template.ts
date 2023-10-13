import logger from '@core/utils/logger';
import config from '@config/config';
import mongoose from 'mongoose';

const connect = async () => {
  try {
    const connectionString = `${config.mongoUrl}/${config.mongoDbName}`;
    await mongoose.connect(connectionString);
    logger.info('Connected to MongoDB!');
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    throw new Error(err.message);
  }
};

export default { connect };

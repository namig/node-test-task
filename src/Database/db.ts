import { connect } from 'mongoose';

export const dbConnection = async () => {
  const dbConfig = {
    url: process.env.MONGO_URL!,
  };

  await connect(dbConfig.url);
}

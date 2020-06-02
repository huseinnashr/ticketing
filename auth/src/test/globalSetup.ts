import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO__: MongoMemoryServer;
    }
  }
}

module.exports = async function () {
  process.env.JWT_KEY = "asdfasdf";

  let mongo: MongoMemoryServer = new MongoMemoryServer();

  process.env.MONGO_URI = await mongo.getUri();

  global.__MONGO__ = mongo;
};

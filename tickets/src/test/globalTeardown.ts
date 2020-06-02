module.exports = async function () {
  await global.__MONGO__.stop();
};

const mongoose = require("mongoose");

const connection = mongoose
  .connect(
    `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@mhs-shard-00-00.fr6mf.mongodb.net:27017,mhs-shard-00-01.fr6mf.mongodb.net:27017,mhs-shard-00-02.fr6mf.mongodb.net:27017/?ssl=true&replicaSet=atlas-qwxtfm-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log("connected to db successfully");
    return res;
  })
  .catch((e) => {
    console.log(e.message);
    return null;
  });

module.exports = connection;

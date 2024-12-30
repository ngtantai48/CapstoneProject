const knex = require('knex');
const knexConfig = require('../config/knex/knexfile');

class Database {
  constructor() {
    if (!Database.instance) {
      const environment = 'development';
      const config = knexConfig[environment];
      this.db = knex(config);
      Database.instance = this;
    }
    return Database.instance;
  }

  getDB() {
    return this.db;
  }
}

const database = new Database();
Object.freeze(database);

module.exports = database;
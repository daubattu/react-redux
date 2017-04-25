import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../knexfile.js';

export default bookshelf(knex(knexConfig.development));

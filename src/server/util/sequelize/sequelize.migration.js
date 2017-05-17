/* eslint-disable import/no-unresolved */
import schema from '../schema/sequelize.schema';

/* eslint-enable import/no-unresolved */

// command 'npm run migration' in order to migrate tables.
const up = queryInterface => Object.keys(schema).map(key1 => Object.keys(schema[key1]).map(key2 =>
  queryInterface.createTable(`${key1}_${key2}`, schema[key1][key2], { charset: 'utf8' })
    .then(() => {
      if (!(key1 === 'user' || key1 === 'order' || key1 === 'node' || key1 === 'partner')) {
        queryInterface.addIndex(`${key1}_${key2}`, ['root_id'], { indexName: 'root_id_index', indicesType: 'FULLTEXT' });
      }
    })
  ));


const down = () => {

};

export {
  up,
  down
};

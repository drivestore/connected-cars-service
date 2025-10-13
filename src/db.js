import pg from 'pg'

var DB_USER  = process.env.DB_USER
var DB_PASS  = process.env.DB_PASSWORD

pg.defaults.max = 1000;
pg.defaults.poolSize = 1000;

var pool;

if(!pool) {

    pg.types.setTypeParser(1114, function(value) {
        return value;
    });
    pool = new pg.Pool({
        max: 1000,
        connectionString: `postgres://${DB_USER}:${DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 30000, 

    })
}


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

export default pool;

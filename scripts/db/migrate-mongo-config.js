// migrate-mongo configuration
const { MONGODB_URL, MONGODB_DB_NAME} = process.env;

if (!MONGODB_URL || !MONGODB_DB_NAME) {
  console.error('Error: Required environment variables MONGODB_URL or MONGODB_DB_NAME are not set.');
  console.info('Tip: For local runs, connect to the "web_1" container and execute the "mongo-migrate" command.');
  process.exit(1);  // Exit with a failure code
}

const config = {
  mongodb: {
    url: MONGODB_URL,
    databaseName: MONGODB_DB_NAME,
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: '.js',

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: true,

  // Don't change this, unless you know what you're doing
  moduleSystem: 'esm',
};

export default config;

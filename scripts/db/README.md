# Migrate Mongo and database migration in NET.ts:

The NET.ts project uses the `migrate-mongo` library to handle MongoDB database migrations.
It ensures that database changes are applied consistently and can be rolled back if necessary.
The `migrate-mongo` is installed globally on the web container during the image build process (i.e., `docker-compose build`).
You can see that the migration script runs in the logs when the application starts (`docker-compose up`).

```sh
web_1 | Changing directory to 'scripts'
web_1 | Running migrate-mongo to process all unapplied database migrations
web_1 | MIGRATED UP: 20231013081306-initial.js << it means that migration has been applied successfully
web_1 | Switching back to the 'app' directory
web_1 | Running server in development mode
```

In the `scripts/db/migrations` directory, you'll find all the migration files. If you're just starting out with NET.ts, you'll only see one initial migration file there.

## How to manage migrations:

First of all you need to connect to `web` container (I recommend to use Docker Desktop) or the folowing command:

```sh
docker exec -it node-express-templatets_web_1 /bin/sh
```

Inisde of the `web` container go to:

```sh
`/app # cd scripts/db/`
```

And check your migration status by the following command:

```sh
`/app/scripts/db # migrate-mongo status`
```

Output:

|       **Filename**        |                             **Hash**                             |      **Applied At**      |
| :-----------------------: | :--------------------------------------------------------------: | :----------------------: |
| 20231013081306-initial.js | 989fc9fd7d98714c7ed1945185b3776d1464066a634efeeda654f488e3bc6238 | 2023-10-13T10:07:11.149Z |

To create new migration run:

```sh
`/app/scripts/db # migrate-mongo create next`
```

Output:

```
Created: migrations/20231013104434-next.js
```

In your IDE go to `scripts/db/migrations` to see and fill new migration file with some data:

Applying migration, if you are done with edition just execute:

```sh
`/app/scripts/db # migrate-mongo up`
```

Output:

```
`MIGRATED UP: 20231013104434-next.js`
```

Latest migration Rollback is possible by:

```sh
migrate-mongo down
```

There are more commands available after typing:

```
migrate-mongo help
```

More can be found here: https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script

## Migrations in database:

To see your migration data first connect to db continaer via Docker Desktop of the command below:

```sh
docker exec -it node-express-templatets_db_1 /bin/sh
```

When you are in, execute:

```sh
mongo
```

Use net-db to display all db collections:

```sh
> use net-db
> switched to db net-db
> show collections;
```

Initialy there are two collections available:

```
> changelog
> users
```

The migration history is kept in changelog:

```

> db.changelog.find({});
> { "\_id" : ObjectId("652916cf167b52d7a69402cb"), "fileName" : "20231013081306-initial.js", "fileHash" : "989fc9fd7d98714c7ed1945185b3776d1464066a634efeeda654f488e3bc6238", "appliedAt" : ISODate("2023-10-13T10:07:11.149Z") }

```

If it happens that you look at your database right after the first run of the NET.ts project (i.e., with one migration file applied), your users collection will have the following documents:

```

> db.users.find({});
> { "\_id" : ObjectId("652916cf167b52d7a69402c9"), "email" : "john.doe@example.com", "name" : "John Doe" }
> { "\_id" : ObjectId("652916cf167b52d7a69402ca"), "email" : "jahne.doe@example.com", "name" : "Jahne Doe" }

```

```

```

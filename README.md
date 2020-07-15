# fitness-app

Rest-api server that records the user's activity.\
It uses Express on backend and EJS on frontend.

## Installation

### postgreSQL

If you don't have postgreSQL installed on your macOS machine, you can install it with **homebrew** (package manager)\
[postgres wiki](https://wiki.postgresql.org/wiki/Homebrew)\
[homebrew formulae](https://formulae.brew.sh/formula/postgresql)

```bash
brew install postgresql
```

And to see some graphical representation of data layer, you can install [postico](https://formulae.brew.sh/cask/postico).

```bash
brew cask install postico
```

After installation, you have to launch the postgreSQL server and create database to work with.

```bash
brew services start postgresql
```

You can specify the name of database after `createdb` command. If the name is not specified, database with your loged user as her name will be created.

```bash
createdb databaseName
```

Make sure you start your postgreSQL server and set the [enviroment variables](#Enviroment-variables) inside config.\
By default postgreSQL server is running on port `5432`.

### Server

When the database is running successfully, clone the repository, navigate to the cloned
directory and run:

```bash
# This launches `rest-api`.

cd ./server
npm install
npm run build
npm start
```

Now navigate to [login](http://localhost:3000/login) URL to login.

## Usage

After building will successfully run.\
There is rest-api running on port `3000`.

### Available logins:

email: `info@martin.com`\
password: `password12345`

### REST API Usage

Before accessing rest api on paths below, make sure you import Authorization header and Content-Type header set to application/json.

`OAuth Token` can be obtained by POST request to `/user/login`.

```
Authorization: Bearer OAUTH-TOKEN
Content-Type: application/json
```

### Available requests:

`GET`, `POST`, `PATCH`, `DELETE`

### Available routes:

`/user`

#### Other routes:

| route            | description                                                        |
| :--------------- | :----------------------------------------------------------------- |
| `/user/login`    | returns JWT token in which are encrypted ID and email of the User. |
| `/user/register` | encrypts password and creates new record of User                   |

##### Request example:

```json
{
    "url": "http://localhost:3000/user/login",
    "method": "POST",
    "header": [
        {
            "key": "Content-Type",
            "type": "text",
            "value": "application/json"
        }
    ],
    "body": {
        "email": "info@martin.com",
        "password": "password12345"
    }
}
```

##### Response example:

```json
{
    "dto": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXRtYW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1OTMzOTEzMDAsImV4cCI6MTU5MzM5MjIwMH0.CX-5nO6OXChIh4c69dPFNxd-JBlcr5KbHnr1dgO0u6s"
}
```

### Seeded data

I have created [module](server/src/db/sampleData.ts) for sample data and [function](server/src/db/repos/postgres/seed.ts) that seeds these sample data after successful connection to database.

### Enviroment variables

There are enviroment variables that represent information about url where rest-api resides, its port, database information for establishing connection and JWT secret for User authentication.
If they're not set, values from [config](server/src/config.ts) will be assigned.

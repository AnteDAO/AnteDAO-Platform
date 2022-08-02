# Sotatek Starter Backend

## Setup

#### Step 1
```
npm i
npm i -g @adonisjs/cli
```


#### Step 2

```
docker-compose up -d
```



#### Step 3

Create ``.env`` file
```
cp .env.example .env
```

Generate app key
```
adonis key:generate
```



#### Step 4
Edit .env file to config environment

``Config Database``
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=your_database_name
```

``Config Redis Queue``
```
REDIS_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
KUE_CONNECTION=kue
```

``Config Mail``

Example: Config mail with MailTrap

```
MAIL_DRIVER=smtp
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
MAIL_FROM_NAME=Antedao
```


#### Step 5

Create database in your MySQL

And fill ``your_database_name`` to ``.env`` file

```
DB_DATABASE=your_database_name
```

#### Step 6: Run Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```


#### Step 7: Run seeder
```js
adonis seed
```

#### Step 8: Run

Open another terminal tab and run:

(Note: Need install Redis and setup config in ``.env`` file)
```
pm2 start app.json
```

#### Step 9: Check API Working

Access to check API Working:
```
http://localhost:8456
```

Result:
```
It's working
```




Enjoy and Finish !!!



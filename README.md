# Node.js + ExpressJS starter application

This project will help to quickly setup and start a Node.js + ExpressJs application with a well organized folder structure and necessary helper functions.

You can get more information about the folder structure in my blog [Best folder structure for an ExpressJs application](https://siddarth-bulusu.medium.com/best-folder-structure-for-a-expressjs-application-33de818bb420)

## Create your project using this repository

Clone the project

```bash
  https://github.com/siddarth597/expressjs-starter-app.git
```

Go to the project directory

```bash
  cd expressjs-starter-app
```

Replace the contents in **package.json** file

```json
{
  "name": "<your-app-name>",
  "version": "1.0.0",
  "description": "<your-app-description>",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["<your-app-keywords>"],
  "author": "<author-name>",
  "license": "ISC"
}
```

## Note

Search and uncomment the below lines in **.gitignore** file to avoid commiting **.env** files into the repository.

```env
# dotenv environment variables file (Uncomment the below to avoid commiting the environment files to the repository)

# .env
# .env.test
```

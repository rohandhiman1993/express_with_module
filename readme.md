npm init -y
npm i express

npm i -D nodemon

mkdir src && touch src/index.mjs

<!-- package.json -->
```json
{
  "name": "expresswithes6",
  "version": "1.0.0",
  "description": "",
  "main": "index.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "nodemon ./src/index.mjs",
    "start": "node ./src/index.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.3"
  },
  "type": "module"
}


```

<!-- index.mjs -->

```js
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});


```

`npm run start:dev`
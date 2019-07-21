 4  clear
    5  ls -a
    6  sudo nano server.ts
    7  npm run dev
    8  clear
    9  ls -a
   10  sudo nano package.json
   11  touch tsconfig.json
   12  sudo nano tsconfig.json
   13  sudo nano package.json
   14  npm install
   15  rm -r tsconfig.json
   16  touch tsconfig.json
   17  nano tsconfig.json
   18  nano package.json
   19  npm run dev
   20  npm i -g nodemon
   21  npm i -g ts-node
   22  nano package.json
   23  npm run dev
   24  npm i --save body-parser
   25  npm run dev
   26  history

Add to package.json
"test": "jest --watch",
"build": "tsc",
"dev": "nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' server.ts",
"start": "nodemon ./dist/server.js",
"prod": "npm run build && npm run start"4

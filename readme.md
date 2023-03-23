# social media app with todo lists

## .env example

```.env
MONGODB_URI=""
JWT_SECRET=""
```

## spin up the app locally

### start the express backend 
- navigate inside `server` folder:
```
npm install
npm run dev
```
- the server is to run on `localhost:3000`
- the app is published on Glitch - https://social-media-app-with-todo-list.glitch.me/
  - but the Glitch spin up times are very slow

### start the react frontend
- nagvigate inside the `client` folder
```
npm install
npm start
```
- the client should ideally run on `localhost:3001` for demo purposes

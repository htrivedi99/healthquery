# healthquery

This is the dev branch where we should write our code and merge with master branch later on.
When you initially git pull from this branch there are a few things you need to do in order to get the app working:

  1) Download the service_account.json and config.js from discord. Add these two files to the functions directory located at
     healthquery/backend/functions. These two files will allow your app to communicate with firebase.
  2) You need to run the command "npm install" at the root directory "healthquery", at the directory healthquery/backend/functions,
    and at the directory healthquery/frontend/healthapp/. When you run the command at each of these 3 places you will see 
    a node modules folder that gets created which is necessary for our application to function.
  3) Finally you can run the app by using this command "npm run dev" at the home directory "healthquery".
      This will launch a server at localhost:3001 and you should see the app running.

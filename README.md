# Simple Search App
### Documentation
This app is a simple search app that returns results of movies, music, podcasts, etc

----
#### To get data:
- start the app servers and type for whatever type of media you would like
- use the filter drop down to improve search results

----
#### To add new items to your favourites list:
- search for that item
- click on the heart icon ❤ on that specific item
- navigate to the favourites collection by clicking on 'favourites' button

----
#### To delete an item from your favourites collection:
- navigate to the favourites collection by clicking on 'favourites' button
- click on the delete button (x)

----
## Tech
this app uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [react] - javascript front-end library
- [itunes api] - free apple api for retreiving data about different types of media

----
## Installation
This app requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

(1)
cd to the 'client' folder
Run **npm install**

(2)
cd to the root folder
Run **npm install**

### Start the server

(3)
cd to the root folder
Run **npm start**

(4)
cd to the root folder
Run **npm install**

----
## Security
This app uses helmet to ensure iframes only work from the same origin, to prevent any malicious activity that hackers might try to do to our users.

It also enforces a https connection from the browser to our server

The itunes api does not require any type of authentication or api keys to work. It is completely free!





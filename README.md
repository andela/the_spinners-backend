# Barefoot Nomad(the Spinners)

[![Coverage Status](https://coveralls.io/repos/github/andela/the_spinners-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/the_spinners-backend?branch=develop)
[![](https://img.shields.io/badge/Hound-CI-yellowgreen)](https://houndci.com)
[![Build Status](https://travis-ci.org/andela/the_spinners-backend.svg?branch=develop)](https://travis-ci.org/andela/the_spinners-backend)

 
 > A platform to make company global travel and accommodation easy and convenient for the 
 strong workforce of savvy members of staff, by leveraging the modern web.

 ## Usage example

>This App will be the center piece for travelling. 
Travellers will be able to register online and will see accomodation listing, recommended visits place.
travellers will be able to chat in the app
Selected sellers will be able to list their accomodation and other facilitiesl
Travellers will be able to comment


## Technologies used

The project use:  
### Backend
 `Node Express` : the core back end technology  
 `Heroku`: Used to host our app online
 `Es6+` Following ES6 syntax. and AirBnB styling guide  
 `PostgreSQL` Is used as our database management tool  
 `Swagger` Used for API documentation.  
 `Pivotal Tracker` A project management tool used to manage the app.  
 `Npm` Used as the package manager for the app. A fast, reliable, and secure dependency management system.  

### Front end
 `Figma` : Use to protype the User interface  
 `Material UI`: the CSS framework.  
 `React Js`: Front end framework  
 `Redux`: a predictable state container for JavaScript apps.
    
## UI Design
The mockups for the app design can be viewed [here](#)

## REST API Docs
The Api documentation is done using swagger. click [here](#) to View Barefoot Nomad API Documentation

## Tests setup and execution
The project use MOCHA and CHAI for testing.  
All tests are located in `./src/tests/**.test.js`  
To run tests run `npm test`

## Eslint setup and execution
Install VS Code Package `eslint`
run `cmd + ,`.  
type in the search bar `eslint`  
Set eslint to lint `on save`
Set eslint to run `as you type`  

## Installation and usage instructions

* Clone the repository using: `git clone https://github.com/andela/the_spinners-backend.git `  
* Copy the file ***.env.sample*** then rename it to ***.env*** input the right credentials.  
* Run `npm install` To install the project dependencies   
* Run `sequelize db:migrate` To create all tables by running migrations  
* Run `npm dev` To start the application in ***development environment***  
* Run `npm start` To start the application in ***production environment***
* Run `npm test` to run test  
 

## Features
* User can sign up
* User can log in
* User can login with facebook and gmail, 
* User can reset password
* User can edit their profile
* User can implement requests
* admin can approve requests
* User can get travel information
* User can get notifications
* Travel admins can create accomodation facilities
* Pre screened suppliers/hosts should be able to create/add their accommodation facilities
* Users can book an accommodation facility
* Users should be able to provide feedback on accommodation
* Users should get stats of trips made in the last X timeframe
* Users should be able to chat on Barefoot Nomad


## Contributors

ABIZEYIMANA Victor – [@victor-abz](https://github.com/victor-abz)

ISHIMWE Gad - [@gadishimwe](https://github.com/gadishimwe)

IRAGENA Eric - [@ericvand](https://github.com/erickvand)

HARINTWARI Gustave - [@higustave-ops](https://github.com/higustave-ops)

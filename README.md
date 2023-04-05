# Social Media API

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Social Media has taken over the internet and is a large part of many peoples' lives. 

But the few big platforms are not the final say on what social media can be.

The source code in this repository contains everything a social media startup needs to get a NoSQL database off the ground. Users can share their thoughts, make friends, and react to their friend's thoughts.

This application employs an Express.js API that is configured with Mongoose to interact with a MongoDB database. The API routes perform RESTful CRUD operations.

[Walkthrough video](https://drive.google.com/file/d/1EW0QhnfNe03j-kuo7yFPEQtXI66enUj-/view).
  
## Table of Contents
  
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
  
## Installation
This application requires [Node.js](https://nodejs.org/en/download/), and [MongoDB](https://www.mongodb.com/docs/manual/installation/). 

From the command line run the following command, ```npm i```, to install the required packages. 

Start the server with ```npm run start```.

## Usage

Follow these API routes for RESTful CRUD operations:

### GET Requests
```
GET /api/thoughts – returns all thoughts with their associated reactions

GET /api/thoughts/:thoughtId – returns a particular thought searched by ID with its associated reactions

GET /api/users – returns all users

GET /api/users/:userId – returns a particular user by ID with its friends and thoughts fields/arrays populated 

```

### POST Requests
```
POST /api/thoughts – creates a new thought in the database

POST /api/thoughts/:thoughtId/reactions – creates a new reaction to a particular thought, which is found by its ID, in the database

POST /api/users – creates a new user in the database

POST /api/users/:userId/friends/:friendId –  adds one user to another user's friends field/array
```

### PUT Requests
```
PUT /api/thoughts/:thoughtId – updates a particular thought in the database by ID

PUT /api/users/:userId - updates a particular user in the database by ID

```

### DELETE Requests
```
DELETE /api/thoughts/:thoughtId – deletes a particular thought from the database by ID

DELETE /api/thoughts/:thoughtId/reactions/:reactionId – deletes a particular reaction from the database by its reactionID and searching for a particular thought by its ID

DELETE /api/users/:userId - deletes a particular user from the database by ID

DELETE /api/users/:userId/friends/:friendId – deletes one user from another user's friends field/array

```

## Credits
Social Media API using Express.js and MongoDB database by [Morgan Qasabian](https://github.com/mqas1). 
  
## License
This application is covered under the [MIT License](https://opensource.org/licenses/MIT):
        
        Copyright 2023 mqas1

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
         
         
## Contributing
  
The guidelines for contributing to this application can be found at the [Contributor Covenant](https://www.contributor-covenant.org/).

## Tests

Test the routes from the [Usage](#usage) section in [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download).
     
---
  
*This README was made with ❤️ by the [README Generator](https://github.com/mqas1/readme-generator)*
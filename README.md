
<h3 align="center">
  Chat app
</h3>

<p align="center">
  Chat app with an opportunity group messaging
</p>

<img src="https://i.imgur.com/DlorZnR.gif" />

## Demo

[here](https://pensive-lichterman-aa2d6b.netlify.app/)
(currently not working because I reach my Heroku free tier limitations )

## Tech stack
* [Hasura](https://hasura.io/): for Graphql schema and Postgres data manipulation.

  I chose Hasura for this project because it's makes development Graphql schema faster. For side actions hasura provides "actions" that requires side REST api, for this I used Google cloud functions.

* [Google cloud functions](https://cloud.google.com/functions): for side actions such as: JWT authorization.

  I chose GCP functions because it's easier way to provide small REST api than develop express application. But I understand that serverless does not fit to async side effects, like - fetch data)
## Features

* Group messaging
* Multiple conversations
* Search user by username



## How to start locally

Frontend: 

```
1) Clone repo
2) yarn install
3) Create and edit .env file how in .env.example 
4) yarn start
```

Backend: [look at the backend repo](https://github.com/NiFos/chat_app_functions)

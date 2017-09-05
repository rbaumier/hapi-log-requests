# Installation
```
yarn add hapi-log-requests
```

# Usage
```
const logger = console.log.bind(console); // or another logger
server.register([
  require('hapi-log-requests')(logger)
], (err) => {
  if (err) {
    throw err;
  }
  // start your server
});
```

# What is shown
On each request, we log this object:
```
{
  method: "POST",
  id: "1504621919235:blablabla.local:3923:j76p1h63:10000",
  path: "/trips",
  headers: {
    "content-length": 29,
    "host": localhost: 9999,
    "content-type": "application/json",
      // ...
  },
  payload: {
    distance: 62100000000
  },
  response: {
    msec: 22,
    content: {
      message: "Yeah, let's go!!!"
    },
    status: 200
  },
  query: {
    destination: "Mars"
  },
  user: {
    firstname: "Elon",
    lastname: "Musk"
  }
}
```

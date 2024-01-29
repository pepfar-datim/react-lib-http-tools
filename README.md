**NOTE: This repo is no longer in use.  Please use https://github.com/pepfar-datim/javascript-libraries instead.**

# JavaScript Test-friendly Fetch
**Repo Owner:** Ben Guaraldi [@benguaraldi](https://github.com/benguaraldi)


This is a slim layer processing HTTP calls from your front-end to your server.
It comes with:
1. Response caching to make tests ultra-fast
2. Response mocking so you don't have to change server data with each tests. Makes tests so much faster and parallel friendly.
3. Easy switching of users and authentication.

## Installation
```bash
npm i @pepfar-react-lib/http-tools
```

## Usage

### Register server base URL
Before doing any HTTP calls you have to register your server base URL and also provide information in which environment you are (`test`,`development`,`production`). You can simply copy the line below:
```javascript
import {apiInit} from "@pepfar-react-lib/http-tools";

apiInit('http://www.google.com/',process.env.NODE_ENV);
```

### Using GET to retrieve data

Simple GET using a promise:
```javascript
import {getData} from "@pepfar-react-lib/http-tools";

function getUsers():Promise<User[]> {
    return getData('/users').then(users=>{
            //do something
            return users;
        });
}
```

Simple get using `await`:
```javascript
import {getData} from "@pepfar-react-lib/http-tools";

async function getUsers():Promise<User[]>{
    let users = await getData('/users');
    // do something
    return users;
}
```

### Mocking server response during tests
Now imagine you are writing a test and no matter what's in the database you want the result of GET from `/users` to return two exact objects. It's as simple as:
```javascript
import {registerGetMock} from "@pepfar-react-lib/http-tools";

const mockedResponse = [{name: 'John', name: 'Bob'}];

test('Should receive two users', async ()=> {
    registerGetMock('/users', mockedResponse);
    // now you can test your app and when your front-end code queries `/users` it will receive the `mockedResponse` from above
    screen.getByText('John');
    screen.getByText('Bob');
});
```

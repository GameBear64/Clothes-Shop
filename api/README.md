# Generic backend

## Features

### Throttling

This server has spam protection on all routes, allowing 10 requests per second. By default, throttling is done on a per ip-address basis.

> Some routes have stricter spam policies like the `/register` and `/login`

If you reach the requests limit on any of the rotes the server will start returning `[429] Too Many Requests` until the period resets

### Validation and sanitization

Joi validation is used to validate all incoming data such as the `body`, the `parameters` and `query parameters`. Each route has different validations.

When a field is invalid the server will return `[400] Bad Request` and the validation error.

All `body fields` are being `trimmed`, `escaped` and every `string number` is tested and converted to number type. This sanitization is recursive meaning it works on any level of nesting

### Encryption and storage

Encryption is made possible by `bcrypt-js` ensuring encryption on all platforms (tested on Windows and Linux). Passwords go trough 10 rounds of salting and only the hash is being stored.

> This means the server does not know your password!

The database is a simple folder filled with json files. The email is hashed and that determines the name of the file. These names are treated as the user IDs. This is similar to a hashmap which is very fast. : \)

> All emails must be unique!

## Routes

### Authorization

All routes require a `jwt` header unless specified otherwise!

- If a `jwt` is valid but no user was found it will return a `[401] Unauthorized` error with the message:  
  `The user belonging to this token no longer exist.`
- If no `jwt` was provided or the token was invalid it will return a `[401] Unauthorized` error with the message:  
  `Not Authorized`
- If the token is valid but the route and method are incorrect, the server will return a `[404] Not Found`.
- If everything is correct but you have "spammed" the server, the server will return `[429] Too Many Requests`
- If something else happens the server will return a `[500] Internal Server Error` with a stack trace. Save the stack trace and debug.

---

### `/register` <u>[POST]</u>

> No auth route

> Accepts Body:
>
> ```json
> {
>   "name": "GamBar",
>   "email": "gam@bar.com",
>   "password": "abc123xyz",
>   "confirmPassword": "abc123xyz"
> }
> ```

Returns:

- [400] - Validation error
- [409] - User with this email already exists
- [201] - JWT token

---

### `/login` <u>[POST]</u>

> No auth route

> Accepts Body:
>
> ```json
> {
>   "email": "gam@bar.com",
>   "password": "abc123xyz"
> }
> ```

Returns:

- [400] - Validation error
- [403] - Incorrect password
- [404] - User with this email does not exist
- [200] - JWT token

---

### `/resetpassword` <u>[PATCH]</u>

> Accepts Body:
>
> ```json
> {
>   "password": "abc123xyz",
>   "newPassword": "b3tt3rP4ss",
>   "confirmPassword": "b3tt3rP4ss"
> }
> ```

Returns:

- [400] - Validation error
- [403] - Incorrect password
- [200] - no return, password gets changed

---

### `/user` <u>[GET]</u>

Check if user exists and returns user details

Returns:

- [401] - Unauthorized
- [200]

```json
{
  "id": "2cb4ff90",
  "name": "Gamriel",
  "email": "gam@bar.com"
}
```

---

### `/user` <u>[PATCH]</u>

> If email is changed the JWT needs to be updated

> Accepts Body:
>
> ```json
> {
>   "name": "Gamriel",
>   "email": "gamriel@bar.com"
> }
> ```

Returns:

- [400] - Validation error
- [200] - no return, name/email gets changed

---

### `/user` <u>[DELETE]</u>

> Accepts Body:
>
> ```json
> {
>   "password": "abc123xyz"
> }
> ```

Returns:

- [400] - Validation error
- [403] - Incorrect password
- [200] - no return, password gets changed

---

### `/products` <u>[GET]</u>

Returns an array of all products

- [200]

```json
[
  {
    "id": 000,
    "name": "Product name",
    "category": "category name",
    "price": 99.99,
    "material": "Material description"
  },
  {...},
  {...},
  {...},
  {...}
]
```

---

### `/products/[id]` <u>[GET]</u>

Returns a single product that you specify

- [200]

```json
{
  "id": 000,
  "name": "Product name",
  "category": "category name",
  "price": 99.99,
  "material": "Material description"
}
```

---

### `/history` <u>[GET]</u>

Returns a purchase history of the logged in user

- [200]

```json
{
  "timestamp": [{ "id": "itemID", "q": 1 }],
  "timestamp": [
    { "id": "itemID", "q": 3 },
    { "id": "itemID", "q": 5 }
  ]
}
```

---

### `/checkout` <u>[POST]</u>

Adding to purchase history

> Accepts body:
>
> ```json
> {
>   "items": [
>     { "id": "item5", "q": 1 },
>     { "id": "item1", "q": 7 }
>   ]
> }
> ```

- [400] - Validation error
- [200] - no return, adds items to history at current time stamp

---

# Generic backend

## Features

### Throttling

This server has spam protection on all routes, allowing 10 requests per second. By default, throttling is done on a per ip-address basis.

> Some routes have stricter spam policies like the `/register` and `/login`

If you reach the requests limit on any of the rotes the server will start returning `[429] Too Many Requests` until the period resets

### Validation and sanitization

Joi validation is used to validate all incoming data such as the `body`, the `parameters` and `query parameters`. Each route has different validations.  
![image](https://github.com/GameBear64/Clothes-Shop/assets/33098072/b2efe0be-2bc0-4064-9ba8-2c7da20afb7d)

When a field is invalid the server will return `[400] Bad Request` and the validation error.

All `body fields` are being `trimmed`, `escaped` and every `string number` is tested and converted to number type. This sanitization is recursive meaning it works on any level of nesting

### Encryption and storage

Encryption is made possible by `bcrypt-js` ensuring encryption on all platforms (tested on Windows and Linux). Passwords go trough 10 rounds of salting and only the hash is being stored.  
![image](https://github.com/GameBear64/Clothes-Shop/assets/33098072/e999fe0a-a9f9-423d-89d0-4579f8ea8a85)

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

### `/image/[id]?size=000` <u>[GET]</u>

> No auth route

All images are accessible to everyone. Image IDs can be found on the posts responses.

The size query is optional. If it is defined it can only be up to 500. This should be used for generating thumbnails to optimize network traffic.

- [400] - Validation error
- [404] - No image with this ID found.
- [200] - Content of type `image/jpg` is send.

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
- [200] - no return, user is deleted

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

- [404] - Product not found
- [200]

```json
{
    "id": 000,
    "name": "Product name",
    "category": [
        "men",
        "shirt",
        "pants",
        "top"
    ],
    "price": 199.99,
    "description": "Product description",
    "image": [ "1-1", "1-2", "1-3", "1-4", "1-5"],
    "isFavorite": true,
    "comments": [
        {
            "name": "Gam",
            "authorId": "2cb4ff90",
            "text": "Comment text",
            "rating": 4,
            "date": 1706627261
        }
    ]
}
```

---

### `/products/[id]/favorite` <u>[POST]</u>

Add or remove item form your favorites. This route does not check if the product exists.

- [200] - `true` if it has been added, `false` if it has been removed

---

### `/wishlist` <u>[GET]</u>

Get all items from your favorites.

- [200] - Array of products, same as the single product above.

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

### `/comment/[id]` <u>[POST]</u>

Allows you to post a comment on a product given the id.

> Accepts body:
>
> ```json
> {
>   "text": "Comment body",
>   "rating": 5,
> }
> ```

- [400] - Validation error
- [201] - Comment is created and timestamped.

---

### `/comment/[id]` <u>[PATCH]</u>

Allows you to edit a comment you own. All fields are optional.

> Accepts body:
>
> ```json
> {
>   "text": "Comment body",
>   "rating": 5,
> }
> ```

- [400] - Validation error
- [404] - Comment not found or you do not own it.
- [200] - Comment is updated. The time stamp stays the same.

---

### `/comment/[id]` <u>[DELETE]</u>

Allows you to delete a comment on a product given the id.

- [404] - Comment not found or you do not own it.
- [200] - Comment is deleted.

---

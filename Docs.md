# Features

## Themes

There are theme options in the settings  
![ThemeSetting](https://github.com/GameBear64/Clothes-Shop/assets/33098072/cb81a839-57c2-4408-a865-68c29fb4a4ae)
![themes](https://github.com/GameBear64/Clothes-Shop/assets/33098072/e34bc56b-0b50-454c-a592-c90848061420)

The theme is stored in the local storage, if there is no theme saved it will used the default light mode blue theme. The theme is accessible throughput the app using vue's reactive proxy object (similar to a signal)  
![image](https://github.com/GameBear64/Clothes-Shop/assets/33098072/1ac6fcd1-06fc-42da-8590-a02ef3d4ab04)

## Local Storage

In the local storage you can find the theme settings along with the JWT.
The jwt key name is configured in the `.env` file under the variable `VITE_LOCAL_STORAGE_NAME`. This has been abstracted to ensure consistency and maintainability since it is used in a couple of important places.  
![image](https://github.com/GameBear64/Clothes-Shop/assets/33098072/490f109d-b570-4abf-843e-c8d9b10b2051)

## State management

- **Global state management** is handled by vue's reactive proxy object separated in a different file allowing us to avoid downloading extra dependencies.  
![image](https://github.com/GameBear64/Clothes-Shop/assets/33098072/a3022f18-1f2e-4866-a261-f6e097be2060)

- **Local state management** is handled by vue's provide and consume functions. Variables can be provided across all children and consumed by some. Vue's reactivity allows us to update the function without worrying if it will update in the consumed children (because it will).

- **Component state management** is handled by vue's ref object. This is just a component level mutable variable.

# Validation

![image](https://github.com/GameBear64/Clothes-Shop/assets/33098072/38b8df10-a808-4bc8-a357-680235afb565)  
All form validations on the front end are handled by [Vuelidate](https://vuelidate-next.netlify.app/)

# Custom forms

Using custom components for the inputs allows us to abstract the styles, positioning, theming, and binding of the input elements.  
![image](https://github.com/GameBear64/Clothes-Shop/assets/33098072/3d5509cd-3257-4a81-b16b-0066746bd0c3)

# Api calls

The api calls in this project are handled in an unconventional way. Usually people make a `serveces.js` file or they somehow abstract it, sometimes with multiple wrappers.
In this app the requests are handled by a single function called `useFetch` and handled in the respective component. Want to see the comment edit endpoint? Go to the comment component.
This decision was made in order to keep the app simple.

The `useFetch` function handles error codes. If it encounters a `401 [Unauthorized]` error it will log out the user (delete the jwt from local storage) and redirect them to a login page along with a standard error popup.
If it encounters any other error it will only be displayed as an error popup.
All other requests are executed normally and the result is passed as a promises.  
  
This function also handles authentication. By default it will include a `jwt` header and depending on a boolean (`requireAuth`) it will include the jwt token saved in the local storage under the environment variable `VITE_LOCAL_STORAGE_NAME`

## Images

Images are a bit tricky. Instead of fetching them as hex data the server provides them as a standalone image that can be displayed in the browser.  
Check the back-end documentation for more details.

# Routing

The router is very simple yet powerful. It has 3 main responsibilities:

- **Lazy loading** - This ensures the routes are loaded only when needed.
- **Active route detection** - This keeps track of the currently active route and if the page has a link to it, it will apply custom styles. `border-b border-primary`
- **Auth** - Before each navigation the router checks if the jwt is present in the local storage. This is enough to authorize the user since `useFetch` will delete any invalid JWTs. Some routes are excluded from this check.

# Internal configuration

The project is build using Vite which handles all the building.

On top of that `vite-plugin-compression` is installed to help with file sizes. If there are any huge ones.  
Manual chunks are used to slice up the `node_modules` dependencies. This sends each dependency separately and allows the client to download them concurrently instead of all at once increasing performance in some cases.

A quality of life configuration is the aliases that are set up `@components`, `@views`, `@form`, `@utils`. This allows us easier imports for commonly used functions and components.  
Another quality of life configuration is the `eslint` setup we have. On top of some rules like `no-unused-vars` we have automatic import sorting and automatic tailwind class sorting to make the code more consistent.

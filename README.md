# Events App UI

## Flow for User Registration and User Login
For JWT – Token based Authentication with Web API, we’re gonna call 2 endpoints:
- POST `api/auth/signup` for User Registration
- POST `api/auth/signin` for User Login

You can take a look at following flow to have an overview of Requests and Responses that Angular 10 Client will make or receive.

![angular-11-jwt-authentication-flow](angular-11-jwt-authentication-flow.png)

This app allows you to create, handle and interact with events created by you or other users.

Used `socket.io` for socket management in client side.

Run `npm install` for installing dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
# ToeflUzbekAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Change environment.ts file with this code if you want to test backend locally.
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  // apiUrl: 'https://api.toefl-test.uz',
};
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Authentification
```typescript
this.authenticationService.isLoggedIn()
```

this code checks if user logged

token.interceptor.ts automatically adds token to every request

under services folder we have login register functions

## Backend
Backend written in expressJs

add .env file:
```env
email=noreply@toefl-test.uz
emailpassword=8FZ4o5W7ku
url=http://localhost:8080
webUrl=http://localhost:4200
```

also db.config.js file: (DONT PUSH THIS)
```javescript
module.exports = {
  HOST: "95.46.96.13",
  USER: "toefltes_api_acess",
  PASSWORD: "*****",
  DB: "toefltes_db"
};
```

Run code locally:
```bash
npm run localStart
```

account.routing.js has endpoints
account.controller.js has functions

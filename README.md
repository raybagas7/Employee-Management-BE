# Employee Management

Backend for employee management, consisting of admin and regular employees.

- Admin has more authority to manage other employees.
- Attendance for each account (Check-in and Check-out).
- Admin can create new regular employee account.

## Documentation

- [Postman Documentation](https://documenter.getpostman.com/view/20860825/2s9YypFNwe#ee332874-e874-4b74-b0a5-e326d029552c)

## Run Locally

Clone the project

```bash
  git clone https://github.com/raybagas7/Employee-Management-BE.git
```

Go to the project directory

```bash
  cd Employee-Management-BE
```

Install dependencies

```bash
  npm install
```

Environment variable

```bash
  cp .env.example .env
  follow the .env.example and fill every variable with your local Environment without quote/double quote
```

Migrate database

```bash
  npm run migrate up
```

Running the Server Locally

```bash
  npm run start:dev
```

Running the Server in Production

```bash
  npm run start:prod
```

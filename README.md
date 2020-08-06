# Employee Management Application

A web application that allows employees to submit feedback toward each other's performance review.

# Demo

[link](https://still-gorge-51871.herokuapp.com/)

## Technologies used

### /Client/

- React, Redux, React Hooks

### /Server/

- Node, Express, MongoDB

## Assumptions

1. Functional

- A user can login or register a new account specifying its role (Admin or normal user).
- All users can create/edit their own profiles and Admin can create new employees' accounts and profiles.
- Admin can view/add/edit/delete employee profiles.
- Admin can view/add/update/delete performance reviews created by itself.
- Admin can assign one employee to give feedback on other employee's performance review.
- Normal user cannot add/update/delete performance reviews.
- Normal user can view list of performance review assigned to them.
- Normal user can submit multiple feedbacks to a performance review.
- Normal user can view other employees' profiles.

2. Data design

- Employee can have multiple performance reviews from same or different Admins
- Employee can reveive multiple Feedback Requests
- One performance review can have many Feedbacks from same or different employees
- Each feedback to a performance review has a reviewer name, content, and date

# Finished Tasks

### /client/

1. Login and authentication
2. Create Account
3. View/Add/Update Employee profiles
4. View/Add/Update/Delete Performance reviews
5. View/Add/Delete Feedbacks
6. ADMIN and Employee View
7. Unit tests for reducer/ integration tests for reducers & action creators & Components

### /server/

1. Login and authentication
2. CRUD employee profiles
3. CRUD performance reviews
4. CRUD feedbacks

# Pending Tasks

1. Server side testing (integration tests & unit tests)

# Interview Scheduler

## Description

An app for scheduling interviews built using React JS.

It shows the days on the sidebar. Selecting a day from the sidebar shows the time slots (empty or taken) for the day.

!["Main Page with Empty slots"](https://github.com/ahsanirfan85/scheduler/blob/master/docs/01_Main-Page.png?raw=true)

To add an appointment, click on the + image. A form will open up for you to enter your name and select your interviewer.

!["Form to Enter New Data"](https://github.com/ahsanirfan85/scheduler/blob/master/docs/02_Form(CREATE).png?raw=true)

When you click save, you return to the main page that shows you taken slot.

!["Main Page with Taken Slot"](https://github.com/ahsanirfan85/scheduler/blob/master/docs/04_Form-Filled.png?raw=true)

Hovering over it will reveal the edit and delete buttons.

Clicking on the delete button will ask you to confirm deletion.

!["Deleting an Appointment"](https://github.com/ahsanirfan85/scheduler/blob/master/docs/05_Delete-Confirmation.png?raw=true)

Clicking on the edit button will allow you to change your information.

!["Form to Edit Data"](https://github.com/ahsanirfan85/scheduler/blob/master/docs/03_Form(Datat-Entered).png?raw=true)

## Setup

Install dependencies with `npm install`. The following dependencies will be installed:
- axios v0.26.1
- classnames v2.2.6
- normalize.css 8.0.1
- React v16.9.0
- React DOM v16.9.0
- React Scripts v3.0.0

For testing, install dev dependencies with `npm install --only=dev`. The following dev dependencies will be installed:
- @babel/core v^7.4.3
- @storybook/addon-actions v5.0.10
- @storybook/addon-backgrounds v5.0.10
- @storybook/addon-links v5.0.10
- @storybook/addons v5.0.10
- @storybook/react v5.0.10
- @testing-library/jest-dom v4.0.0
- @testing-library/react v8.0.7
- @testing-library/react-hooks v7.0.2
- babel-loader v8.0.5
- node-sass v4.14.0
- prop-types v15.8.1
- react-hooks-testing-library v0.6.0
- react-test-renderer v16.9.0

This app requires the use of an API that allows the app to connect to a database. To install and setup this API, please visit [https://github.com/ahsanirfan85/scheduler-api](https://github.com/ahsanirfan85/scheduler-api)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
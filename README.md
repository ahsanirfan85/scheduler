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

Install dependencies with `npm install`.

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
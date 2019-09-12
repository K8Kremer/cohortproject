# Cohort Project - Project Shift Developer Concierge 
## Authors
Kate Kremer, Nathaniel Poli, Sean Dolan, Daniel Posse, Kyle Kimber, Jake Galligan, Krisitna Bender, Byron Glaspy, Ronnie Scott

## Introduction
This project was developed by students at Project Shift Software Engineering Fellowship. This is a full stack application designed to aid in employment by allowing for agencies to send unique packages of potential employees to employers, as well as manage the status and content of both packages and students.

## Installation
1. To begin the server navigate to the server directory. (/server) and from the command line run
```bash
npm install
node server.js
```
2. To begin the client side of the application navigate to the client directory. (/client) and from the command line run
```bash
npm install
npm install
```
## Features

### Admin Side 
The admin side allows the administrator to get a list of current/past students and view specific information in regards to them. Individual students can then be added to packages to be sent to employers. The administrator can then update packages with notes on students, add and delete students, as well as view whether or not the package has been viewed by an employer. New students can also be added to the database with the ability to upload photos and files relevant to the student.

### Employer Side
The employer side of the application allows for emploeyrs to view a specific package directed for them, indlcuding notes about the package as a whole as well as personalized notes for each student, who the apckage is coming from, and a list of students within the package. Employers can then click on each specific student and view a student's personal profile full or rich data about the background/skillset of each student.

## Notes
1. The file tree was structured in such a way as a specific approach to deploying the application to heroku.

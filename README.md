
# QA Cinema Project

This is the final project of the 22FebEnable3 cohort (Team Air) and the goal was to create a
full stack web application for a client called QA Cinemas

This is the back-end of the application and is a fully functional fetch API that has the necessary
routes to process the fetch requests from the front-end and interacting with a MongoDB database or sends
emails (for the contact form).

The front-end can be found here: https://github.com/Mohab-Khalifa/QA-Cinema-Project-FrontEnd

The Jira planning board for this project can be found here: https://mohabk.atlassian.net/jira/software/projects/FPC/boards/7/roadmap



## Installation

For this project you will need:

 - NodeJS which can be found here: https://nodejs.org/en/download/
 - MongoDB which can be found here: https://www.mongodb.com/try/download/community
 - Access to a terminal to run npm commands

Then downloading from this repository:
```bash
  git clone https://github.com/Mohab-Khalifa/QA-Cinema-Project-BackEnd
```


Install the needed node packages using node package manager
```bash
  npm install
```


## Running the API

Simply use the following command:

```bash
  npm start
```

The console should look something like this:

![Screenshot](https://user-images.githubusercontent.com/100779521/170702776-073df47f-8e07-4d14-8fa7-32f659e007ab.PNG)



## Adding movie and release entries

Simply send a post request with the following url and body format:


![Post-Movie](https://user-images.githubusercontent.com/100779521/170713949-2969fd30-b7c5-418d-88cf-9700463c4246.PNG)

This can be done similarly for releases by changing the 'movie' to 'newrelease' in the url


## Removing movie and release entries

Simply send a delete request the following url and swapping 'movie-id-here' for the id of the movie you wish to delete:

![delete](https://user-images.githubusercontent.com/100779521/170714680-17d7eea9-f32e-452c-939b-608456e56e75.PNG)


## Adding a screening time to a movie

Simply send a put request with the following url and body format (swapping 'movie-id-here' for the id of the movie you wish to update):

![posttiming](https://user-images.githubusercontent.com/100779521/170715055-f3f84805-ed0b-4f2c-a41f-f42bb0daf4c2.PNG)



## Authors!


- [@Callum-Robinson](https://github.com/Callum-Robinson)
- [@Allister-Gardner](https://github.com/awggardner)
- [@Mohab-Khalifa](https://github.com/Mohab-Khalifa)
- [@Salah-Salah](https://github.com/SalahS49)


## Acknowledgements

 - Morgan Walsh for the support throughout the project
 - [GeeksforGeeks](https://www.geeksforgeeks.org/) for some helpful node tutorials
 - [Nodemailer Documentation](https://nodemailer.com/about/) for some useful information on using nodemailer


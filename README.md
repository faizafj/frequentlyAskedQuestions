Project settings: make sure **protect dynamic ports** is switched off.

To run the project:

```
$ deno run --allow-all --unstable index.js
```

## Accounts

The system comes pre-configured with an account:

- username: `doej`
- password: `p455w0rd`

You can use the registration option to create more accounts.

The secure page allows you to upload files to the server, this will need to be replaced with the functionality required by your assigned topic.



# Herkou website Link:

## https://frequenltyaskedquestions.herokuapp.com/#allQuestions


# Topic: 
Frequently Asked Questions website
## Completed: 
Stage-one-part-three functionality





# The core functionality consists of three screens: 

Part 1
Users don't need to be logged in to view the homepage however if they are logged inthere should be an Add question button or link that takes users to a screen where they can ask their own questions. They should supply:

- A brief title
- A short multi-line summary of no more than 200 characters.
- A detailed, formatted, multi-line description of the question. This should support the use of markdown formatting.
- an optional image (screenshot or photo) that should be uploaded from their computer.
- In addition, the following data should be captured without the user needing to enter it:
- The username of the person asking the question.
- The date and time when the question was posted.


Part 2
The home screen should display a list of the questions that users have asked. This should include:

- The title
- The short multi-line summary.
- The username of the person asking the question.
- The date (but not the time) when the question was posted.


Part 3
If the user clicks on one of the titles on the homepage they should be taken to a Details page which includes the following features:

- The title
- The short multi-line summary.
- The detailed, formatted, multi-line description of the question with markdown formatting converted to html.
- The image (screenshot or photo) if supplied.
- The username of the person asking the question.
- The date (but not the time) when the question was posted. 
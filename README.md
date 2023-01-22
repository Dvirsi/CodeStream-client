# CodeStream

CodeStream is a real-time code collaboration tool for mentors and students.
Users can find different tasks on the platform's lobby page, and enter the task room by clicking its card.
Tasks are available in 3 different levels: Easy, medium, and hard.
Students need to solve the task by editing the code block, while mentors can see the code in real-time.

Technical Details
CodeStream is built using the MERN stack (MongoDB, Express.js, React, Node.js).
The server is hosted on Heroku. The client is hosted on Netlify.
Socket.io is used for real-time code updates.
react-syntax-highlighter is used for syntax highlighting.

Features
Mentor: The first user to enter a task will be designated as the mentor.
Mentors can view the code in read-only mode, and view the changes in real time.
Mentors have to stay logged in for the entire session, and can only be re-assigned upon entering an empty room.
Students: Every user to enter the task after a mentor is assigned will be a student.
A Student needs to solve the task by editing the code.
All users are notified, with a big smiley face, when the correct solution is provided.

code-stream-moveo.netlify.app

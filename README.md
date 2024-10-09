# Chatbot App

## Description

* Chatbot App -> backend (NodeJs), frontend(ReactJs), DB(MongoDb)
* UI component library is Material UI
* I have use Open AI for generate new questions


* --Sample images app--
  
<img width="1252" alt="image-1" src="https://github.com/user-attachments/assets/02053861-1d0a-4f8c-8e20-b400b5810d8c">
<img width="1496" alt="image-2" src="https://github.com/user-attachments/assets/d92c1f32-5b96-4f7c-bd94-718fd652bb3c">
<img width="1497" alt="image-4" src="https://github.com/user-attachments/assets/e748ef40-b19b-4d5a-9dd5-45cc7aa897c6">
<img width="1495" alt="image-3" src="https://github.com/user-attachments/assets/979a1e0d-6d0f-48f6-a7c8-4b7c29039488">




## Getting Started

### Installing

* For backend you just install npm and run command npm start.
* For frontend "npm install" then "npm start" commands will fire app.
* I have share db schema with images.

### Usage

App logic ask 10 questions become with document after that Open AI generate new questions.
These new questions should be added questions table. Session table shows question id and answer text.
End session info should be added in table after destroy session (browser tab closed). 

# ATI
Arduino Test Interface

This project, as the title states, is a test interface for an Arduino board.
The interface is a web interface. Not so much to test the board itself but mainly
to test sensors, motors, inter-board communication, potentiometers etc.
The interface will expose all the digital and analog pins. A way to control them:
- read from inputs
- write to outputs
- switch pins from output to input

In the first iteration we will use:
- an Arduino Uno
- NodeJs
   - Javascript environment
- Express / EJS / D3
   - easy web content service and graph lib
- JohnnyFive
   - easy access to the board
- For detail about the basic setup see https://github.com/gjgjwmertens/LedBlinkJohhny5

##Project setup
###GitHub
- login to GitHub and create a new repo
- clone the new repo locally on Rpi
   - /home/pi/Documents/Projects/ATI
      - remove extra ATI dir if necessary, cloud have cloned the repo directly into the Projects
       dir without creating the ATI dir first

###Directory structure
- I use PhpStorm IDE for easy development on a Windows machine
   - create directory structure on development pc
      - make dir D:\Projects\Electronica\Projects\ATI\
         - sub dir PhpStorm
            - the IDE files will reside here
         - sub dir Code
            - gitHub files, not really needed here but still
- The web interface code will run on a Raspberry Pi 3
   - create directory structure here as well
   - /home/pi/Documents/Projects/ATI
      - lib
      - public
         - img
         - css
         - js
      - routes
      - views
         - templates
   
###PhPStorm
- Create New Project from existing code
   - Web server is on remote host, files are accessible via FTP/SFTP/FTPS
   - Project name: ATI
   - Project local path: D:\Projects\Electronica\Projects\ATI\PhpStorm
   - Deployment options: default
      - Change later in Settings - Deployment - Options
         - set Upload changed files automatically to always
   - I have Rpi 12 already setup as a remote host so I can use it
      - sftp://20.0.0.112:22
      - http://20.0.0.112:3000
      
###NodeJS
- cd /Documents/Projects/ATI
- npm init
- npm install ... (see package.json)

###Configuration
- add  "start": "nodemon -e js,ejs,css app" to package.json
- initialize project with the index route from https://github.com/gjgjwmertens/LedBlinkJohhny5
- run: npm start (check that everything works)
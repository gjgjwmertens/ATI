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
- Express
   - easy web content service
- JohnnyFive
   - easy access to the board

##Project setup
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
   
###GitHub
- login to GitHub and create a new repo
- clone the new repo locally on Rpi
   - /home/pi/Documents/Projects/ATI
      - remove extra ATI dir if necessary, cloud have cloned the repo directly into the Projects
       dir without creating the ATI dir first
       
###PhPStorm
- Create New Project from existing code
   - Web server is on remote host, files are accessible via FTP/SFTP/FTPS
   - Project name: ATI
   - Project local path: D:\Projects\Electronica\Projects\ATI\PhpStorm
   - Deployment options: default
      - Change later in Settings - Deployment - Options
   - I have Rpi already setup as a remote host so I can use it
      - sftp://20.0.0.112:22
      - http://20.0.0.112:3000
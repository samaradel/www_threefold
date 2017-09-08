## Pre-requisites

- install bash tools:

https://github.com/Jumpscale/bash

```bash
ZInstall_docgenerator
```

## get the threefold web code

```bash
#login into created docker
ZSSH 
#get this code
js9_code get --url ssh://git@docs.greenitglobe.com:10022/ThreeFold/www_threefold2.0.git
```

## if you want to expose website externally

```bash
#install grok
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
mv ngrok /usr/local/bin/
rm -f ngrok*
cd /opt/code/docs/threefold/www_threefold2.0
```

sign up with ngrok
go to

- https://dashboard.ngrok.com/get-started

instructions are there

```
ngrok authtoken ...yourtoken...
#start next in a tmux session
ngrok http 443
```

you will see something like

```
...
Forwarding                    https://ca518f09.ngrok.io -> localhost:443
...
```

this shows you the adddress to use






## start the website


 - Run command ```caddy``` from within www_threefold2.0.git directory



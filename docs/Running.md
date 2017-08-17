## Pre-requisites

**Install Go programming language**
- ```wget -c https://storage.googleapis.com/golang/go1.8.3.linux-amd64.tar.gz```
- ```tar -C /usr/local -xzf go1.8.3.linux-amd64.tar.gz```
- ```mkdir -p ~/go/src```
- ```mkdir -p ~/go/bin```
- Edit ```/etc/profile``` and append ```export PATH=$PATH:/usr/local/go/bin:~/go/bin```
- open up another terminal than current one, and try the command ```go``` it should work

**Install git**
- ```apt-get install git```

**Install [hugo](https://gohugo.io)**

[hugo](https://gohugo.io) is a framework for static files generation

- ```go get -v github.com/gohugoio/hugo```
- ```go get -u -v github.com/gohugoio/hugo```


**Install [caddy](https://github.com/mholt/caddy)**

A Fast, cross-platform HTTP/2 web server with automatic HTTPS

- ```go get -u -v github.com/mholt/caddy```

**Install required [caddy](https://github.com/mholt/caddy) plugins**

We use [Caddyman](https://github.com/itsyouonline/caddyman) which is a simple
caddy server manager that allows us to install plugins

- ```git clone https://github.com/itsyouonline/caddyman```
- ```cd caddyman```
- ```chmod u+x caddyman.sh```
- Install [Caddy git plugin](https://github.com/abiosoft/caddy-git) ```./caddyman.sh install git```
- Install [Caddy IYO plugin](https://github.com/itsyouonline/caddy-integration) ```./caddyman.sh install iyo```

**Run Threefold website locally**

- You need to have SSH access to [Website repo](https://docs.greenitglobe.com/ThreeFold/www_threefold2.0)
    -  ```ssh-keygen -t rsa -b 4096 -C "hamdy.a.farag@gmail.com"```
    - ``` apt-get install xclip```
    - Copy public key ```xclip -sel clip < ~/.ssh/id_rsa.pub```
    - Open ```https://docs.greenitglobe.com/user/settings/ssh``` then cliek *add key* then paste & save.

- ```git clone ssh://git@docs.greenitglobe.com:10022/ThreeFold/www_threefold2.0.git```
- ```cd www_threefold2.0/```
- Edit ```Caddyfile``` add the following directive which enables
    [IYO](https://itsyou.online) support, and don't forget to change client_id & client_secret

```
    oauth {
            # itsyou.online client ID
            client_id       mylab

            # itsyou.online client secret
            client_secret   fHfT3yBlZXlNRAbOSVw-PLZI2y9HgqcA0IVzXXXXXXXXXXXXXXX

            # oauth auth url
            # leave it blank for default value
            # default value : https://itsyou.online/v1/oauth/authorize
            auth_url        https://itsyou.online/v1/oauth/authorize

            # oauth2 access token URL
            # leave it blank for default value
            # default value : https://itsyou.online/v1/oauth/access_token
            token_url       https://itsyou.online/v1/oauth/access_token

            # oauth2 redirect URL
            redirect_url    http://localhost:2015/_iyo_callback

            # Organizations allowed to access the protected paths
            # leave it blank if you want to ignore it
            organizations   /developer  mylab.developer
            organizations   /manager    mylab.manager

            # usernames allowed to access this protected paths
            # leave it blank to allow all usernames
            # - each username need to be separated with `,`
            # - you can specify it in multiple lines
            usernames       /manager    iwan

            # Everyone is allowed to access this path but authentication is required.
            # It is possible to specify this multiple times.
            authentication_required /

            # login_page to which the user will be redirected when trying to access authentication_required pages
            # leave blank if you need the users to be redirected to IYO page directly
            login_page  /login

            # login url is the URL that will redirect the user to itsyou.online login page
            # it can be used if you need to create login button
            login_url   /oauth
        }
 ```
 - Run command ```caddy``` from within www_threefold2.0.git directory



At the moment the caddy is working under Be-gen-1 system. 

The VM id is the following, 
https://be-gen-1.demo.greenitglobe.com/g8vdc/#/edit/68

Access currently for the ssh is given to me, David, Mohamed Galal and Kristof. 

The caddy configuration is the following

```

http://new.threefoldtoken.com:88 {
    bind 0.0.0.0
    gzip
    root   www.threefoldtoken.com/en

    git {
        repo ssh://git@docs.greenitglobe.com:10022/ThreeFold/www_threefold2.0.git
        branch master
        interval 60
        key ~/.ssh/id_rsa
        path ../..
        then hugo -s  www.threefoldtoken.com
    }
    errors {
    	404 404.html # Not Found
    }
    oauth {
         # itsyou.online client ID
         client_id       threefold

         # itsyou.online client secret
         client_secret   Pb5LV6eoQqqdJx_x2kIOFe7BA5xOLGxZaBaFO1_2HggGyK4GAj3x

         # oauth auth url
         # leave it blank for default value
         # default value : https://itsyou.online/v1/oauth/authorize
         auth_url        https://itsyou.online/v1/oauth/authorize

         # oauth2 access token URL
         # leave it blank for default value
         # default value : https://itsyou.online/v1/oauth/access_token
         token_url       https://itsyou.online/v1/oauth/access_token

         # oauth2 redirect URL
         redirect_url    http://new.threefoldtoken.com/oauth/callback

         # Organizations allowed to access the protected paths
         # leave it blank if you want to ignore it
         # organizations   /developer  mylab.developer
         # organizations   /manager    mylab.manager
         # usernames allowed to access this protected paths
         # leave it blank to allow all usernames
         # - each username need to be separated with `,`
         # - you can specify it in multiple lines
         # usernames       /manager    iwan

         # Everyone is allowed to access this path but authentication is required.
         # It is possible to specify this multiple times.
         authentication_required /
         allow_extension css
         allow_extension js
         allow_extension png
         allow_extension svg
         allow_extension ico
         allow_extension ttf?v=4.7.0
         allow_extension woff2?v=4.7.0

         login_page	/login
         login_url	/oauth

       }
}```
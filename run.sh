set -ex
rm -rf  www.threefoldtoken.com/en/
/opt/go_proj/bin/hugo -s www.threefoldtoken.com
caddy
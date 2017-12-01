#!/usr/bin/env bash
set -e

python3 www.threefoldtoken.com/data/www_threefold/data/scripts/providers.py
python3 www.threefoldtoken.com/data/www_threefold/data/scripts/community.py

cp www.threefoldtoken.com/data/www_threefold/web/*.js ../www_threefold2.0/www.threefoldtoken.com/themes/landing/static/js
cp www.threefoldtoken.com/data/www_threefold/data/community/avatars/processed_* ../www_threefold2.0/www.threefoldtoken.com/themes/landing/static/avatars
cp www.threefoldtoken.com/data/www_threefold/data/*.js ../www_threefold2.0/www.threefoldtoken.com/themes/landing/static/js
cp www.threefoldtoken.com/data/www_threefold/web/js/*.js ../www_threefold2.0/www.threefoldtoken.com/themes/landing/static/js
cp www.threefoldtoken.com/data/www_threefold/web/*.css ../www_threefold2.0/www.threefoldtoken.com/themes/landing/static/css

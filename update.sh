#!/usr/bin/env bash
set -e

#python3 www.threefoldtoken.com/data/content/scripts/providers.py
python3 www.threefoldtoken.com/data/content/scripts/community.py

cp www.threefoldtoken.com/data/web/*.js ../www_threefold/www.threefoldtoken.com/themes/landing/static/js
cp www.threefoldtoken.com/data/content/community/avatars/processed_* ../www_threefold/www.threefoldtoken.com/themes/landing/static/avatars
cp www.threefoldtoken.com/data/content/*.js ../www_threefold/www.threefoldtoken.com/themes/landing/static/js
cp www.threefoldtoken.com/data/web/js/*.js ../www_threefold/www.threefoldtoken.com/themes/landing/static/js
cp www.threefoldtoken.com/data/web/*.css ../www_threefold/www.threefoldtoken.com/themes/landing/static/css

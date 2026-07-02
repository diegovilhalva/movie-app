#!/bin/sh
set -e

# Cache de config/rotas/views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migrations
php artisan migrate --force

# Inicia php-fpm em background
php-fpm -D

# Inicia nginx em foreground
nginx -g "daemon off;"
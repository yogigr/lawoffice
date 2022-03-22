#/!bin/sh

set -e

echo "Deploying application ..."

#Enter maintenance mode
(php artisan down 'Web sedang dalam pemeliharaan. Silahkan kembali beberapa saat lagi') || true
  #update codebase
  git fetch origin deploy
  git reset --hard origin/deploy

  # Install dependencies based on lock file
  composer install --optimize-autoloader --no-dev

  # Migrate database
  php artisan migrate --force

  # Note: If you're using queue workers, this is the place to restart them.
  # ...

  # Clear cache
  php artisan optimize

  # Reload PHP to update opcache
  echo "4kusukatidur" | sudo -S service php7.4-fpm reload

# Exit maintenance mode
php artisan up

echo "Application deployed!"
echo 'start'

# prod
DATABASE=?
APP=cat_and_dog

# dev
# DATABASE=?
# APP=cat_and_dog_dev

heroku pg:psql $DATABASE --app $APP -f ../migrations/?.sql

echo 'end'

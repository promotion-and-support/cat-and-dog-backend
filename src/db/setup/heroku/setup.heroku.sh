echo 'start'

# prod
DATABASE=?
APP=cat_and_dog

# dev
# DATABASE=?
# APP=ycat_and_dog_dev

heroku pg:psql $DATABASE --app $APP -f create.heroku.sql
heroku pg:psql $DATABASE --app $APP -f ../structure.sql

echo 'end'

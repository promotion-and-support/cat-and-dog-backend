echo 'start'

# prod
DATABASE=postgresql-perpendicular-72796
APP=cat-and-dog

# dev
# DATABASE=?
# APP=cat-and-dog-dev

heroku pg:psql $DATABASE --app $APP -f ../migrations/set.role.sql

echo 'end'

echo 'start'

# prod
DATABASE=postgresql-perpendicular-72796
APP=cat-and-dog

# dev
# DATABASE=?
# APP=cat-and-dog-dev

heroku pg:psql $DATABASE --app $APP -f create.heroku.sql
# heroku pg:psql $DATABASE --app $APP -f ../backup.sql
heroku pg:psql $DATABASE --app $APP -f ../../../../.local/net_init.sql

echo 'end'

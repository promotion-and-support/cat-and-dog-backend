echo 'start'

export PGCLIENTENCODING=utf8
DATABASE=merega
USER=merega

# export PGPASSWORD=postgres
psql -f create.sql -U postgres

export PGPASSWORD=cat_and_dog
psql -d $DATABASE -f backup.sql -U $USER

echo 'end'

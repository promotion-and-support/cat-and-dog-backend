echo 'start'

export PGCLIENTENCODING=utf8
export PGPASSWORD=cat_and_dog
USER=cat_and_dog
DATABASE=cat_and_dog

psql -d $DATABASE -f migrations/set.role.sql -U $USER

echo 'end'

echo 'start'

read -p "Enter filename: " FILE
echo ${FILE}.sql

export PGCLIENTENCODING=utf8
DATABASE=cat_and_dog
USER=cat_and_dog

export PGPASSWORD=postgres
psql -f create.sql -U postgres

export PGPASSWORD=cat_and_dog
psql -d $DATABASE -f ${FILE}.sql -U $USER

echo 'end'

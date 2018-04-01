commands=(
  "CREATE DATABASE groselha_dev;"
  "CREATE USER groselha_dev_user WITH PASSWORD 'nopasswd';"
  "GRANT ALL PRIVILEGES ON DATABASE groselha_dev TO groselha_dev_user;"
  "ALTER USER groselha_dev_user CREATEDB;"
  
)

if [ $(uname) == 'Darwin' ]
then
  for command in "${commands[@]}"; do psql -U postgres -c "$command"; done
else
  for command in "${commands[@]}"; do sudo -u postgres psql -c "$command"; done
fi

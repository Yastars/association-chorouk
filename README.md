# association-chorouk

#database
1) Install wamp
2) Create new database 'chorouk-db'

#project
1) Clone
2) install python   (last version used 3.8.5)
3) pip install pipenv
4) open directory
5) pipenv install
6) pip install -r requirements.py



#run project
1) django-admin runserver --settings=WWWchorouk.localsettings.py //  either this or (2)
or) set DJANGO_SETTINGS_MODULE=WWWchorouk.localsettings            // (2)

1) pipenv shell 
or use) pipenv run [commands below]
2) python manage.py migrate
3) python run manage.py runserver
4) create super user: python manage.py createsuperuser --username=joe --email=joe@example.com

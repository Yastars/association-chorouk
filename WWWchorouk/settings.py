"""
Django settings for WWWchorouk project.

Generated by 'django-admin startproject' using Django 3.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import django_heroku

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=cjc8ueo3p+skhfmdl4####p93#4erg1ssi6t-qygtm9y^*65w'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['chorouk-app.herokuapp.com', 'localhost:8000', '0.0.0.0:8000', 'localhost', '0.0.0.0', 'localhost', '127.0.0.1']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    # We need to oud apps here
    'rest_framework',
    'crmapp',
    'corsheaders', 
    # Deploy
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles', 
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
	'whitenoise.middleware.WhiteNoiseMiddleware',
]

# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# SECURE_SSL_REDIRECT = False

ROOT_URLCONF = 'WWWchorouk.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'WWWchorouk.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# python manage.py makemigrations
# python manage.py migrate
# Local Configuration by Yasoo
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'chorouk-db',
#         'USER': 'root',
#         'PASSWORD': '',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'heroku_567be33c13a68fe',
        'USER': 'b1ab5aeae8346f',
        'PASSWORD': '8e25e00a',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_ROOT = os.path.join(BASE_DIR, 'staic')



#Yasoo
#Enabling CROS
CORS_ORIGIN_ALLOW_ALL = True

#Yasoo
#Deploy
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True
# SECURE_SSL_REDIRECT = True
#DEBUG = False


REST_FRAMEWORK = {
    # 'DEFAULT_PAGINATION_CLASS': 'crmapp.pagination.HeaderPagination',
    # 'PAGE_SIZE': 5
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 1,
    'DATETIME_FORMAT': "%Y-%m-%d",
    'DATE_FORMAT': "%Y-%m-%d",
    'DATETIME_INPUT_FORMATS': "%Y-%m-%d",
    'DATE_INPUT_FORMATS': "%Y-%m-%d",
}

# Start Test Deploy

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_STORAGE = 'spa.storage.SPAStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# End Test Deploy

# Activate Django-Heroku.
django_heroku.settings(locals())
del DATABASES['default']['OPTIONS']['sslmode']

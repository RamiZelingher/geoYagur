# Django settings for geoyagur project.
import os.path
ROOT_PATH = os.path.dirname(__file__)
DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
     ('rami zelingher', 'rami.zelingher@gmail.com'),
)

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'geoyagur1',                      # Or path to database file if using sqlite3.
        'USER': 'root',                      # Not used with sqlite3.
        'PASSWORD': '',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}
TIME_ZONE  = 'Asia/Jerusalem'
LANGUAGE_CODE = 'he'
SITE_ID = 1
USE_I18N = True
USE_L10N = True
#MEDIA_ROOT = os.path.join(os.path.dirname(__file__),"static")
MEDIA_ROOT = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static')
MEDIA_URL ='/static/'
ADMIN_MEDIA_PREFIX = '/static/admin/'
SECRET_KEY = '2d)flx)29yq7@@(7!y+f!m!1_6*58f5ob)03(@ymhx!@m$rjcb'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

ROOT_URLCONF = 'geoyagur.urls'

#TEMPLATE_DIRS = os.path.join(os.path.dirname(__file__),"templates")
TEMPLATE_DIRS=("C:/project/geoyagur/templates",)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.admin',
	'yagur',
   'address',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
)
STATICFILES_ROOT = os.path.join(os.path.dirname(__file__), 'static')
STATICFILES_DIRS = ( os.path.join(os.path.dirname(__file__), 'static'),)
STATICFILES_URL = '/static/'

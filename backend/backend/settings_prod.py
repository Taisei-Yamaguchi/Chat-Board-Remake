import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

DEBUG = False

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# ALLOWED_HOSTS = []
ALLOWED_HOSTS = [
    'api-futures.kucoin.com',
    "chat.taiseiyama.com",
]

CSRF_TRUSTED_ORIGINS = [
    'https://chat.taiseiyama.com',
]

STATIC_URL = "static/"
STATIC_ROOT="/usr/share/nginx/html/static"

CORS_ALLOWED_ORIGINS = [  
    'https://chat.taiseiyama.com',
]

# LOGGING Settings
LOGGING = {
    'version':1,
    "disable_existing_loggers":False,
    
    # LOGGER
    'loggers':{
        # django
        'django': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # accounts
        'accounts': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # snack
        'board': {
            'handlers':['file'],
            'level': 'INFO',
        },
    },
    
    # handlers
    'handlers': {
        "file": {
            'level':'INFO',
            'class':'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(BASE_DIR,'logs/django.log'),
            'formatter':'prod',
            'when':'D',
            'interval':1,
            'backupCount':7,
        },
    },
    
    # formatter
    'formatters':{
        'prod':{
            'format': '\t'.join([
                '%(asctime)s',
                '[%(levelname)s]',
                '%(pathname)s(Line:%(lineno)d)',
                '%(message)s'
            ])
        },
    }
}


CSRF_COOKIE_SAMESITE = None
CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
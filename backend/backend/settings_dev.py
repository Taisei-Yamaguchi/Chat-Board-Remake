# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-57a3)na+p9oqo934_b3(+0+@r82tjou^235yx)^d$cwitqm1ys"

ALLOWED_HOSTS = []

CORS_ALLOW_ALL_ORIGINS = True  # allow all origin
CORS_ALLOW_CREDENTIALS = True  

# LOGGING Settings
LOGGING = {
    'version':1,
    "disable_existing_loggers":False,
    
    # LOGGER
    'loggers':{
        # django
        'django': {
            'handlers':['console'],
            'level': 'INFO',
        },
        # accounts
        'accounts': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        # board
        'board': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
    },
    
    # handlers
    'handlers': {
        "console": {
            'level':'DEBUG',
            'class':'logging.StreamHandler',
            'formatter':'dev'
        },
    },
    
    # formatter
    'formatters':{
        'dev':{
            'format': '\t'.join([
                '%(asctime)s',
                '[%(levelname)s]',
                '%(pathname)s(Line:%(lineno)d)',
                '%(message)s'
            ])
        },
    }
}

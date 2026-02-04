from pathlib import Path
import os

# BASE DIR
BASE_DIR = Path(__file__).resolve().parent.parent

# ===========================
# SECURITY
# ===========================

SECRET_KEY = 'unsafe-secret-key'  # change this for production
DEBUG = True

ALLOWED_HOSTS = ['*']  # change in production

# ===========================
# CORS
# ===========================

CORS_ALLOW_ALL_ORIGINS = True

# ===========================
# APPLICATIONS
# ===========================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'cars',

    # third-party
    'rest_framework',
    'corsheaders',
]

# ===========================
# MIDDLEWARE
# ===========================

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

# ===========================
# TEMPLATES
# ===========================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ===========================
# DATABASE
# ===========================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'AuraRental',
        'USER': 'postgres',
        'PASSWORD': 'Klajdi12!',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# ===========================
# REST FRAMEWORK
# ===========================

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 12,
}

# ===========================
# PASSWORD VALIDATORS
# ===========================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ===========================
# INTERNATIONALIZATION
# ===========================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ===========================
# STATIC FILES
# ===========================

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ===========================
# MEDIA FILES
# ===========================

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ===========================
# DEFAULT PRIMARY KEY
# ===========================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

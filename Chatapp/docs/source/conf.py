import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

sys.path.insert(0, os.path.abspath('../../backend'))
sys.path.insert(0, os.path.abspath('../../backend/backend'))

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

import django
django.setup()

project = 'ChatApp'
copyright = '2024, Hatnean Cosmin'
author = 'Hatnean Cosmin'
release = 'april 2024'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.autodoc',          # Support for docstrings
    'sphinx.ext.intersphinx',      # Link to other project's documentation
    'sphinx.ext.todo',             # Support for todo items
    'sphinx.ext.viewcode',         # Add links to source code
    'sphinx.ext.napoleon',         # Support for Google and NumPy style docstrings
]

# Example intersphinx mapping (if you're linking to other Sphinx docs, e.g., Django's official docs)
intersphinx_mapping = {
    'django': ('https://docs.djangoproject.com/en/stable/', 'https://docs.djangoproject.com/en/stable/_objects/')
}

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

language = 'ro'


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

# html_theme = 'alabaster'
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']

html_theme_options = {
    'logo_only': True,  # if you want to display only the logo instead of the project name at the top of the sidebar
    'display_version': True,  # if you want to display the version of your project
    'prev_next_buttons_location': 'bottom',  # location of the Next and Previous buttons
    'style_external_links': True,  # Add an icon next to external links
    # many other options depending on the theme
}

html_static_path = ['_static']
html_css_files = [
    'css/custom.css',  # path is relative to `_static` directory
]
html_js_files = [
    'js/custom.js',  # path is relative to `_static` directory
]

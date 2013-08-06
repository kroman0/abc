AB Classic
==========

Basecamp Classic on Angular, Twitter Bootstrap, GAE

Links
-----

- [GAE](https://ab-classic.appspot.com/)
- [RTD](https://ab-classic.readthedocs.org/)
- [![Build Status](https://travis-ci.org/kroman0/ab-classic.png)](https://travis-ci.org/kroman0/ab-classic)
- [![Selenium Test Status](https://saucelabs.com/buildstatus/ab-classic)](https://saucelabs.com/u/ab-classic)

Installation
------------

- Clone repo `git clone git://github.com/kroman0/abc.git`
- Bootstrap buildout `python bootstrap.py`
- Build buildout `bin/buildout`
- Run application `make`
- Open [url](http://localhost:8080/) in browser

Development
-----------

- Datastore:
  - Backup `make backup`
  - Restore `make restore`
- Python test `make pytest`:
  - pep8 `make pep8`
  - pyflakes `make pyflakes`
  - flake8 `make flake8`
  - pylint `make pylint`
- Javascript test `make jstest` 
  - JShint `make jshint`
  - JSlint `make jslint`
- Minify javascript `make minify`
- Selelium testing:
  - Run tests in foreground `make test`
  - Run tests in background `make xtest`
- Selelium testing with SauceLab:
  - Get sauce connect `make sauceget`
  - Connect to SauceLab `make sauceconnect`
  - Run selenium tests on SauceLab `make sauce`
- Update screenshots
  - update in foreground `make screenshots`
  - update in background `make xscreenshots`
- Update libraries `make update-all`
  - Update bootstrap `make bootstrap-update`
  - Update underscore.js `make underscore-update`
  - Update backbone.js `make backbone-update`
  - Update backbone-pageable `make backbone-pageable-update`
  - Update backbone-fetch-cache `make backbone-fetch-cache-update`
- Cleanup `make clean`
- Deploy GAE application `make deploy`

- - -

Screenhosts
-----------

![login](/docs/login.png "login")
![projects](/docs/projects.png "projects")
![companies](/docs/companies.png "companies")
![todos](/docs/todos.png "todos")
![time_report](/docs/time_report.png "time_report")
![people](/docs/people.png "people")
![mypage](/docs/mypage.png "mypage")


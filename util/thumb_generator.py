
import os
from subprocess import Popen, PIPE

abspath = lambda *p: os.path.abspath(os.path.join(*p))
ROOT = abspath(os.path.dirname(__file__))

def execute_command(command):

    result = Popen(command, shell=True, stdout=PIPE).stdout.read()
    if len(result) > 0 and not result.isspace():
        raise Exception(result)

def scrape(jesus, url):
    try:
        command = r'phantomjs "C:/program files (x86)/phantomjs/examples/rasterize.js" ' + url\
        +' C:/inetpub/wwwroot/allegro/thumbs/'+str(jesus.replace(' ','_')) + '.png "12in*7.5in"'
        
        execute_command(command)
    except Exception as e:
        print(e)

urls = [
'http://ben/allegro/?l=Highest%20Level%20of%20Adult%20Educational%20Attainment%3A%20BA%2fBS%20Degree%20-%20PUMA',
'http://ben/allegro/?l=Highest%20Level%20of%20Adult%20Educational%20Attainment%3A%20ProfessionalGraduate%20Degree%20-%20PUMA',

'http://ben/allegro/?l=Number%20of%20Languages%20Spoken%20K-12%20Student%20Body%20-%20Points',

'http://ben/allegro/?l=Availability%20of%20Advanced%20Placement%2FInternational%20Baccalaureate%20Courses%20per%20School%20OR%20only%20-%20Points',
'http://ben/allegro/?l=Availability%20of%20Arts%2fMedia%20Classes%20per%20School%20OR%20only%20-%20Points',

'http://ben/allegro/?l=Minority%20Homeownership%20Gap%20Difference%20between%20%25%20Minority%20Households%20and%20%25%20Minority%20Homeowners%20-%20Block%20Group%20-%202010',

'http://ben/allegro/?l=Percent%20Renters%20Spending%20over%2035%25%20of%20Income%20on%20Housing%20-%20PUMA',
'http://ben/allegro/?l=Percent%20Owners%20without%20mortgage%20Spending%20over%2035%25%20of%20Income%20on%20Housing%20-%20PUMA',
'http://ben/allegro/?l=Percent%20Owners%20with%20mortgage%20Spending%20over%2035%25%20of%20Income%20on%20Housing%20-%20PUMA',

'http://ben/allegro/?l=Above%20Regional%20Average%20%25%20Populations%20of%20Color%20-%20Tracts',
'http://ben/allegro/?l=Above%20Regional%20Average%20%25%20Populations%20in%20Poverty%20-%20Tracts',

'http://ben/allegro/?l=Above%20Regional%20Average%20%25%20Youth%20ages%200-17%20-%20Tracts',
'http://ben/allegro/?l=Above%20Regional%20Average%20%25%20Seniors%20ages%2065+%20-%20Tracts',

]

for url in urls:
    scrape(url.replace('http://ben/allegro/?l=','').replace('%20','_'), url)
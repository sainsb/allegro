
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
        +' C:/inetpub/wwwroot/allegro/img/'+str(jesus.replace(' ','_')) + '.png "12in*7.5in"'
        
        execute_command(command)
    except Exception as e:
        print(e)

scrape('conservation_target', 'http://localhost/allegro/?l=RISE%20Points')
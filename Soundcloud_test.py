'''
$ source /Users/test/Documents/Python_Headless_test/env/bin/activate
$ pipenv run python soundcloud_test.py
'''

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

chrome_options = Options()
#chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1366x768")

chrome_driver = '/Users/test/Documents/Python_headless_test/chromedriver'
driver = webdriver.Chrome(chrome_options=chrome_options, executable_path=chrome_driver)

user = 'CLIDE ANDERSON©'

driver.get('https://soundcloud.com/home')
search = driver.find_element_by_class_name('headerSearch')

search.send_keys('CLIDE ANDERSON©')

driver.find_element_by_class_name('headerSearch__submit').click
'''
driver.get("https://soundcloud.com/clide-anderson/tracks")
content = driver.find_elements_by_class_name('soundList__item')

tracks = []
for track in content:
    tmp = []
    title = track.find_element_by_class_name('soundTitle__title')
    time = (track.find_element_by_tag_name('time')).get_attribute('datetime')
    tmp.append(title.text)
    tmp.append(time)
    tracks.append(tmp)

file = open('testfile.txt','w')
 
file.write(str(tracks))

file.close()
driver.close()
'''

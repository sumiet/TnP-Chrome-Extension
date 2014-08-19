#!/usr/bin/env python
'''Copyright Sumit Agarwal and Koushik MLN , before using any of the 
content available here do take permissions by writing us at sumagarwal93@gmail.com'''
import urllib2
import time,datetime
from bs4 import BeautifulSoup
from pyquery import PyQuery
import requests,MySQLdb
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from pyvirtualdisplay import Display
	
def main():
	display = Display(visible=0, size=(800, 600))
	display.start()
	driver = webdriver.Firefox()
	url=('https://bitmesra.ac.in/student/students-before-login.asp')
	driver.get(url)
	username = driver.find_element_by_name('txtUserId')
	username.send_keys('TNP ID')
	password = driver.find_element_by_name('txtPassword')
	password.send_keys('TNP PASS')
	form = driver.find_element_by_name('frmLogin')
	form.submit()
	content= driver.page_source
	soup=BeautifulSoup(content)
	string=""
	string1=""
	links=soup.find_all("td",attrs={"width":"5"})
	for link in links:
		data=link.find_next("td").get_text()
		add=link.find_next("a",href=True)
		addr=add['href'].strip()
		#print addr
		string1=string1+addr+"##"
		notice = data.strip()
		string=string+notice+"##"
	
	lists=string.split("##")
	lists_link=string1.split("##")
	lists.reverse()
	lists_link.reverse()
	cur.execute("DELETE FROM updates")
	for i in range(len(lists)):
		time_stamp = str(datetime.datetime.now())
		cur.execute("SELECT * FROM updates where topics='%s'"%(lists[i]))
		if not cur.fetchall():
			cur.execute("insert into updates values ('%s', '%s', '%s')"%(lists[i],lists_link[i],time_stamp))
			db.commit()
	driver.close()
	display.stop()


if __name__ == "__main__":
	try:
		db = MySQLdb.connect(host="HOST", user="USER", passwd="PASS", db="DB")
		cur = db.cursor()
	except :
		print "error in database linking "
	main()
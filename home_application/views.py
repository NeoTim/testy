
from django.shortcuts import render
from django.http import JsonResponse


import MySQLdb

# 开发框架中通过中间件默认是需要登录态的，如有不需要登录的，可添加装饰器login_exempt
# 装饰器引入 from blueapps.account.decorators import login_exempt
def home(request):
    """
    首页
    """
    return render(request, 'home_application/home.html')


def contact(request):
    """
    联系我们
    """
    return render(request, 'home_application/contact.html')

def hello(request):
    return JsonResponse({"hello": "world"})


def list(request):
    db = MySQLdb.connect(user='tim', db='DBAz', passwd='123456a@', host='172.16.20.46', charset="utf8")
    cursor = db.cursor()
    cursor.execute('SELECT name FROM Tendis ORDER BY id')
    names = [row[0] for row in cursor.fetchall()]
    db.close()
    return ({'names': names})



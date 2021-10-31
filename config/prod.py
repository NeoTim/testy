# -*- coding: utf-8 -*-
from config import RUN_VER
if RUN_VER == 'open':
    from blueapps.patch.settings_open_saas import *  # noqa
else:
    from blueapps.patch.settings_paas_services import *  # noqa

# 正式环境
RUN_MODE = 'PRODUCT'

# 只对正式环境日志级别进行配置，可以在这里修改
LOG_LEVEL = 'ERROR'

# V2
# import logging
# logging.getLogger('root').setLevel('INFO')
# V3
# import logging
# logging.getLogger('app').setLevel('INFO')


# 正式环境数据库可以在这里配置

# 请注意：因为BK不支持private git，只能设置为publc。所以请勿在本项目里保存密码。以下密码公开无所谓，只能内网访问。
# 为增加安全性，本项目设计为container模式，将BK的Python接口转换为更通用的跨语言API，所以具体业务会使用NodeJS（因为开发速度更快，代码重用度高）在private git里开发。因此本项目只做接口转换，不会包含具体业务。


DATABASES.update(
    {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'DBAz',  # 数据库名
            'USER': 'tim',  # 数据库用户
            'PASSWORD': '123456a@',  # 数据库密码
            'HOST': '172.16.20.46',  # 数据库主机
            'PORT': '3306',  # 数据库端口
        },
    }
)


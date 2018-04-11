def index():
    return dict()


def get_data():
    import pandas
    import numpy as np
    from gluon.serializers import json

    df = pandas.read_csv('C:\\Work\\web2py\\applications\\bootcamp_template\\private\\data\\dataset_1\\Video_Games_Sales_as_at_22_Dec_2016.csv')

    output = {}

    name_list = df.Name.value_counts()
    platform_list = df.Platform.value_counts()
    genre_list = df.Genre.value_counts()
    publisher_list = df.Publisher.value_counts()
    developer_list = df.Developer.value_counts()

    
    chart1_data = []
    chart1_labels = []
    for i, row in df.iterrows():        
        # chart3d_data.append([row[5], row[6], row[7]])
        chart1_data.append([row[5], row[6]])
        chart1_labels.append(row[0])
    
    # output = [{"Wii Sports": [41.36, 28.96], "Super Mario Bros.": [29.08, 3.58], "Mario Kart Wii": [15.68, 12.76]}]

    output = chart1_data

    # output['chart1_data'] = chart1_data
    # output['chart1_labels'] = chart1_labels
    # output = chart3d_labels
    # output['chart3d_labels'] = chart3d_labels
    # import ipdb;ipdb.set_trace()
    return json(output)


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()



def index():
    return dict()


def get_data():
    import pandas
    import numpy as np
    from gluon.serializers import json

    df = pandas.read_csv('C:\\Work\\web2py\\applications\\bootcamp_template\\private\\data\\dataset_1\\Video_Games_Sales_as_at_22_Dec_2016.csv')

    output = {}
    output['line_data'] = {}
    scatter_data = []
    pie_data = []
    line_data_labels = []
    line_data_values = []
        
    for i, row in df.iterrows():            
        if row[4] == 'Bethesda Softworks':
            scatter_data.append([row[5], row[6], str(row[0])])        
            line_data_labels.append(str(row[0]))
            line_data_values.append(row[5])        
            pie_data.append({'name': str(row[0]), 'value': row[5]})

    output['scatter_data'] = scatter_data
    output['line_data']['labels'] = line_data_labels
    output['line_data']['values'] = line_data_values
    output['pie_data'] = pie_data
           
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



﻿Ext.define('App.store.Results', {
    extend: 'Ext.data.Store',
    model: 'App.model.Result',
    alias: 'store.Results',

    proxy: {
        type: 'ajax',
        url: '/results',
        method:'GET',
        reader: {
            type: 'json',
            rootProperty: 'results'
        }
    }
});
Ext.define('App.store.Reports', {
    extend: 'Ext.data.Store',
    model: 'App.model.Report',
    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json',
            rootProperty: 'reports'
        }
    }
});
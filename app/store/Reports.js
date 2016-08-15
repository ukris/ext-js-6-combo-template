Ext.define('App.store.Reports', {
    extend: 'Ext.data.Store',
    model: 'App.model.Report',
    proxy: {
        type: 'ajax',
        url: 'ndata.json',
        reader: {
            type: 'json'
        }
    }
});
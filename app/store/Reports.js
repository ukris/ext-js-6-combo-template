Ext.define('App.store.Reports', {
    extend: 'Ext.data.Store',
    model: 'App.model.Report',
    alias: 'store.Reports',
    proxy: {
        type: 'ajax',
        url: 'ndata.json'
    }
});
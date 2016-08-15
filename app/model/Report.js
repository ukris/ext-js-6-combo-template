Ext.define('App.model.Report', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'description', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'url', type: 'string' },
        { name: 'icon', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'source', type: 'string' }
    ]
});
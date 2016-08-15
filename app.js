Ext.application({
    name: 'App',
    models: ['Report'],
    stores: ['Reports'],
    views: ['Viewport'],
    autoCreateViewport: true,
    
    launch: function () {
    }
});
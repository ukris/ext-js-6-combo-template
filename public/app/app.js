Ext.application({
    name: 'App',
    models: ['Report', 'Result'],
    stores: ['Reports', 'Results'],
    views: ['Viewport'],
    autoCreateViewport: true,
    
    launch: function () {
    }
});
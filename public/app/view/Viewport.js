var resultPanel = Ext.create('Ext.panel.Panel', {
    title  : "Results",
    layout : {
        type  : 'vbox'
    },
    items : [{
        xtype : 'panel',
        width : '100%',
        padding: 20,
        flex  : 1,
        cls: 'two-column'
    }]
});

var tabPanel = Ext.create('Ext.panel.Panel', {
    layout : {
        type  : 'vbox'
    },
    items : [{
        xtype : 'tabpanel',
        width : '100%',
        frame: true,
        defaults: {
            bodyPadding: 10,
            scrollable: true
        },
        
        items: [{
            title: 'All resutls',
            html: 'All resutls'
        }, {
            title: 'Dashboards',
            html: 'Dashboards'
        },
            resultPanel
        ],
    
        listeners: {
            tabchange: 'onTabChange'
        },
        
        onTabChange: function(a, b, c) {
            console.log('a b c', a, b, c);
        }
    }]
});


Ext.define('App.view.Viewport', {
    extend: 'Ext.form.Panel',
    xtype: 'custom-template-combo',
    title: 'Custom Template  ComboBox',
    layout: {
        type: 'vbox',
        align: 'stretch',
    },
    viewModel: {},
    items: [{
        xtype: 'fieldset',
        layout: 'anchor',
        height: 100,
        items: [{
            xtype: 'component',
            anchor: '100%',
            html: [
                '<h3>Custom ComboBox</h3>',
            ]
        }, {
            fieldLabel: 'Select a type',
            xtype: 'combobox',
            anchor: '-20',
            displayField: 'title',
            hideTrigger: true,
            
            reference: 'connector',
            publishes: 'value',
            
            queryMode: 'local',
            
            store: {
                type: 'Reports',
                autoLoad: true
            },
    
            tpl: Ext.create('Ext.XTemplate',
                '{[this.currentKey = null]}',
                '<tpl for=".">',
                    '<tpl if="this.shouldShowHeader(type)">',
                        '<h3 class="group-header">{[this.showHeader(values.type)]}</h3>',
                    '</tpl>',
                    '<div class="x-boundlist-item">{title}</div>',
                '</tpl>',
                {
                    shouldShowHeader: function(type){
                        return this.currentKey != type;
                    },
                    showHeader: function(type){
                        this.currentKey = type;
                        return type;
                    }
                }
            ),
            listeners: {
                keyup: function(combobox,e) {
                    var searchStore = Ext.getStore('Reports');
                    searchStore.load({
                        params: {
                            keys: combobox.getValue()
                        }
                    })
                },
                select: function(combobox) {
                    var resultStore = Ext.getStore("Results");
                    resultStore.load({
                        params: {
                            keys: combobox.getValue()
                        },
                        callback: function(records, operation, success) {
                            var newContent = [];
                            resultStore.each(function(item) {
                                newContent.push(
                                    '<div class="detail-result">' +
                                        '<h3>' + item.data.name + '</h3>' +
                                        '<div>' + item.data.value + '</div>' +
                                    '</div>'
                                );
                            });
                            
                            resultPanel.items.get(0).update(newContent.join(''));
                        }
                    });
                    
                    
                    
                }
            }
            
        }]
    }, tabPanel]
});
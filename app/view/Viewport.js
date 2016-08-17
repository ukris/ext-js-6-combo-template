var resultPanel = Ext.create('Ext.panel.Panel', {
    title  : "Result Panel",
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
                select: function(combobox) {
                    var ResultStore = Ext.getStore("Results");
                    ResultStore.load({
                        params: {
                            keys: combobox.getValue()
                        },
                        callback: function(records, operation, success) {
                            var newContent = [];
                            ResultStore.each(function(item) {
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
    }, resultPanel]
});
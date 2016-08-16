Ext.define('App.view.Viewport', {
    extend: 'Ext.form.Panel',
    xtype: 'custom-template-combo',
    title: 'Custom Template  ComboBox',
    layout: 'form',
    viewModel: {},
    items: [{
        xtype: 'fieldset',
        layout: 'anchor',
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
                change: function(combobox, newValue, oldValue, eOptions) {
                    Ext.Ajax.request({
                        url: 'results.json',
                        method: 'GET',
                        success: function(conn, response, options, eOpts) {
                            console.log('response', conn, response, options)
                        },
                        failure: function(conn, response, options, eOpts) {
                            // TODO get the 'msg' from the json and display it
                            Packt.util.Util.showErrorMsg(conn.responseText);
                        }
                    });
                }
            }
            
        }]
    }]
});
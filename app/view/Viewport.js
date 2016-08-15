Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Ext.form.FormPanel', 'Ext.form.field.ComboBox'],
    style: 'padding:25px',
    layout: 'vbox',
    items: [{
        xtype: 'form',
        title: 'Reports',
        width: 500,
        bodyPadding: 10,
        items: [{
            xtype: 'combo',
            id: 'autos-combo',
            store: 'Reports',
            displayField: 'name',
            valueField: 'id',
            editable: false,
            queryMode: 'remote',
            multiSelect: false,
            triggerAction: 'all',
            fieldLabel: 'Reports',
            emptyText: 'Select a model...',
            selectOnFocus: false,
            hideTrigger: true,
            typeAhead: true,
            typeAheadDelay: 100,
            editable: true,
            minChars: 2,
            anchor: '100%',
            hideTrigger: true,
            typeAhead: true,
            typeAheadDelay: 100,
            minChars: 2,
            tpl: Ext.create('Ext.XTemplate',
                '<h3><b>Reports</b></h3>',
                '<tpl for=".">',
                '<div class="x-boundlist-item">',
                    '<span>{title}</span>',
                '</div>',
                '</tpl>'
            )
        }]
    }]
});
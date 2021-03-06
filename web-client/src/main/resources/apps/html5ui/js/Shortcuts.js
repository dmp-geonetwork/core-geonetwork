/**
 * Init shortcut
 *
 * @return
 */
function initShortcut() {
    
    // Define editor shortcut here.
    var searchConfig = [{
        key: "f",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('focusOnAny'),
        fn: function () {
            var e = Ext.get('E_any');
            e.highlight();
            e.dom.focus(true);
        }
    }, {
        key: "s",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('runSearch'),
        fn: function () {
            var e = Ext.getCmp('advanced-search-options-content-form');
            e.getEl().fadeIn();
            e.fireEvent('search');
        }
    }, {
        key: Ext.EventObject.LEFT,
        keyLabel: "LEFT",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('previousPage'),
        fn: function () {
            Ext.getCmp('previousBt').handler();
        }
    }, {
        key: Ext.EventObject.RIGHT,
        keyLabel: "RIGHT",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('nextPage'),
        fn: function () {
            Ext.getCmp('nextBt').handler();
        }
    }, {
        key: Ext.EventObject.UP,
        keyLabel: "UP",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('upInPage'),
        fn: function () {
            catalogue.resultsView.getEl().scroll('t', 170, true);
        }
    }, {
        key: Ext.EventObject.DOWN,
        keyLabel: "DOWN",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('downInPage'),
        fn: function () {
            catalogue.resultsView.getEl().scroll('b', 170, true);
        }
    }, {
        key: "d",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('hideadvanced-search-options-content-form'),
        fn: function () {
            var r = Ext.getCmp('west');
            r.toggleCollapse();
        }
    }, {
        key: "r",
        ctrl: true,
        shift: true,
        label: OpenLayers.i18n('resetadvanced-search-options-content-form'),
        fn: function () {
            var e = Ext.getCmp('advanced-search-options-content-form');
            e.getEl().fadeIn();
            e.fireEvent('reset');
        }
    }, {
        key: "v",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('switchMode'),
        fn: function () {
            if(app.switchMode)app.switchMode(null, true);
        }
    }, {
        key: "m",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('toggleLayerManager'),
        fn: function () {
            var r = Ext.getCmp('layerManager');
            r.toggleCollapse();
        }
    }, {
        key: "l",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('focusOnLogin'),
        fn: function () {
            if (catalogue.identifiedUser === undefined) {
                toggleLogin();
            } else {
                catalogue.logout();
            }
            
        }
    }, {
        key: "a",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('openAdmin'),
        fn: function () {
            if (catalogue.isIdentified()) {
                catalogue.admin();
            }
        }
    }, {
        key: "c",
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('newMetadata'),
        fn: function () {
            if (catalogue.isIdentified()) {
                var actionCtn = Ext.getCmp('resultsPanel').getTopToolbar();
                actionCtn.createMetadataAction.handler.apply(actionCtn);
            }
        }
    }, {
        key: 'h', // FIXME
        ctrl: true,
        shift: true,
        stopEvent: true,
        label: OpenLayers.i18n('displayHelpPanel'),
        fn: function () {
            var ss = Ext.getDom('shortcut').style;
            if (ss.display === 'block') {
                Ext.getDom('shortcut').style.display = 'none';
            } else {
                Ext.getDom('shortcut').style.display = 'block';
            }
        }
    }];
    var map = new Ext.KeyMap(document, searchConfig);
    map.enable();
    
    var helpEl = Ext.getDom('shortcutHelp');
    if (helpEl) {
        var help = '';
        for (var i = 0; i < searchConfig.length; i++) {
            var c = searchConfig[i];
            help += '<tr><td>' +
            (c.ctrl === true ? '<span class="label">&lt;Ctrl&gt;</span> + ' : '') +
            (c.shift === true ? '<span class="label">&lt;Shift&gt;</span> + ' : '') +
            '<span class="label">' +
            (c.keyLabel ? c.keyLabel : c.key) +
            '</span>' +
            ':</td><td>' +
            c.label +
            '</td></tr>';
        }
        
        var html = '<table><tbody><tr><td>' + help + '</td></tr></tbody></table>';
        Ext.DomHelper.insertHtml('afterEnd', helpEl, html);
    }
    // Launch search when enter key press
    var formMap = new Ext.KeyMap("advanced-search-options-content-form", [{
        key: [10, 13],
        fn: function () {
            Ext.getCmp('advanced-search-options-content-form').fireEvent('search');
        }
    }]);
    
    formMap.enable();
}

Ext.define('OSSTreePanel', {
    extend: 'Ext.tree.Panel',
    alias: ['widget.osstreepanel'],
    title: 'Tree Default'
    ,
    mixins: {              	 
        treeFilter: 'OSS.lib.TreeFilter' 
    }
});
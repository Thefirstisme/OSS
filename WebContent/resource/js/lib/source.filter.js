var filterTree = function(textfield, e, eOpts) {
	//alert(text);
	var tree = Ext.getCmp("TreeSourceMain"),
          text = this.getRawValue();

    //tree.getView().clearFilter();
    
    if (Ext.isEmpty(text, false)) {
        return;
    }
    
    if (e.getKey() === Ext.EventObject.ESC) {
        clearFilter();
    } else {
        var re = new RegExp(".*" + text + ".*", "i");

        tree.filterBy(function(node) {
            return re.test(node.text);
        });
    }
};

var clearFilter = function() {
    var field = Ext.getCmp("trigFilterText"),
                tree = Ext.getCmp("TreeSourceMain");

    field.setValue("");
    //tree.getView().clearFilter();
    tree.getRootNode().collapseChildNodes(true);
    tree.getRootNode().ensureVisible();
};
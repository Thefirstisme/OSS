/**
 * Add basic filtering to Ext.tree.Panel. Add as a mixin:
 *  mixins: {
 *      treeFilter: 'MyApp.lib.TreeFilter'
 *  }
 */
Ext.define('OSS.lib.TreeFilter', {
    filterByText: function(text) {
    	this.clearFilter();
    	if (Ext.isEmpty(text, false)) {
            return;
        }
        this.filterBy(text, 'text');
    },
 
 
    /**
     * Filter the tree on a string, hiding all nodes expect those which match and their parents.
     * @param The term to filter on.
     * @param The field to filter on (i.e. 'text').
     */
    filterBy: function(text, by) {
        var view = this.getView(),
            me = this,
            nodesAndParents = [];
        //me.expand();
        // Find the nodes which match the search term, expand them.
        // Then add them and their parents to nodesAndParents.
        var rootNode=this.getRootNode();
        this.getRootNode().cascadeBy(function(tree, view){
            var currNode = this;
 
            //if(currNode && currNode.data[by] && currNode.data[by].toString().toLowerCase().indexOf(text.toLowerCase()) > -1) {
             if(currNode.data[by].toString().toLowerCase().indexOf(text.toLowerCase()) > -1){
                //me.expandPath(currNode.getPath());
            	//currNode.expand();
            	expandParNode(currNode,rootNode);
                while(currNode.parentNode) {
                    nodesAndParents.push(currNode.id);
                    currNode = currNode.parentNode;
                    //alert(currNode);
                }
            }
        }, null, [me, view]);
 
        // Hide all of the nodes which aren't in nodesAndParents
        this.getRootNode().cascadeBy(function(tree, view){
            var uiNode = view.getNodeByRecord(this);
 
            if(uiNode && !Ext.Array.contains(nodesAndParents, this.id)) {
                Ext.get(uiNode).setDisplayed('none');
            }
        }, null, [me, view]);
    },
 
 
    clearFilter: function() {
        var view = this.getView();
 
        this.getRootNode().cascadeBy(function(tree, view){
            var uiNode = view.getNodeByRecord(this);
 
            if(uiNode) {
                Ext.get(uiNode).setDisplayed('table-row');
            }
        }, null, [this, view]);
    }
});
var expandParNode=function(node, rootNode) {
    if (!node || node == rootNode) {
        return;
    }
    //if (node.isExpandable()) {
        if (!node.isExpanded()) {
            if (node.parentNode) {
            	expandParNode(node.parentNode, rootNode);
            }
            node.expand();
        }
    //}
};
var tree =Ext.getCmp('TreeSourceMain');  
 var filter = new Ext.tree.TreeFilter(tree, {  
        clearBlank : true,  
        autoClear : true  
});  
// 保存上次隐藏的空节点  
 var hiddenPkgs = [];  
 var field = Ext.getCmp('trigFilterText');  
 field.on('keyup', function(e) {  
	            var text = field.dom.value;  
	                // 先要显示上次隐藏掉的节点  
	                Ext.each(hiddenPkgs, function(n) {  
	                            n.ui.show();  
	                        });  
	                // 如果输入的数据不存在，就执行clear()  
	                if (!text) {  
	                    filter.clear();  
	                    return;  
	                }  
	                tree.expandAll();  
	                // 根据输入制作一个正则表达式，'i'代表不区分大小写  
	var re = new RegExp(Ext.escapeRe(text), 'i');  
	filter.filterBy(function(n) {  
	            // 只过滤叶子节点，这样省去枝干被过滤的时候，底下的叶子都无法显示  
	                            return !n.isLeaf() || re.test(n.text);  
	                        });  
	                // 如果这个节点不是叶子，而且下面没有子节点，就应该隐藏掉  
	hiddenPkgs = [];  
	tree.root.cascade(function(n) {  
	            if (!n.isLeaf() && n.ui.ctNode.offsetHeight < 3) {  
	                n.ui.hide();  
	                hiddenPkgs.push(n);  
	            }  
	});
 });  
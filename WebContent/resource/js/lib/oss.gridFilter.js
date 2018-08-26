var filterBuildQuery=function(filters){
	//
    var p_query, qs, filter, field, value, compare, filterType, count, len = filters.length;
    //
    for (var i=0;i< len;i++)
    {
          // reset
          qs = '';
          filter     = '';
          field      = '';
          value      = '';
          compare    = '';
          filterType = '';
          //
          filter     = filters[i];
          field      = filter['field'];
          value      = filter['data']['value'];
          compare    = filter['data']['comparison'];
          filterType = filter['data']['type'];
          //
          switch(filterType){
              case 'string' : 
                 qs = " AND " + field + " LIKE '%" + value + "%'"; 
                 break;
              case 'list' :
                  if (strstr(value,',')){
                      fi = explode(',',value);
                      for (var q=0;q<count(fi);q++){
                          fi[q] = "'" + fi[q] + "'";
                      }
                      value = implode(',',fi);
                      qs = " AND " + field + " IN (" + value + ")";
                  }else{
                      qs = " AND " + field + " = '" + value + "'";
                  }
                  break;
              case 'boolean' : 
                 qs = " AND " + field + " = " + (value); 
                 break;
              case 'numeric' :
                  switch (compare) {
                      case 'eq' : 
                        qs = " AND " + field + " = " + value; 
                        break;
                      case 'lt' : 
                        qs = " AND " + field + " < " + value; 
                        break;
                      case 'gt' : 
                        qs = " AND " + field + " > " + value; 
                        break;
                  }
              break;
              case 'date' :
                  switch (compare) {
                      case 'eq' : 
                        qs = " AND " + field + " = '" + date('Y-m-d',strtotime(value)) + "'"; 
                        break;
                      case 'lt' : 
                        qs = " AND " + field + " < '" + date('Y-m-d',strtotime(value)) + "'"; 
                        break;
                      case 'gt' : 
                        qs = " AND " + field + " > '" + date('Y-m-d',strtotime($value)) + "'"; 
                        break;
                  }
              break;
          }
          //
          p_query = p_query + qs;
    }
    alert(p_query);
    return p_query;
};
var filterBuildQuery2=function(filters){
	 var p = {};   
     for(var i=0, len=filters.length; i<len; i++) {   
       var f = filters[i];   
       var name = f.field;        
       var value = f.data['value'];   
       if( value != null ){   
         if(f.data['comparison']!=null){  
           if(!p[name]) p[ name ] = '';  
           p[ name ] += f.data['comparison']+'@'+value+',';   
         }else{   
           p[ name ] = value;   
         }   
       }   
     }   
     return p;   
};
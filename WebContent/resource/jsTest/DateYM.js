
Ext.define('Ext.ux.form.field.DateYM', {
    extend:'Ext.form.field.Date',
    alias: 'widget.dateymfield',
    requires: ['Ext.ux.picker.YM'],
    alternateClassName: ['Ext.ux.form.DateYMField', 'Ext.ux.form.DateYM'],

    /**
     * @cfg {String} format
     */
//    format : "m/d/Y",
    format : 'Y-m',
    /**
     * @cfg {String} altFormats
     */
//    altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",
      altFormats : "m/Y|n/Y|n/y|m/y|n/y|m/Y|n/Y|m-y|m-Y|m|m|m|my|mY|Y-m|n|n",

    /**
     * @cfg {Boolean} showToday
     */
//    showToday : true,
    showToday : false,

    //added
    isExpanded: false,

    /**
     * Attempts to parse a given string value using a given {@link Ext.Date#parse date format}.
     * @param {String} value The value to attempt to parse
     * @param {String} format A valid date format (see {@link Ext.Date#parse})
     * @return {Date} The parsed Date object, or null if the value could not be successfully parsed.
     */
    safeParse : function(value, format) {
        var me = this,
            utilDate = Ext.Date,
            parsedDate,
            result = null;

        // set time to 12 noon, then clear the time
//        parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat);

         // 2011-12-31 extjs Date.parse bug
//        parsedDate = utilDate.parse(value, format);
        parsedDate = utilDate.parse(value+'-01', format+'-d');

/*
        if (parsedDate) {
            result = utilDate.clearTime(parsedDate);
        }
        return result;
*/
        return parsedDate;
    },

    //@implement
    createPicker: function() {
        var me = this;
        var mPicker = Ext.create('Ext.ux.picker.YM', {
                pickerField: me,
//                renderTo: me.el,
                renderTo: document.body,
                hidden: true,
                floating: true,
                minDate: me.minValue,
                maxDate: me.maxValue,
                shadow: false,
                small: me.showToday === false,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            });
        if (!this.disableAnim) {
            // hide the element if we're animating to prevent an initial flicker
            mPicker.el.setStyle('display', 'none');
        }

        mPicker.setValue(me.value);
        return mPicker;
   },

    //copy from picker/Date.js
    onOkClick: function(picker, value){
        var me = this,
            month = value[0] ? value[0] : 0,
            year = value[1];

        if (month == null || year == null)
        {
            return;
        }

        var selDate = new Date(year, month, 1);
        if (selDate.getMonth() !== month) {
            // 'fix' the JS rolling date conversion if needed
            selDate = new Date(year, month, 1).getLastDateOfMonth();
        }
//        me.update(selDate);
        me.setValue(selDate);
        me.collapse();
    },

    onCancelClick: function(){
        this.collapse();
    },

        beforeBlur : function(){
        var me = this,
            v = me.parseDate(me.getRawValue()),
            focusTask = me.focusTask;

        if (focusTask) {
            focusTask.cancel();
        }

        if (v) {
            me.setValue(v);
        }
    }
});


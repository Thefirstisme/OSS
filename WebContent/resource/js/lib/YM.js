/*
 * 
 * This file is part of Ext JS 4
 * 
 * Copyright (c) 2011 Sencha Inc
 * 
 * Contact: http://www.sencha.com/contact
 * 
 * GNU General Public License Usage This file may be used under the terms of the
 * GNU General Public License version 3.0 as published by the Free Software
 * Foundation and appearing in the file LICENSE included in the packaging of
 * this file. Please review the following information to ensure the GNU General
 * Public License version 3.0 requirements will be met:
 * http://www.gnu.org/copyleft/gpl.html.
 * 
 * If you are unsure which license is appropriate for your use, please contact
 * the sales department at http://www.sencha.com/contact.
 * 
 */
/**
 * A month picker component. This class is used by the
 * {@link Ext.picker.Date Date picker} class to allow browsing and selection of
 * year/months combinations.
 */
Ext.define('Ext.ux.picker.YM', {
	extend : 'Ext.picker.Month',
	// requires: ['Ext.XTemplate', 'Ext.util.ClickRepeater', 'Ext.Date',
	// 'Ext.button.Button'],
	alias : 'widget.ympicker',
	alternateClassName : 'Ext.YearMonthPicker',

	/*
	 * renderTpl: [ '<div id="{id}-bodyEl" class="{baseCls}-body">', '<div
	 * class="{baseCls}-months">', '<tpl for="months">', '<div
	 * class="{parent.baseCls}-item {parent.baseCls}-month"><a href="#"
	 * hidefocus="on">{.}</a></div>', '</tpl>', '</div>', '<div
	 * class="{baseCls}-years">', '<div class="{baseCls}-yearnav">', '<button
	 * id="{id}-prevEl" class="{baseCls}-yearnav-prev"></button>', '</div>', '<div
	 * class="{baseCls}-yearnav">', '<button id="{id}-nextEl"
	 * class="{baseCls}-yearnav-next"></button>', '</div>', '<tpl
	 * for="years">', '<div class="{parent.baseCls}-item
	 * {parent.baseCls}-year"><a href="#" hidefocus="on">{.}</a></div>', '</tpl>', '</div>', '<div
	 * class="' + Ext.baseCSSPrefix + 'clear"></div>', '</div>', '<tpl
	 * if="showButtons">', '<div id="{id}-buttonsEl" class="{baseCls}-buttons"></div>', '</tpl>' ],
	 */
	// private, inherit docs
	initComponent : function() {
		var me = this;
		me.callParent();

		// added
		me.disabledCls = me.baseCls + '-disabled';
		me.navDisableCls = me.baseCls + '-yearnav-disabled';

		me.activeClsY = me.baseCls + '-item ' + me.baseCls + '-year';
		me.activeClsM = me.baseCls + '-item ' + me.baseCls + '-month';
	},

	/*
	 * // private, inherit docs afterRender: function(){ var me = this;
	 * me.callParent();
	 * 
	 * me.prevEl.removeCls(me.baseCls + '-yearnav-prev-over');
	 * me.nextEl.removeCls(me.baseCls + '-yearnav-next-over'); },
	 */

	/**
	 * Update the years in the body based on any change
	 * 
	 * @private
	 */
	updateBody : function() {
		var me = this, years = me.years, months = me.months, yearNumbers = me
				.getYears(), cls = me.selectedCls, value = me.getYear(null), month = me.value[0], monthOffset = me.monthOffset, year,

		// added
		minYear = me.minDate ? me.minDate.getFullYear() : null, maxYear = me.maxDate
				? me.maxDate.getFullYear()
				: null, minMon = me.minDate ? me.minDate.getMonth() : null, maxMon = me.maxDate
				? me.maxDate.getMonth()
				: null;

		if (me.rendered) {
			// added enable/disable nav
			if (minYear && yearNumbers[0] < minYear) {
				// me.prevEl.addCls('x-btn-disabled');
				/*
				 * var parentNode = Ext.fly(me.prevEl.dom.parentNode);
				 * parentNode.removeCls(me.baseCls + '-yearnav');
				 * parentNode.addCls(me.navDisableCls);
				 */

				// me.prevEl.addCls(me.navDisableCls);
				// me.prevEl.select('button').disabled = true;
			} else {
				me.prevEl.addClsOnOver(me.baseCls + '-yearnav-prev-over');
			}
			if (maxYear && yearNumbers[yearNumbers.length - 1] > maxYear) {
				// me.nextEl.addCls(me.navDisableCls);

				/*
				 * var parentNode = Ext.fly(me.nextEl.dom.parentNode);
				 * parentNode.removeCls(me.baseCls + '-yearnav');
				 * parentNode.addCls(me.navDisableCls);
				 */

				// me.nextEl.addCls('x-btn-disabled');
				// me.nextEl.select('button').disabled = true;
			} else {
				me.nextEl.addClsOnOver(me.baseCls + '-yearnav-next-over');
			}

			years.removeCls(cls);
			months.removeCls(cls);

			years.each(function(el, all, index) {
				year = yearNumbers[index];
				el.dom.innerHTML = year;

				if (year == value) {
					el.dom.className = cls;
				}

				
				/*
				 * -- 时间框 年份选择问题 暂时注掉 --
				 * @date 2012-12-6 pm
				 */
				// added
//				if ((minYear && year < minYear) || (maxYear && year > maxYear)) {
//					el.dom.className = me.disabledCls;
//				} else {
//					el.dom.className = me.activeClsY;
//				}

			});

			// added
			/*
			 * if (month !== null) { if (month < monthOffset) { month = month *
			 * 2; } else { month = (month - monthOffset) * 2 + 1; }
			 * months.item(month).addCls(cls); }
			 */
			for (var monV = 0; monV < 12; monV++) {
				var monIndex = monV < monthOffset
						? monV * 2
						: (monV - monthOffset) * 2 + 1;

				months.item(monIndex).mValue = monV + 1;

				if (month != null && monV == month) {
					months.item(monIndex).addCls(cls);
				}
				if ((minYear && value == minYear && minMon && monV <= minMon)
						|| (maxYear && value == maxYear && maxMon && monV >= maxMon)) {
					// el.dom.className = me.disabledCls;

					months.item(monIndex).removeCls(me.activeClsM);
					months.item(monIndex).addCls(me.disabledCls);
					// months.item(monIndex).el.dom.className=me.disabledCls;
				} else {
					months.item(monIndex).removeCls(me.disabledCls);
					months.item(monIndex).addCls(me.activeClsM);
				}

			}
		}
	},

	/**
	 * @override Modify the year display by passing an offset.
	 * @param {Number}
	 *            [offset=10] The offset to move by.
	 */
	adjustYear : function(offset) {
		if (typeof offset != 'number') {
			offset = this.totalYears;
		}

		// added
		// this.activeYear += offset;
		// added
		var me = this, newYStart = this.activeYear + offset, newYEnd = newYStart
				+ me.totalYears, minYear = me.minDate ? me.minDate
				.getFullYear() : null, maxYear = me.maxDate ? me.maxDate
				.getFullYear() : null;

		// added
		if ((minYear && newYEnd < minYear) || (maxYear && newYStart > maxYear)) {
			return;
		}

		this.activeYear = newYStart;
		this.updateBody();
	},

	/**
	 * React to a month being clicked
	 * 
	 * @private
	 * @param {HTMLElement}
	 *            target The element that was clicked
	 * @param {Boolean}
	 *            isDouble True if the event was a doubleclick
	 */
	onMonthClick : function(target, isDouble) {
		var me = this;

		// me.value[0] = me.resolveOffset(me.months.indexOf(target),
		// me.monthOffset);
		var monV = me.resolveOffset(me.months.indexOf(target), me.monthOffset);
		// add ref by Date.js
		// if(!me.disabled && t.dateValue &&
		// !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)){
		if (!me.disabled && !Ext.fly(target).hasCls(me.disabledCls)) {
			me.value[0] = monV;
			me.updateBody();
			me.fireEvent('month' + (isDouble ? 'dbl' : '') + 'click', me,
					me.value);
			me.fireEvent('select', me, me.value);
		}
	},

	/**
	 * React to a year being clicked
	 * 
	 * @private
	 * @param {HTMLElement}
	 *            target The element that was clicked
	 * @param {Boolean}
	 *            isDouble True if the event was a doubleclick
	 */
	onYearClick : function(target, isDouble) {
		var me = this;
		// me.value[1] = me.activeYear +
		// me.resolveOffset(me.years.indexOf(target), me.yearOffset);
		var yearV = me.activeYear
				+ me.resolveOffset(me.years.indexOf(target), me.yearOffset);

		// add ref by Date.js
		// if(!me.disabled && t.dateValue &&
		// !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)){
		if (!me.disabled && yearV && !Ext.fly(target).hasCls(me.disabledCls)) {
			me.value[1] = yearV;
			me.updateBody();
			me.fireEvent('year' + (isDouble ? 'dbl' : '') + 'click', me,
					me.value);
			me.fireEvent('select', me, me.value);
		}
	}
});

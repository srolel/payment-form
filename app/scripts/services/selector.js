'use strict';

/**
 * @ngdoc service
 * @name paymentApp.selector
 * @description
 * # selector
 * Factory in the paymentApp.
 */
angular.module('paymentApp')
	.factory('Selector', function (errorService) {

		var getCompFn = function (matcherFn) {
			matcherFn = typeof matcherFn === 'function' ? matcherFn : function (a, b) {
				return a === b;
			};
			return function compFn(a, b) {
				//if a is object, array or function, call compFn on its members and return if one of the calls returned true
				if (typeof a === 'object' || typeof a === 'function') {
					return !!Object.keys(a).map(function (key) {
						return compFn(a[key], b);
					}).filter(Boolean).length;
				}
				//check for case-insensitive string match
				return matcherFn(a, b);

			};
		}

		var isArrayOrString = function isArrayOrString(x) {
			return angular.isArray(x) || typeof x === 'string';
		}


		var Selector = function (_data, selectedIndex) {
			if (_data !== Object(_data)) errorService.typeError('Selector constructor argument should be an object.');
			var data = _data;
			this.selected = data[selectedIndex];
			this.get = function () {
				return data;
			};
		};

		Selector.prototype.select = function (arg, fnArgs) {
			this.selected = arg;
			if (arg && arg.onSelect) arg.onSelect.apply(arg, fnArgs);
			return this.selected;
		};

		Selector.prototype.isSelected = function (arg) {
			return this.selected === arg;
		};

		Selector.prototype.search = function (term, prop, partial, searchBy) {
			if (!term) return null;

			term = term.toString();

			var data = this.get();

			if (data[term]) return data[term];

			var isMatch = partial ? function (a, b) {
					return a.search(new RegExp(b)) > -1;
				} : function (a, b) {
					return a === b;
				}
				//Strict match vs partial match
			var matcherFn = function (a, b) {
				if (typeof a !== 'string' || typeof b !== 'string') return;
				a = a.toLowerCase(), b = b.toLowerCase();
				return isMatch(a, b);
			}

			var compFn = getCompFn(matcherFn);

			//for convenience
			searchBy = isArrayOrString(searchBy) ? searchBy : true;

			//filter countries
			var result = data.filter(function (c) {

				//properties to search by
				if (Object.keys(c).map(function (key) {
						if ((searchBy === true && key !== 'sub') || (isArrayOrString(searchBy) && searchBy.indexOf(key) > -1)) {
							return compFn(c[key], term);
						}
					}).filter(Boolean).length) {
					return true;
				}
			});

			//map to relevant requested properties
			if (prop && prop !== 'obj') {
				result = result.map(function (res) {
					return res[prop];
				})
			}

			return partial ? result : result[0] || null;
		};

		Selector.prototype.getSelected = function () {
			return this.selected;
		};

		Selector.prototype.indexOf = function (arg) {
			return this.get().indexOf(arg);
		};

		return Selector;
	});
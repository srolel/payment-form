'use strict';

/**
 * @ngdoc service
 * @name paymentApp.BlueSnap
 * @description
 * # BlueSnap
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('BlueSnap', function () {

		var publicKey = "10001$8755fb8fdc5dac24f035a3c8772c724758f9b405d2b52ac8703183c8e02bd15f7372fd5d181e64de7276ca1adb126c2cd45cee2f3e19740aa83b128041aeabe36cfaadae137e73d397beda14d2a1c2d1ce2afc837296f002985455a94e9a655664e74ea0d88a265fea241adef10f4a9937b91bc8a74ba6744305ce6955dc79baa2cba5968b39885abb9b2253fc804b9327f418d205f8c49773b80e80a88dad22eb7ffd93b8ed54807b74e0959e077f08389d15ad7a54f203fc9c4824a3a2cec830069095df1206e47b3d6844e0d8f1a27b8dfd0a5fc88d767e97b0f99fce4d7f343e9a549f19374e4fd304ff564f4af0122f3c7f12bd70f5f3bef428c9eccffd";

		function init(formId) {
			BlueSnap.publicKey = publicKey;
			BlueSnap.setTargetFormId(formId);
		}

		return {
			init: init
		}


	});
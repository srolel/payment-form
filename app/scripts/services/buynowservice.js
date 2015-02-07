'use strict';

/**
 * @ngdoc service
 * @name paymentApp.BuynowService
 * @description
 * # BuynowService
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('BuynowService', function (Countries, errorService) {

		var cards = ['visa', 'mastercard', 'amex', 'discover', 'jcb'];

		this.getCards = function getCards() {
			return cards;
		}

		//Countries Value service is an array of country objects - {name, code, abbr}
		var codes = Countries;

		//country - what to search by, field - what attribute of the lookup ersult to return, 
		//search - boolean to indicate search, searchBy - attribute to search by (name, code etc.)
		var getCountry = this.getCountry = function getCountry(country, field, search, searchBy) {

			if (!country) return null;

			country = country.toString();

			//Strict match vs partial match
			var compFn = search ? function (a, b) {
				if (!a || !b || typeof a !== 'string' || typeof b !== 'string') return errorService.typeError('invalid arguments');
				a = a.toLowerCase(), b = b.toLowerCase();
				return a.search(new RegExp(b, 'i')) > -1
			} : function (a, b) {
				if (!a || !b) return errorService.typeError('invalid arguments');
				a = a.toLowerCase(), b = b.toLowerCase();
				return a === b;
			}

			//for convenience
			if (typeof searchBy === 'string') searchBy = [searchBy];

			var searchByArr = searchBy || ['name', 'code', 'abbr'];

			if (!angular.isArray(searchByArr)) return errorService.typeError('searchBy should be an array or a string');

			//filter countries
			var result = codes.filter(function (c) {

				//properties to search by

				if (searchByArr.map(function (a) {
						return compFn(c[a], country);
					}).filter(Boolean).length) {
					return true;
				}

				//searching by alias string/array, ignore if search by specific properties requested
				if (!c.alias || searchBy) return;

				if (typeof c.alias === 'string' && compFn(c.alias, country)) {
					return true;
				}

				if (angular.isArray(c['alias'])) {
					for (var i = 0; i < c['alias'].length; i++) {
						if (compFn(c.alias[i], country)) {
							return true;
						}
					}
				}
			});

			var _field = {
				name: 'name',
				id: 'code',
				abbr: 'abbr',
				0: 'name',
				1: 'abbr',
				2: 'code',
				code: 'code'
			}[field || 1];

			//map to relevant requested properties
			if (field !== 'obj') {
				result = result.map(function (res) {
					return res[_field];
				})
			}

			return search ? result : result[0] || null;

		}

		//either get all countries (when search is falsey) or search for countries
		this.getCountries = function (search, searchBy, field) {
			if (!search) return codes;
			field = field || 'obj';
			return getCountry(search, field, true, searchBy);
		}



	}).value('Countries', [{
		"abbr": "af",
		"code": "004",
		"name": "Afghanistan"
	}, {
		"abbr": "ax",
		"code": "248",
		"name": "Åland Islands"
	}, {
		"abbr": "al",
		"code": "008",
		"name": "Albania"
	}, {
		"abbr": "dz",
		"code": "012",
		"name": "Algeria"
	}, {
		"abbr": "as",
		"code": "016",
		"name": "American Samoa"
	}, {
		"abbr": "ad",
		"code": "020",
		"name": "Andorra"
	}, {
		"abbr": "ao",
		"code": "024",
		"name": "Angola"
	}, {
		"abbr": "ai",
		"code": "660",
		"name": "Anguilla"
	}, {
		"abbr": "ag",
		"code": "028",
		"name": "Antigua and Barbuda"
	}, {
		"abbr": "ar",
		"code": "032",
		"name": "Argentina"
	}, {
		"abbr": "am",
		"code": "051",
		"name": "Armenia"
	}, {
		"abbr": "aw",
		"code": "533",
		"name": "Aruba"
	}, {
		"abbr": "au",
		"code": "036",
		"name": "Australia"
	}, {
		"abbr": "at",
		"code": "040",
		"name": "Austria"
	}, {
		"abbr": "az",
		"code": "031",
		"name": "Azerbaijan"
	}, {
		"abbr": "bs",
		"code": "044",
		"name": "Bahamas"
	}, {
		"abbr": "bh",
		"code": "048",
		"name": "Bahrain"
	}, {
		"abbr": "bd",
		"code": "050",
		"name": "Bangladesh"
	}, {
		"abbr": "bb",
		"code": "052",
		"name": "Barbados"
	}, {
		"abbr": "by",
		"code": "112",
		"name": "Belarus"
	}, {
		"abbr": "be",
		"code": "056",
		"name": "Belgium"
	}, {
		"abbr": "bz",
		"code": "084",
		"name": "Belize"
	}, {
		"abbr": "bj",
		"code": "204",
		"name": "Benin"
	}, {
		"abbr": "bm",
		"code": "060",
		"name": "Bermuda"
	}, {
		"abbr": "bt",
		"code": "064",
		"name": "Bhutan"
	}, {
		"abbr": "bo",
		"code": "068",
		"name": "Bolivia, Plurinational State of"
	}, {
		"abbr": "ba",
		"code": "070",
		"name": "Bosnia and Herzegovina"
	}, {
		"abbr": "bw",
		"code": "072",
		"name": "Botswana"
	}, {
		"abbr": "bv",
		"code": "074",
		"name": "Bouvet Island"
	}, {
		"abbr": "br",
		"code": "076",
		"name": "Brazil"
	}, {
		"abbr": "io",
		"code": "086",
		"name": "British Indian Ocean Territory"
	}, {
		"abbr": "bn",
		"code": "096",
		"name": "Brunei Darussalam"
	}, {
		"abbr": "bg",
		"code": "100",
		"name": "Bulgaria"
	}, {
		"abbr": "bf",
		"code": "854",
		"name": "Burkina Faso"
	}, {
		"abbr": "bi",
		"code": "108",
		"name": "Burundi"
	}, {
		"abbr": "kh",
		"code": "116",
		"name": "Cambodia"
	}, {
		"abbr": "cm",
		"code": "120",
		"name": "Cameroon"
	}, {
		"abbr": "ca",
		"code": "124",
		"name": "Canada"
	}, {
		"abbr": "cv",
		"code": "132",
		"name": "Cape Verde"
	}, {
		"abbr": "ky",
		"code": "136",
		"name": "Cayman Islands"
	}, {
		"abbr": "cf",
		"code": "140",
		"name": "Central African Republic"
	}, {
		"abbr": "td",
		"code": "148",
		"name": "Chad"
	}, {
		"abbr": "cl",
		"code": "152",
		"name": "Chile"
	}, {
		"abbr": "cn",
		"code": "156",
		"name": "China"
	}, {
		"abbr": "cx",
		"code": "162",
		"name": "Christmas Island"
	}, {
		"abbr": "cc",
		"code": "166",
		"name": "Cocos (Keeling) Islands"
	}, {
		"abbr": "co",
		"code": "170",
		"name": "Colombia"
	}, {
		"abbr": "km",
		"code": "174",
		"name": "Comoros"
	}, {
		"abbr": "cg",
		"code": "178",
		"name": "Congo"
	}, {
		"abbr": "cd",
		"code": "180",
		"name": "Congo, the Democratic Republic of the"
	}, {
		"abbr": "ck",
		"code": "184",
		"name": "Cook Islands"
	}, {
		"abbr": "cr",
		"code": "188",
		"name": "Costa Rica"
	}, {
		"abbr": "ci",
		"code": "384",
		"name": "Côte d'Ivoire"
	}, {
		"abbr": "hr",
		"code": "191",
		"name": "Croatia"
	}, {
		"abbr": "cu",
		"code": "192",
		"name": "Cuba"
	}, {
		"abbr": "cy",
		"code": "196",
		"name": "Cyprus"
	}, {
		"abbr": "cz",
		"code": "203",
		"name": "Czech Republic"
	}, {
		"abbr": "dk",
		"code": "208",
		"name": "Denmark"
	}, {
		"abbr": "dj",
		"code": "262",
		"name": "Djibouti"
	}, {
		"abbr": "dm",
		"code": "212",
		"name": "Dominica"
	}, {
		"abbr": "do",
		"code": "214",
		"name": "Dominican Republic"
	}, {
		"abbr": "ec",
		"code": "218",
		"name": "Ecuador"
	}, {
		"abbr": "eg",
		"code": "818",
		"name": "Egypt"
	}, {
		"abbr": "sv",
		"code": "222",
		"name": "El Salvador"
	}, {
		"abbr": "gq",
		"code": "226",
		"name": "Equatorial Guinea"
	}, {
		"abbr": "er",
		"code": "232",
		"name": "Eritrea"
	}, {
		"abbr": "ee",
		"code": "233",
		"name": "Estonia"
	}, {
		"abbr": "et",
		"code": "231",
		"name": "Ethiopia"
	}, {
		"abbr": "fk",
		"code": "238",
		"name": "Falkland Islands (Malvinas)"
	}, {
		"abbr": "fo",
		"code": "234",
		"name": "Faroe Islands"
	}, {
		"abbr": "fj",
		"code": "242",
		"name": "Fiji"
	}, {
		"abbr": "fi",
		"code": "246",
		"name": "Finland"
	}, {
		"abbr": "fr",
		"code": "250",
		"name": "France"
	}, {
		"abbr": "gf",
		"code": "254",
		"name": "French Guiana"
	}, {
		"abbr": "pf",
		"code": "258",
		"name": "French Polynesia"
	}, {
		"abbr": "tf",
		"code": "260",
		"name": "French Southern Territories"
	}, {
		"abbr": "ga",
		"code": "266",
		"name": "Gabon"
	}, {
		"abbr": "gm",
		"code": "270",
		"name": "Gambia"
	}, {
		"abbr": "ge",
		"code": "268",
		"name": "Georgia"
	}, {
		"abbr": "de",
		"code": "276",
		"name": "Germany"
	}, {
		"abbr": "gh",
		"code": "288",
		"name": "Ghana"
	}, {
		"abbr": "gi",
		"code": "292",
		"name": "Gibraltar"
	}, {
		"abbr": "gr",
		"code": "300",
		"name": "Greece"
	}, {
		"abbr": "gl",
		"code": "304",
		"name": "Greenland"
	}, {
		"abbr": "gd",
		"code": "308",
		"name": "Grenada"
	}, {
		"abbr": "gp",
		"code": "312",
		"name": "Guadeloupe"
	}, {
		"abbr": "gu",
		"code": "316",
		"name": "Guam"
	}, {
		"abbr": "gt",
		"code": "320",
		"name": "Guatemala"
	}, {
		"abbr": "gn",
		"code": "324",
		"name": "Guinea"
	}, {
		"abbr": "gw",
		"code": "624",
		"name": "Guinea-Bissau"
	}, {
		"abbr": "gy",
		"code": "328",
		"name": "Guyana"
	}, {
		"abbr": "ht",
		"code": "332",
		"name": "Haiti"
	}, {
		"abbr": "hm",
		"code": "334",
		"name": "Heard Island and McDonald Islands"
	}, {
		"abbr": "va",
		"code": "336",
		"name": "Holy See (Vatican City State)"
	}, {
		"abbr": "hn",
		"code": "340",
		"name": "Honduras"
	}, {
		"abbr": "hk",
		"code": "344",
		"name": "Hong Kong"
	}, {
		"abbr": "hu",
		"code": "348",
		"name": "Hungary"
	}, {
		"abbr": "is",
		"code": "352",
		"name": "Iceland"
	}, {
		"abbr": "in",
		"code": "356",
		"name": "India"
	}, {
		"abbr": "id",
		"code": "360",
		"name": "Indonesia"
	}, {
		"abbr": "ir",
		"code": "364",
		"name": "Iran, Islamic Republic of"
	}, {
		"abbr": "iq",
		"code": "368",
		"name": "Iraq"
	}, {
		"abbr": "ie",
		"code": "372",
		"name": "Ireland"
	}, {
		"abbr": "il",
		"code": "376",
		"name": "Israel"
	}, {
		"abbr": "it",
		"code": "380",
		"name": "Italy"
	}, {
		"abbr": "jm",
		"code": "388",
		"name": "Jamaica"
	}, {
		"abbr": "jp",
		"code": "392",
		"name": "Japan"
	}, {
		"abbr": "jo",
		"code": "400",
		"name": "Jordan"
	}, {
		"abbr": "kz",
		"code": "398",
		"name": "Kazakhstan"
	}, {
		"abbr": "ke",
		"code": "404",
		"name": "Kenya"
	}, {
		"abbr": "ki",
		"code": "296",
		"name": "Kiribati"
	}, {
		"abbr": "kp",
		"code": "408",
		"name": "Korea, Democratic People's Republic of"
	}, {
		"abbr": "kr",
		"code": "410",
		"name": "Korea, Republic of"
	}, {
		"abbr": "kw",
		"code": "414",
		"name": "Kuwait"
	}, {
		"abbr": "kg",
		"code": "417",
		"name": "Kyrgyzstan"
	}, {
		"abbr": "la",
		"code": "418",
		"name": "Lao People's Democratic Republic"
	}, {
		"abbr": "lv",
		"code": "428",
		"name": "Latvia"
	}, {
		"abbr": "lb",
		"code": "422",
		"name": "Lebanon"
	}, {
		"abbr": "ls",
		"code": "426",
		"name": "Lesotho"
	}, {
		"abbr": "lr",
		"code": "430",
		"name": "Liberia"
	}, {
		"abbr": "ly",
		"code": "434",
		"name": "Libya"
	}, {
		"abbr": "li",
		"code": "438",
		"name": "Liechtenstein"
	}, {
		"abbr": "lt",
		"code": "440",
		"name": "Lithuania"
	}, {
		"abbr": "lu",
		"code": "442",
		"name": "Luxembourg"
	}, {
		"abbr": "mo",
		"code": "446",
		"name": "Macao"
	}, {
		"abbr": "mk",
		"code": "807",
		"name": "Macedonia, the former Yugoslav Republic of"
	}, {
		"abbr": "mg",
		"code": "450",
		"name": "Madagascar"
	}, {
		"abbr": "mw",
		"code": "454",
		"name": "Malawi"
	}, {
		"abbr": "my",
		"code": "458",
		"name": "Malaysia"
	}, {
		"abbr": "mv",
		"code": "462",
		"name": "Maldives"
	}, {
		"abbr": "ml",
		"code": "466",
		"name": "Mali"
	}, {
		"abbr": "mt",
		"code": "470",
		"name": "Malta"
	}, {
		"abbr": "mh",
		"code": "584",
		"name": "Marshall Islands"
	}, {
		"abbr": "mq",
		"code": "474",
		"name": "Martinique"
	}, {
		"abbr": "mr",
		"code": "478",
		"name": "Mauritania"
	}, {
		"abbr": "mu",
		"code": "480",
		"name": "Mauritius"
	}, {
		"abbr": "yt",
		"code": "175",
		"name": "Mayotte"
	}, {
		"abbr": "mx",
		"code": "484",
		"name": "Mexico"
	}, {
		"abbr": "fm",
		"code": "583",
		"name": "Micronesia, Federated States of"
	}, {
		"abbr": "md",
		"code": "498",
		"name": "Moldova, Republic of"
	}, {
		"abbr": "mc",
		"code": "492",
		"name": "Monaco"
	}, {
		"abbr": "mn",
		"code": "496",
		"name": "Mongolia"
	}, {
		"abbr": "me",
		"code": "499",
		"name": "Montenegro"
	}, {
		"abbr": "ms",
		"code": "500",
		"name": "Montserrat"
	}, {
		"abbr": "ma",
		"code": "504",
		"name": "Morocco"
	}, {
		"abbr": "mz",
		"code": "508",
		"name": "Mozambique"
	}, {
		"abbr": "mm",
		"code": "104",
		"name": "Myanmar"
	}, {
		"abbr": "na",
		"code": "516",
		"name": "Namibia"
	}, {
		"abbr": "nr",
		"code": "520",
		"name": "Nauru"
	}, {
		"abbr": "np",
		"code": "524",
		"name": "Nepal"
	}, {
		"abbr": "nl",
		"code": "528",
		"name": "Netherlands"
	}, {
		"abbr": "nc",
		"code": "540",
		"name": "New Caledonia"
	}, {
		"abbr": "nz",
		"code": "554",
		"name": "New Zealand"
	}, {
		"abbr": "ni",
		"code": "558",
		"name": "Nicaragua"
	}, {
		"abbr": "ne",
		"code": "562",
		"name": "Niger"
	}, {
		"abbr": "ng",
		"code": "566",
		"name": "Nigeria"
	}, {
		"abbr": "nu",
		"code": "570",
		"name": "Niue"
	}, {
		"abbr": "nf",
		"code": "574",
		"name": "Norfolk Island"
	}, {
		"abbr": "mp",
		"code": "580",
		"name": "Northern Mariana Islands"
	}, {
		"abbr": "no",
		"code": "578",
		"name": "Norway"
	}, {
		"abbr": "om",
		"code": "512",
		"name": "Oman"
	}, {
		"abbr": "pk",
		"code": "586",
		"name": "Pakistan"
	}, {
		"abbr": "pw",
		"code": "585",
		"name": "Palau"
	}, {
		"abbr": "ps",
		"code": "275",
		"name": "Palestine, State of"
	}, {
		"abbr": "pa",
		"code": "591",
		"name": "Panama"
	}, {
		"abbr": "pg",
		"code": "598",
		"name": "Papua New Guinea"
	}, {
		"abbr": "py",
		"code": "600",
		"name": "Paraguay"
	}, {
		"abbr": "pe",
		"code": "604",
		"name": "Peru"
	}, {
		"abbr": "ph",
		"code": "608",
		"name": "Philippines"
	}, {
		"abbr": "pn",
		"code": "612",
		"name": "Pitcairn"
	}, {
		"abbr": "pl",
		"code": "616",
		"name": "Poland"
	}, {
		"abbr": "pt",
		"code": "620",
		"name": "Portugal"
	}, {
		"abbr": "pr",
		"code": "630",
		"name": "Puerto Rico"
	}, {
		"abbr": "qa",
		"code": "634",
		"name": "Qatar"
	}, {
		"abbr": "re",
		"code": "638",
		"name": "Réunion"
	}, {
		"abbr": "ro",
		"code": "642",
		"name": "Romania"
	}, {
		"abbr": "ru",
		"code": "643",
		"name": "Russian Federation"
	}, {
		"abbr": "rw",
		"code": "646",
		"name": "Rwanda"
	}, {
		"abbr": "bl",
		"code": "652",
		"name": "Saint Barthélemy"
	}, {
		"abbr": "sh",
		"code": "654",
		"name": "Saint Helena, Ascension and Tristan da Cunha"
	}, {
		"abbr": "kn",
		"code": "659",
		"name": "Saint Kitts and Nevis"
	}, {
		"abbr": "lc",
		"code": "662",
		"name": "Saint Lucia"
	}, {
		"abbr": "pm",
		"code": "666",
		"name": "Saint Pierre and Miquelon"
	}, {
		"abbr": "vc",
		"code": "670",
		"name": "Saint Vincent and the Grenadines"
	}, {
		"abbr": "ws",
		"code": "882",
		"name": "Samoa"
	}, {
		"abbr": "sm",
		"code": "674",
		"name": "San Marino"
	}, {
		"abbr": "st",
		"code": "678",
		"name": "Sao Tome and Principe"
	}, {
		"abbr": "sa",
		"code": "682",
		"name": "Saudi Arabia"
	}, {
		"abbr": "sn",
		"code": "686",
		"name": "Senegal"
	}, {
		"abbr": "rs",
		"code": "688",
		"name": "Serbia"
	}, {
		"abbr": "sc",
		"code": "690",
		"name": "Seychelles"
	}, {
		"abbr": "sl",
		"code": "694",
		"name": "Sierra Leone"
	}, {
		"abbr": "sg",
		"code": "702",
		"name": "Singapore"
	}, {
		"abbr": "sk",
		"code": "703",
		"name": "Slovakia"
	}, {
		"abbr": "si",
		"code": "705",
		"name": "Slovenia"
	}, {
		"abbr": "sb",
		"code": "090",
		"name": "Solomon Islands"
	}, {
		"abbr": "so",
		"code": "706",
		"name": "Somalia"
	}, {
		"abbr": "za",
		"code": "710",
		"name": "South Africa"
	}, {
		"abbr": "gs",
		"code": "239",
		"name": "South Georgia and the South Sandwich Islands"
	}, {
		"abbr": "es",
		"code": "724",
		"name": "Spain"
	}, {
		"abbr": "lk",
		"code": "144",
		"name": "Sri Lanka"
	}, {
		"abbr": "sd",
		"code": "729",
		"name": "Sudan"
	}, {
		"abbr": "sr",
		"code": "740",
		"name": "Suriname"
	}, {
		"abbr": "sj",
		"code": "744",
		"name": "Svalbard and Jan Mayen"
	}, {
		"abbr": "sz",
		"code": "748",
		"name": "Swaziland"
	}, {
		"abbr": "se",
		"code": "752",
		"name": "Sweden"
	}, {
		"abbr": "ch",
		"code": "756",
		"name": "Switzerland"
	}, {
		"abbr": "sy",
		"code": "760",
		"name": "Syrian Arab Republic"
	}, {
		"abbr": "tw",
		"code": "158",
		"name": "Taiwan, Province of China"
	}, {
		"abbr": "tj",
		"code": "762",
		"name": "Tajikistan"
	}, {
		"abbr": "tz",
		"code": "834",
		"name": "Tanzania, United Republic of"
	}, {
		"abbr": "th",
		"code": "764",
		"name": "Thailand"
	}, {
		"abbr": "tl",
		"code": "626",
		"name": "Timor-Leste"
	}, {
		"abbr": "tg",
		"code": "768",
		"name": "Togo"
	}, {
		"abbr": "tk",
		"code": "772",
		"name": "Tokelau"
	}, {
		"abbr": "to",
		"code": "776",
		"name": "Tonga"
	}, {
		"abbr": "tt",
		"code": "780",
		"name": "Trinidad and Tobago"
	}, {
		"abbr": "tn",
		"code": "788",
		"name": "Tunisia"
	}, {
		"abbr": "tr",
		"code": "792",
		"name": "Turkey"
	}, {
		"abbr": "tm",
		"code": "795",
		"name": "Turkmenistan"
	}, {
		"abbr": "tc",
		"code": "796",
		"name": "Turks and Caicos Islands"
	}, {
		"abbr": "tv",
		"code": "798",
		"name": "Tuvalu"
	}, {
		"abbr": "ug",
		"code": "800",
		"name": "Uganda"
	}, {
		"abbr": "ua",
		"code": "804",
		"name": "Ukraine"
	}, {
		"abbr": "ae",
		"code": "784",
		"name": "United Arab Emirates"
	}, {
		"abbr": "gb",
		"code": "826",
		"name": "United Kingdom",
		"alias": ["uk"]
	}, {
		"abbr": "us",
		"code": "840",
		"name": "United States",
		"alias": "usa"
	}, {
		"abbr": "um",
		"code": "581",
		"name": "United States Minor Outlying Islands"
	}, {
		"abbr": "uy",
		"code": "858",
		"name": "Uruguay"
	}, {
		"abbr": "uz",
		"code": "860",
		"name": "Uzbekistan"
	}, {
		"abbr": "vu",
		"code": "548",
		"name": "Vanuatu"
	}, {
		"abbr": "ve",
		"code": "862",
		"name": "Venezuela, Bolivarian Republic of"
	}, {
		"abbr": "vn",
		"code": "704",
		"name": "Viet Nam"
	}, {
		"abbr": "vg",
		"code": "092",
		"name": "Virgin Islands, British"
	}, {
		"abbr": "vi",
		"code": "850",
		"name": "Virgin Islands, U.S."
	}, {
		"abbr": "wf",
		"code": "876",
		"name": "Wallis and Futuna"
	}, {
		"abbr": "eh",
		"code": "732",
		"name": "Western Sahara"
	}, {
		"abbr": "ye",
		"code": "887",
		"name": "Yemen"
	}, {
		"abbr": "zm",
		"code": "894",
		"name": "Zambia"
	}, {
		"abbr": "zw",
		"code": "716",
		"name": "Zimbabwe"
	}])
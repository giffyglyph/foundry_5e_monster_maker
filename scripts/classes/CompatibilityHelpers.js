const CompatibilityHelpers = (function () {
	function hasProperty(data1, data2) {
		if (game.version >= 12) {
			return foundry.utils.hasProperty(data1, data2);
		}
		return null;
	}
	function setProperty(data1, data2) {
		if (game.version >= 12) {
			return foundry.utils.setProperty(data1, data2);
		}
		return null;
	}
	function getProperty(data1, data2) {
		if (game.version >= 12) {
			return foundry.utils.getProperty(data1, data2);
		}
		return null;
	}
	return {
		hasProperty: hasProperty,
		setProperty: setProperty,
		getProperty: getProperty
	};
})();
export default CompatibilityHelpers;
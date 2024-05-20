const CompatibilityHelpers = (function () {
	function hasProperty(...args) {
		if (game.version >= 12) {
			return foundry.utils.hasProperty(...args);
		}
		return hasProperty(...args);
	}
	function setProperty(...args) {
		if (game.version >= 12) {
			return foundry.utils.setProperty(...args);
		}
		return setProperty(...args);
	}
	function getProperty(...args) {
		if (game.version >= 12) {
			return foundry.utils.getProperty(...args);
		}
		return getProperty(...args);
	}
	return {
		hasProperty: hasProperty,
		setProperty: setProperty,
		getProperty: getProperty
	};
})();
export default CompatibilityHelpers;
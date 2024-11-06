import { GMM_ACTION_BLUEPRINT } from "../consts/GmmActionBlueprint.js";
import Shortcoder from './Shortcoder.js';
import CompatibilityHelpers from "./CompatibilityHelpers.js";

const ActionBlueprint = (function () {

    const mappings = [
        { from: "description.image", to: "img" },
        { from: "description.name", to: "name" },
        { from: "description.text", to: "system.description.value" },
        { from: "activation.cost", to: "system.activation.cost" },
        { from: "activation.type", to: "system.activation.type" },
        { from: "activation.condition", to: "system.activation.condition" },
        { from: "cover", to: "system.cover" },
        { from: "attack.type", to: "system.actionType" },
        { from: "attack.bonus", to: "system.attackBonus" },
        { from: "attack.defense", to: "system.save.ability" },
        { from: "target.value", to: "system.target.value" },
        { from: "target.units", to: "system.target.units" },
        { from: "target.type", to: "system.target.type" },
        { from: "target.width", to: "system.target.width" },
        { from: "range.value", to: "system.range.value" },
        { from: "range.long", to: "system.range.long" },
        { from: "range.units", to: "system.range.units" },
        { from: "duration.value", to: "system.duration.value" },
        { from: "duration.units", to: "system.duration.units" },
        { from: "uses.value", to: "system.uses.value" },
        { from: "uses.max", to: "system.uses.max" },
        { from: "uses.per", to: "system.uses.per" },
        { from: "resource_consumption.type", to: "system.consume.type" },
        { from: "resource_consumption.target", to: "system.consume.target" },
        { from: "resource_consumption.amount", to: "system.consume.amount" },
        { from: "recharge.value", to: "system.recharge.value" },
        { from: "recharge.is_charged", to: "system.recharge.charged" }
    ];

    function createFromItem(item) {
        const blueprint = $.extend(true, {}, GMM_ACTION_BLUEPRINT, item.flags.gmm ? _verifyBlueprint(item.flags.gmm.blueprint) : null);
        return _syncItemDataToBlueprint(blueprint, item);
    }

    function _verifyBlueprint(blueprint) {
        switch (blueprint.vid) {
            case 1:
                // Blueprint is up-to-date and requires no changes.
                return blueprint;
                break;
            default:
                console.error(`This action blueprint has an invalid version id [${blueprint.vid}] and can't be verified.`, blueprint);
                return null;
                break;
        }
    }
    function _syncItemDataToBlueprint(blueprint, item) {

        const blueprintData = blueprint.data;
        const gmmMonster = item.getOwningGmmMonster();
        try {
            mappings.forEach((x) => {
                if (CompatibilityHelpers.hasProperty(item, x.to)) {
                    CompatibilityHelpers.setProperty(blueprintData, x.from, CompatibilityHelpers.getProperty(item, x.to));
                }
            });
            //Properties
            if (CompatibilityHelpers.hasProperty(item.system, "properties") && gmmMonster) {
                Object.keys(blueprintData.properties).forEach((key, index) => {
                    if (item.system.properties.has(key))
                        blueprintData.properties[key].checked = true;
                    else
                        blueprintData.properties[key].checked = false;
                });
            }
            //Versatile damage
            if (CompatibilityHelpers.hasProperty(item.system, "damage.versatile")) {
                setProperty(blueprintData, "attack.versatile.damage", (gmmMonster) ?
                    Shortcoder.replaceShortcodes(item.system.damage?.versatile, gmmMonster)
                    : item.system.damage?.versatile);
            } else {
                CompatibilityHelpers.setProperty(blueprintData, "attack.versatile.damage", "");
            }
            //Miss damage
            if (CompatibilityHelpers.hasProperty(item.system, "formula")) {
                CompatibilityHelpers.setProperty(blueprintData, "attack.miss.damage", (gmmMonster) ?
                    Shortcoder.replaceShortcodes(item.system.formula, gmmMonster)
                    : item.system.formula);
            } else {
                CompatibilityHelpers.setProperty(blueprintData, "attack.versatile.damage", "");
            }
            // Set damage array
            if (CompatibilityHelpers.hasProperty(item.system, "damage.parts")) {
                CompatibilityHelpers.setProperty(blueprintData, "attack.hit.damage", item.system.damage?.parts.map((x) => {
                    return {
                        formula: (gmmMonster) ? Shortcoder.replaceShortcodes(x[0], gmmMonster) : x[0],
                        type: x[1]
                    };
                }));
                if (item.system.damage.parts[0]) {
                    CompatibilityHelpers.setProperty(blueprintData, 'attack.damage.formula', (gmmMonster) ? Shortcoder.replaceShortcodes(item.system.damage?.parts[0][0], gmmMonster) : item.system.damage?.parts[0][0]);
                    CompatibilityHelpers.setProperty(blueprintData, 'attack.damage.type', (gmmMonster) ? Shortcoder.replaceShortcodes(item.system.damage?.parts[0][1], gmmMonster) : item.system.damage?.parts[0][1]);
                }
            } else {
                CompatibilityHelpers.setProperty(blueprintData, "attack.hit.damage", []);
            }

            return blueprint;
        } catch (error) {
            console.error("Failed to load blueprint data from the current item", error);
            return blueprint;
        }
    }
    function getItemDataFromBlueprint(blueprint) {
        const itemData = {};

        mappings.forEach((x) => {
            if (CompatibilityHelpers.hasProperty(blueprint.data, x.from)) {
                CompatibilityHelpers.setProperty(itemData, x.to, CompatibilityHelpers.getProperty(blueprint.data, x.from));
            }
        });
        //Properties
        if (CompatibilityHelpers.hasProperty(blueprint.data, "properties")) {
            if (!itemData.system.properties)
                itemData.system.properties = new Set();

            Object.keys(blueprint.data.properties).forEach((key, index) => {
                if (blueprint.data.properties[key].checked)
                    itemData.system.properties.add(key);
                else
                    itemData.system.properties.delete(key);
            });
            itemData.system.properties = [...itemData.system.properties]; //Needs to be an array to update properly
        }
        //Versatile damage
        if (CompatibilityHelpers.hasProperty(blueprint.data, "attack.versatile.damage")) {
            CompatibilityHelpers.setProperty(itemData, "system.damage.versatile", CompatibilityHelpers.getProperty(blueprint.data, "attack.versatile.damage"));
        } else {
            CompatibilityHelpers.setProperty(blueprintData, "attack.versatile.damage", "");
        }

        //Miss damage
        if (CompatibilityHelpers.hasProperty(blueprint.data, "attack.miss.damage")) {
            CompatibilityHelpers.setProperty(itemData, "system.formula", CompatibilityHelpers.getProperty(blueprint.data, "attack.miss.damage"));
        } else {
            CompatibilityHelpers.setProperty(blueprintData, "attack.miss.damage", "");
        }
        // Set damage array
        if (CompatibilityHelpers.getProperty(blueprint.data, "attack.hit.damage")) {
            CompatibilityHelpers.setProperty(itemData, "system.damage.parts", Object.values(CompatibilityHelpers.getProperty(blueprint.data, "attack.hit.damage")).map((x) => {
                return [x.formula, x.type];
                //(gmmMonster) ? Shortcoder.replaceShortcodes(x[0], gmmMonster) : x[0]
            }));
        } else {
            CompatibilityHelpers.setProperty(itemData, "system.damage.parts", []);
        }

        return itemData;
    }

    return {
        createFromItem: createFromItem,
        getItemDataFromBlueprint: getItemDataFromBlueprint
    };
})();

export default ActionBlueprint;
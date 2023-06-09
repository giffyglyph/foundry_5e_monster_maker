export const GMM_MONSTER_ROLES = {
	controller: {
		armor_class: -2,
		hit_points: 1,
		attack_bonus: 0,
		damage_per_action: 1,
		saving_throws: -1,
		attack_dcs: 0,
		initiative: 2,
		passive_perception: 0,
		speed: 0,
		icon: "fas fa-brain"
	},
	defender: {
		armor_class: 2,
		hit_points: 1,
		attack_bonus: 0,
		damage_per_action: 1,
		saving_throws: 1,
		attack_dcs: 0,
		initiative: 0,
		passive_perception: 2,
		speed: -10,
		icon: "fas fa-shield-alt"
	},
	lurker: {
		armor_class: -4,
		hit_points: 0.5,
		attack_bonus: 2,
		damage_per_action: 1.5,
		saving_throws: -2,
		attack_dcs: 2,
		initiative: 0,
		passive_perception: 2,
		speed: 0,
		icon: "fas fa-moon"
	},
	scout: {
		armor_class: -2,
		hit_points: 1,
		attack_bonus: 0,
		damage_per_action: 0.75,
		saving_throws: -1,
		attack_dcs: 0,
		initiative: 2,
		passive_perception: 2,
		speed: 10,
		icon: "fas fa-eye"
	},
	striker: {
		armor_class: -4,
		hit_points: 1.25,
		attack_bonus: 2,
		damage_per_action: 1.25,
		saving_throws: -2,
		attack_dcs: 2,
		initiative: 0,
		passive_perception: 0,
		speed: 0,
		icon: "fas fa-fire"
	},
	supporter: {
		armor_class: -2,
		hit_points: 0.75,
		attack_bonus: 0,
		damage_per_action: 0.75,
		saving_throws: -1,
		attack_dcs: 0,
		initiative: 2,
		passive_perception: 0,
		speed: 0,
		icon: "fas fa-first-aid"
	},
	custom: {
		armor_class: 0,
		hit_points: 1,
		attack_bonus: 0,
		damage_per_action: 1,
		saving_throws: 0,
		attack_dcs: 0,
		initiative: 0,
		passive_perception: 0,
		speed: 0,
		icon: "fas fa-question"
	}
};
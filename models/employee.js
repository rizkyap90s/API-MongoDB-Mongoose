const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const employeeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: false,
			get: getPhoto,
		},
	},
	{
		// Enables timestamps
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
		toObject: { getters: true },
		toJSON: { getters: true },
	}
);

/* Getter photo */
function getPhoto(photo) {
	if (!photo || photo.includes("https") || photo.includes("http")) {
		return photo;
	}

	return `/images/employees/${photo}`;
}

// Enable soft delete, it will make delete column automaticly
employeeSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("employee", employeeSchema); // Export employee models

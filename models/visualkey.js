var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Visual key node schema
var nodeSchema = mongoose.Schema({
    name: String,
    narrative: String,
    image: String,

    data: {}
});

// Add node children to schema
nodeSchema.add({ children: [nodeSchema] });

// Visual key document schema
var documentSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },

    datasource: { type: String, required: true },
    contributors: [String],

    nodes: [nodeSchema]
});

// Create model object for the visual key
var VisualKey = mongoose.model('VisualKey', documentSchema);

// Export visual key model as module
module.exports = VisualKey;
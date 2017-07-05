define([
    'underscore',
    'jquery',
    'backbone',
    'treant',
    'text!templates/node.html'
], function (_, $, Backbone, Treant, nodeTpl) {
    var KeyView = Backbone.View.extend({
        el: '#visualkey',
        template: _.template(nodeTpl),

        initialize: function () {
            this.listenTo(this.model, 'sync', this.render);
            this.model.fetch();
        },

        render: function () {
            this.$item = $('<ul>');
            this.$el.html(this.$item);

            var document = this.model.toJSON();
            this.datasource = document.datasource;
            document.nodes.forEach(this.renderNode.bind(this));

            // This is for the old version of the list view
            this.$el.find('div').each(function () {
                $(this).parent().children('ul').toggle();
            });

            this.$el.find('div').click(function(e){
                $(this).parent().children('ul').toggle();
            });

            // Create the node structure by referencing list item ids
            function processNode(node) {
                var nodeDef = {
                    innerHTML: '#'+node._id,
                    children: node.children.map(processNode)
                };

                if (nodeDef.children.length > 0) {
                    nodeDef.collapsed = true;
                }

                return nodeDef;
            }

            // Process the nodes and render the tree
            var nodeStructure = document.nodes.map(processNode);
            this.renderTree(nodeStructure);

            return this;
        },

        renderNode: function(node) {
            var $item = $('<li>');

            var efgUrl = 'http://efg.cs.umb.edu/efg2/mapQuery?dataSourceName='
                + this.datasource + '&Scientific%20name=';

            $item.append(this.template({ node: node, efgUrl: efgUrl }));

            this.$item.append($item);

            if (node.children) {
                // Make a new nested list for children
                var $children = $('<ul>');
                $item.append($children);

                // Retain reference to parent element
                var $parent = this.$item;
                this.$item = $children;

                // Render children
                node.children.forEach(this.renderNode.bind(this));

                // Reset current element back to parent
                this.$item = $parent;
            }
        },

        renderTree: function (nodeStructure) {
            var config = {
                chart: {
                    container: "#OrganiseChart8",
                    levelSeparation: 70,
                    siblingSeparation: 60,
                    rootOrientation: "WEST",
                    nodeAlign: "BOTTOM",
                    scrollbar: "native",
                    connectors: {
                        type: "step",
                        style: {
                            "stroke-width": 2,
                            "stroke": "#ccc",

                            "arrow-end": "classic-wide-long"
                        }
                    },

                    node: {
                        collapsable: true
                    }
                },

                nodeStructure: {
                    text: "Start here",
                    children: nodeStructure
                }
            };

            new Treant(config);
        }
    });

    return KeyView;
});
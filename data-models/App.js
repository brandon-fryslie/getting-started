/**
 * This example app performs a full CRUD lifecycle of a user story.
 */
Ext.define('Rally.gettingstarted.DataModels', {
    extend: 'Rally.app.App',

    requires: [
        'Rally.data.ModelFactory.getModel'
    ],

    /**
     * The app execution entry point
     * _getStoryModel should be called here
     */
    launch: function() {
        // Get model
        this._getStoryModel({
            callback: this._getStoryModel
        });
    },

    /**
     * Use Rally.data.ModelFactory to retrieve the story data model.
     * When complete, call _createStory
     */
    _getStoryModel: function(opt) {
        return Rally.data.ModelFactory.getModel({
            type: 'userstory',
            success: this._createStory,
            scope: this
        });
    },

    /**
     * Create a new user story and persist it to the server.
     * The model's save method should be useful here.
     * When complete, call _readStory
     */
    _createStory: function(model) {
        story = Ext.create(model, {
            Name: 'Fix dang ol chicken coop'
        }).save({
            success: this._readStory,
            scope: this
        });
    },

    /**
     * Read the record you just created.
     * The model's load method should be useful here.
     * When complete call _printStory
     */
    _readStory: function(story, operation) {
        var model = story.self;
        model.load(story.getId(), {
            callback: this._printStory,
            scope: this
        });
    },

    /**
     * Print the story's FormattedID to the console.
     * The model's get method should be useful here.
     * Hint: did you remember to fetch FormattedID in _readStory?
     * Call _updateStory when done.
     */
    _printStory: function(story, operation) {
        console.log(story.getId());
        this._updateStory(story);
    },

    /**
     * Set the story's PlanEstimate to 5.
     * The model's set and save methods should be useful here.
     * When complete call _deleteStory
     */
    _updateStory: function(story) {
        story.set('PlanEstimate', 5);
        story.save({
            callback: this._deleteStory,
            scope: this
        });
    },

    /**
     * Delete the story.
     * The model's destroy method should be useful here.
     * When complete console.log a success message.
     */
    _deleteStory: function(story, operation) {
        story.destroy({
            callback: function(record, operation) {
                if (e.success) {
                    console.log('Deleted!');
                }
            }
        });
    }
});

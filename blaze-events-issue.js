if (Meteor.isClient) {
  Template.hello.helpers({
    items: function () {
      return [
        {name:"Clickable in <= 0.8.2, not in 0.8.3"},
        {name:"Works fine in both <= 0.8.2 and 0.8.3"},
        {name:"Also clickable in both"}
      ];
    }
  });
  
  eventBoundToTemplate = {};

  UI.registerHelper('widget', function() {
    // Attach event to parent template just in time
    var target = this.target;
    var template = this.template;
    if (!eventBoundToTemplate[template]) {
      console.log('Binding event to "' + template + '" template');
      var eventToBind = {};
      eventToBind['click ' + target] = function() {
        alert('Clicked');
      };
      console.log('Event bound:',eventToBind);
      Template[template].events(eventToBind);
      eventBoundToTemplate[template] = true;
    }
    console.log('Returned widget_content template with this context:',this.context);
    return Template.widget_content;
  });
  
}
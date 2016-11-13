Template.body.helpers({
  
  news: function() {
    return News.find();
  },

  questions: function() {
  	return Questions.find();
  }
  
});


// adds index to each item
UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index;
      return item;
    });
  }
});
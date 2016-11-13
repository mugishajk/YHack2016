// Template.news.helpers({
//   news1: function() {
//     return News.find();
//   },
// });

Template.home.onRendered = function() {
	news = News.find().fetch();
	console.log(news);
}
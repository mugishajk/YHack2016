// Meteor.methods(
// {
// 	'getNews': function () {

// 	}
// });


function getNews() {


var NewsObjects;

if(Meteor.isServer) {
  // alert("client");
    NewsObjects = News.find().fetch();
    console.log(NewsObjects);
}


	return NewsObjects;
}
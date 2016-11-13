Router.configure({
    layoutTemplate: 'applayout',
    trackPageView: true
});

Router.map(function() {

    this.route('home', {
        path: '/'
    });

    this.route('intro', {
        path: '/intro'
    });
    this.route('about', {
        path: '/about'
    });

    this.route('quiz', {
        path: '/quiz',
        controller: 'GeneralController'
    });

    this.route('lesson', {
        path: '/lesson',
        controller: 'GeneralController'
    });


});

Router.plugin('ensureSignedIn', {
    only: ['dashboard']
});

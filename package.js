var client = 'client', server = 'server', both = ['client', 'server'];

Package.describe({
	name: 'krt:pager',
	summary: 'Koretech Pagination Package',
	version: '0.1.1',
	git: 'https://github.com/koretech/meteor-krt-pager.git',
	documentation: null
});

Package.onUse(function(api){

	api.versionsFrom('METEOR@1.0');

	api.use([
		'krt:core@0.1.2',
		'templating',
		'session',
		'underscore',
		'tracker',
		'tmeasday:publish-counts@0.3.4',
		'iron:router@1.0.7',
		'mquandalle:bower@1.3.12_2'
	], both);

	api.imply([
		'krt:core',
		'tmeasday:publish-counts',
		'iron:router'
	]);

	api.addFiles([
		'namespaces.js',
		'model/pager.js',
		'smart.json'
	], both);

	api.addFiles([
		'components/pager.html',
		'components/pager.js',
		'components/paginatedSubscription.js'
	], client);

});

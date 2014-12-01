var client = 'client', server = 'server', both = ['client', 'server'];

Package.describe({
	name: 'krt:pager',
	summary: 'Koretech Pagination Package',
	version: '0.1.1',
	git: 'https://github.com/koretech/meteor-krt-pager.git'
});

Package.onUse(function(api){

	api.versionsFrom('METEOR@1.0');

	api.use([
		'krt:core@0.1.0',
		'templating',
		'session',
		'underscore',
		'tmeasday:publish-counts@0.3.4',
		'iron:router@1.0.3',
		'mquandalle:bower@0.1.11'
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
		'components/pager.js'
	], client);

});

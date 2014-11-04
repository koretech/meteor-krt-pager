Template.krtPagerPager.helpers({

	pages: function() {
		if (!this.name) return null;

		var pager = KRT.Pager._pagers[this.name];
		if (!pager) return null;

		var count = Counts.get(this.name);
		var pages = Math.ceil(count / pager.pageSize());

		var uri = new URI(Router.current().location.get().path);

		var q = Router.current().location.get().queryObject;
		var currentPage = parseInt(q.page) || 1;

		var data = [];
		for (var i = 1; i <= pages; ++i) {
			uri.setQuery({ page: i });
			data.push({
				text: i,
				link: uri.toString(),
				active: (currentPage == i) ? 'active' : ''
			});
		}
		return data;
	},

	prev: function() {
		var uri = new URI(Router.current().location.get().path);
		var q = Router.current().location.get().queryObject;
		var page = parseInt(q.page) || 1;
		page = page - 1;
		if (page < 1) page = 1;

		uri.setQuery({ page: page });
		return uri.toString();
	},

	next: function() {
		if (!this.name) return null;
		var pager = KRT.Pager._pagers[this.name];
		if (!pager) return null;
		var uri = new URI(Router.current().location.get().path);
		var q = Router.current().location.get().queryObject;
		var count = Counts.get(this.name);
		var pages = Math.ceil(count / pager.pageSize());

		var page = parseInt(q.page) || 0;
		page = page + 1;
		if (page > pages) page = pages;

		uri.setQuery({ page: page });
		return uri.toString();
	}

});

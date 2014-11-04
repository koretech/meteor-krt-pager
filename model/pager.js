KRT.Pager._pagers = {};

/**
 * The Pager class
 * @param params
 * @returns {Pager}
 * @constructor
 */
Pager = function(params) {
	if (this instanceof Pager) {
		this.params = params;
	} else {
		return new Pager(params);
	}

	if (!this.params.name) return null;

	this.params.pageSize = this.params.pageSize || 50;

	KRT.Pager._pagers[this.params.name] = this;
};

Pager.prototype.pageSize = function() {
	return this.params.pageSize;
};

Pager.prototype.calcSkip = function(page) {
	page = page || 1;
	if (page < 1) page = 1;
	return (this.params.pageSize * (page-1));
};

Pager.prototype.name = function() {
	return (this.params.name);
};

// Namespace defines
KRT.Pager.Pager = Pager;

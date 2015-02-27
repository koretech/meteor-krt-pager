PaginatedSubscriptionHandle = function(perPage) {
	this.perPage = perPage;
	this._limit = perPage;
	this._limitListeners = new Tracker.Dependency();
	this._loaded = 0;
	this._loadedListeners = new Tracker.Dependency();
};

PaginatedSubscriptionHandle.prototype.loaded = function() {
	this._loadedListeners.depend();
	return this._loaded;
};

PaginatedSubscriptionHandle.prototype.limit = function() {
	this._limitListeners.depend();
	return this._limit;
};

PaginatedSubscriptionHandle.prototype.ready = function() {
	return this.loaded() === this.limit();
};

// deprecated
PaginatedSubscriptionHandle.prototype.loading = function() {
	return ! this.ready();
};

PaginatedSubscriptionHandle.prototype.loadNextPage = function() {
	//console.log('Loading next page...');
	this._limit += this.perPage;
	this._limitListeners.changed();
};

PaginatedSubscriptionHandle.prototype.done = function() {
	//console.log('Setting done... loaded = limit = ' + this._limit);
	this._loaded = this._limit;
	this._loadedListeners.changed();
};

PaginatedSubscriptionHandle.prototype.reset = function() {
	this._limit = this.perPage;
	this._limitListeners.changed();
};


Meteor.subscribeWithPagination = function (/*name, arguments, perPage */) {
	var args = Array.prototype.slice.call(arguments, 0);
	var lastArg = args.pop();
	var perPage, cb = null;
	if (_.isFunction(lastArg) || _.isObject(lastArg)) {
		cb = lastArg;
		perPage = args.pop();
	} else {
		perPage = lastArg;
	}

	var handle = new PaginatedSubscriptionHandle(perPage);

	var argAutorun = Tracker.autorun(function(){
		var ourArgs = _.map(args, function(arg) {
			return _.isFunction(arg) ? arg() : arg;
		});

		// Call Meteor.subscribe("sub name", 5, null)
		//console.log('Invalidated : argAutorun');
		//console.log('Call subscribe... limit: ' + handle.limit());
		var subHandle = Meteor.subscribe.apply(this, ourArgs.concat([handle.limit(), cb]));

		// whenever the sub becomes ready, we are done. This may happen right away
		// if we are re-subscribing to an already ready subscription.
		Tracker.autorun(function() {
			//console.log('Checking if subHandle is ready...');
			if (subHandle.ready()) {
				//console.log('subHandle is ready!');
				handle.done();
			}
		});
	});


	// this will stop the subHandle, and the done autorun
	handle.stop = _.bind(argAutorun.stop, argAutorun);

	return handle;
};

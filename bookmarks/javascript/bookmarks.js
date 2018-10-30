define(function() {
	//var eventEmitter = helpers.eventEmitter;
	
	return {
		itemCounter: 0,
		allBookmarks: {},

		init: function(bookmarksData) {
			var configData = bookmarksData.configData,
				rootNode = configData.root,
				destination = bookmarksData.destination,
				fragment = document.createDocumentFragment(),
				ul = document.createElement('ul'),
				structure;
				
			//eventEmitter(this);

			destination.addEventListener('click', this._clickHandler);
			this.allBookmarks = configData.bookmarks;
			structure = this._createBookmarkNode(rootNode);

			ul.appendChild(structure);

			fragment.appendChild(ul);

			destination.className = 'tree';
			destination.appendChild(fragment);
		},

		_constructBookmarks: function(children) {
			var self = this,
				childUl = document.createElement('ul');

			children.map(function(bookmarkId) {
				var li,
					currentBookmark = self.allBookmarks[bookmarkId],
					containsChildren = currentBookmark && currentBookmark.childBookmarks.length > 0;

				if (containsChildren) {
					childUl.appendChild(self._createBookmarkNode(bookmarkId));
				} else {
					li = document.createElement('li');
					li.appendChild(self._createSpan('tree_label', currentBookmark.title, bookmarkId));

					childUl.appendChild(li);
				}
			});

			return childUl;
		},

		_createSpan: function(className, title, bookmarkId) {
			var span = document.createElement('span');

			span.className = 'tree_label';
			span.innerHTML = title;
			span.setAttribute('type', 'bookmark');
			span.setAttribute('bookmarkId', bookmarkId);

			return span;
		},

		_createBookmarkNode: function(bookmarkId) {
			var bookmark = this.allBookmarks[bookmarkId],
				bookmarksArray = bookmark.childBookmarks,
				currentItemId = 'item' + (this.itemCounter++),
				childUl = document.createElement('ul'),
				li = document.createElement('li'),
				label = document.createElement('label'),
				input = document.createElement('input');

			label.setAttribute('for', currentItemId);
			label.className = 'tree_label';
			label.appendChild(this._createSpan('', bookmark.title, bookmarkId));

			input.type = 'checkbox';
			input.id = currentItemId;

			li.appendChild(input);
			li.appendChild(label);

			if (bookmarksArray) {
				childUl = this._constructBookmarks(bookmarksArray);
			}

			li.appendChild(childUl);

			return li;
		},

		_clickHandler: function() {
			var bookmarkId, item,
				selectedElement = event.target,
				isBookmark = selectedElement.getAttribute('type') === 'bookmark';

			if (isBookmark) {
				bookmarkId = selectedElement.getAttribute('bookmarkid');
				item = this.allBookmarks[bookmarkId].event;
				//this.emit('select-bookmark', item, this);
				event.preventDefault();
			}
		}
	};
});

define(function() {
	return {
		itemCounter: 0,

		init: function(bookmarksData) {
			var configData = bookmarksData.configData,
				rootNode = configData.root,
				destination = bookmarksData.destination,
				fragment = document.createDocumentFragment(),
				ul = document.createElement('ul'),
				rootChildren, structure;

			destination.addEventListener('click', this.clickHandler);
			this.allBookmarks = configData.bookmarks;
			rootChildren = this.allBookmarks[rootNode].childBookmarks;
			structure = this.createBookmarkNode(rootNode);

			ul.appendChild(structure);

			fragment.appendChild(ul);

			destination.className = 'tree';
			destination.appendChild(fragment);
		},

		constructBookmarks: function(children) {
			var self = this;
			var childUl = document.createElement('ul');

			children.map(function(bookmark) {
				var containsChildren = self.allBookmarks[bookmark] && self.allBookmarks[bookmark].childBookmarks !== undefined;

				if (containsChildren) {
					childUl.appendChild(self.createBookmarkNode(bookmark));
				} else {
					var li = document.createElement('li');
					var span = document.createElement('span');
					span.className = 'tree_label';
					span.innerHTML = bookmark;
					span.setAttribute('type', 'bookmark');
					li.appendChild(span);

					childUl.appendChild(li);
				}
			});

			return childUl;
		},

		createBookmarkNode: function(node) {
			var bookmarksArray = this.allBookmarks[node].childBookmarks,
				currentItemId = 'item' + (this.itemCounter++),
				childUl = document.createElement('ul'),
				li = document.createElement('li'),
				label = document.createElement('label'),
				input = document.createElement('input'),
				span = document.createElement('span');

			label.setAttribute('for', currentItemId);
			label.className = 'tree_label';

			span.innerHTML = node;
			span.setAttribute('type', 'bookmark');
			label.appendChild(span);

			input.type = 'checkbox';
			input.id = currentItemId;

			li.appendChild(input);
			li.appendChild(label);

			if (bookmarksArray) {
				childUl = this.constructBookmarks(bookmarksArray);
			}

			li.appendChild(childUl);

			return li;
		},

		clickHandler: function() {
			var meta = event.target;
			var isCaret = meta.getAttribute('type') === 'caret';
			var isBookmark = !isCaret && meta.getAttribute('type') === 'bookmark';

			if (isCaret) {
				console.log('caret');
				//meta.parentElement.querySelector(".nested").classList.toggle("active");
				//meta.parentElement.nextElementSibling.nextElementSibling.classList.toggle('active');
				//meta.parentElement.children[1].classList.toggle("caret-down");
			} else if (isBookmark) {
				console.log('bookmark');
				event.preventDefault();
				//open bookmark
			}
		}
	};
});

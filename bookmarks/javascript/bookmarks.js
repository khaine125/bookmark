define(function() {
	return {
		init: function(bookmarksData) {
			var configData = bookmarksData.configData,
				rootNode = configData.root,
				destination = bookmarksData.destination,
				rootChildren;
			
			destination.addEventListener('click', this.clickHandler);
			this.allBookmarks = configData.bookmarks;
			rootChildren = this.allBookmarks[rootNode].childBookmarks
			
			var fragment = document.createDocumentFragment();
			var structureUl = document.createElement('ul');
			//var mega = this.constructBookmarks(rootChildren, structureUl);
			
			
			
			var structure = this.createBookmarkNode(rootNode);
			fragment.appendChild(structure);
			
			
			destination.appendChild(fragment);
			
			//this.constructBookmarks(bookmarksArray);
		},
		
		constructBookmarks: function(children, childUl) {
			var self = this;
			
			children.map(function(bookmark) {
				var containsChildren = self.allBookmarks[bookmark] && self.allBookmarks[bookmark].childBookmarks !== undefined;
				
				if (containsChildren) {
					childUl = self.createBookmarkNode(bookmark);
				} else {
					var li = document.createElement('li');
					var span = document.createElement('span');
					span.innerHTML = bookmark;
					li.appendChild(span);
					
					childUl.appendChild(li);
				}
			});
			
			return childUl;
		},
		
		createBookmarkNode: function(node) {
			var bookmarksArray = this.allBookmarks[node].childBookmarks;
				
			var ul = document.createElement('ul');
			var childUl = document.createElement('ul');
			var li = document.createElement('li');
			var label = document.createElement('label');
			
			var input = document.createElement('input');
			input.type = 'checkbox';
			
			var span = document.createElement('span');
			var spanTitle = document.createElement('span');
			spanTitle.innerHTML = node;
			
			
			
			
			label.appendChild(input);
			label.appendChild(span);
			
			li.appendChild(label);
			li.appendChild(spanTitle);
			
			if (bookmarksArray) {
				childUl = this.constructBookmarks(bookmarksArray, childUl);
			}
			
			li.appendChild(childUl);
			
			ul.appendChild(li);
			
			
			
			return ul;
		},
		
		
		/*
		<ul id="myUL">
			<li>
				<label>
					<input type="checkbox">
					<span></span>
				</label>
				<span>Beverages</span>
				<ul>
					<li>
						<span>Water</span>
					</li>
		*/
		
		bla: function() {
			
		},
		
		clickHandler: function() {
			var meta = event.target;
			var isCaret = meta.parentElement && meta.parentElement.tagName === 'LABEL' && meta.parentElement.children[0].checked;
			var isBookmark = !isCaret && meta.parentElement && meta.parentElement.tagName === 'LI' && meta.tagName === 'SPAN';
			
			if (isCaret) {
				//meta.parentElement.querySelector(".nested").classList.toggle("active");
				meta.parentElement.nextElementSibling.nextElementSibling.classList.toggle('active');
				meta.parentElement.children[1].classList.toggle("caret-down");
			} else if (isBookmark) {
				//open bookmark
			}
		}
	};
});
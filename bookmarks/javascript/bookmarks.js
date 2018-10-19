define(function() {
	return {
		init: function(bookmarksData) {
			var configData = bookmarksData.configData,
				allBookmarks = configData.bookmarks,
				rootNode = configData.root,
				destination = bookmarksData.destination;
			
			
			var bookmarksArray = allBookmarks[rootNode].childBookmarks;
			
			this.constructBookmarks(bookmarksArray);
			
			bookmarksArray.map(function(item) {
				console.log(item);
			});
		},
		
		bla: function() {
			
		}
	};
});
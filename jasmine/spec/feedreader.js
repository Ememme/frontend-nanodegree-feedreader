$(function() {
  describe('RSS Feeds', function() {
    /* test to make sure that the allFeeds variable has been defined and that it is not
     * empty*/
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* test that loops through each feed in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('all URLs are defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe('');
      });
    });

    /* test loopss through each feed in the allFeeds object
    * and ensures it has a name defined
    * and that the name is not empty.
    */
    it('all names are defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe('');
      });
    });
  });

  describe('The menu', function() {
    /* test that ensures the menu element is hidden by default. */
    it('menu element should be hidden by default', function() {
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });

    /* test that ensures the menu changes visibility when the menu icon is
    * clicked */

    it('should toggle menu visibility when menu element is clicked', function() {

      // 1. Check that before the click (initial state) menu is hidden
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
      // 2. Trigger click
      document.querySelector('.menu-icon-link').click();
      // 3. Check that after the click slide menu is displayed
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      // 4. Trigger another click
      document.querySelector('.menu-icon-link').click();
      // 5. Check that after the second click menu is hidden;
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  describe('Initial entries', function() {
    beforeEach(function(done) {
      //Load the first feed
      loadFeed(0, done);
    });
    /* test that ensures when the loadFeed function is called,
    * there is at least a single .entry element within the .feed container.
    */
    it('should return at least one element in the feed container', function(done) {
      var feedArray = $('.feed');
      /* QUESTION to the reviewer:
      which of the methods below is best to check if feed list is not empty?
      */
      expect(feedArray).not.toBe(null);
      expect(document.querySelector('.feed').innerHTML).not.toBe('');
      expect(feedArray.length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    const feedList = document.querySelector('.feed-list');
    let firstFeedHeader;

    beforeEach(function(done) {
      loadFeed(2, function() {
        firstFeedHeader = document.querySelector('.feed .entry').firstElementChild.innerText;
        // loads new content
        loadFeed(1, done);
      });
    });
    /*Test that ensures when a new feed is loaded by the loadFeed function
    that the content actually changes*/

    it('updates H2 content when a new feed is loaded', function(done) {
      secondFeedHeader = document.querySelector('.feed .entry').firstElementChild.innerText;
      expect(secondFeedHeader).not.toBe(firstFeedHeader);
      done();
    });
  });
}());

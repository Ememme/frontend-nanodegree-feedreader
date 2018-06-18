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
        expect(feed.url.length).not.toBe(0);
      });
    });

    /* test loopss through each feed in the allFeeds object
    * and ensures it has a name defined
    * and that the name is not empty.
    */
    it('all names are defined', function() {
      for (const feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
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
    it('should return at least one element with the class of .entry in the feed container', function(done) {
      // select all elements that have .entry class within feed
      let feedArray = document.querySelectorAll('.feed .entry');
      // check if resulting array has at least one element
      expect(feedArray.length).toBeGreaterThan(0);
      expect(feedArray.length).not.toBeLessThan(1);
      // check if first feed title is not empty
      expect(feedArray[0].innerText.length).not.toBe(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    let firstFeedHeader;
    let firstFeed;
    let secondFeed;
    let secondFeedHeader;

    beforeEach(function(done) {
      loadFeed(2, function() {
        firstFeedHeader = document.querySelector('.header-title').innerText;
        firstFeed = document.querySelector('.feed').firstElementChild.innerText;

        // loads new content
        loadFeed(1, done);

      });
    });

    /*Tests if feed content updates when a new feed is loaded by the loadFeed
    function*/
    it('updates feed contents when a new feed is loaded', function(done){
      secondFeed = document.querySelector('.feed').firstElementChild.innerText;
      expect(secondFeed).not.toBe(firstFeed);
      done();
    });

    /*Tests if header title updates when a new feed is loaded by the loadFeed
    function*/
    it('updates H2 title content when a new feed is loaded', function(done) {
      secondFeedHeader = document.querySelector('.header-title').innerText;
      expect(secondFeedHeader).not.toBe(firstFeedHeader);
      done();
    });
  });
}());

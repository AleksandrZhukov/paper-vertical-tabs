Polymer({
  noBar: false,
  barPosition: 'left',
  barWidth: 2,
  barColor: '#2196f3',
  activateEvent: 'down',
  noStretch: false,

  attached: function() {
    var observer = new MutationObserver(function() {
      this.drawBar();
    }.bind(this));

    for (var i = 0, l = this.nodes.length; i < l; i++) {
      var node = this.nodes[i];
      observer.observe(node, {attributes: true, attributeFilter: [this.excludedAttr]});
    }
  },

  selectedIndexChanged: function(old) {
    this.drawBar();
    if (this.noStretch || old === null || old === -1) { return; }
    this.$.selectionBar.classList.add('expand');
  },

  drawBar: function() {
    var barStyle = this.$.selectionBar.style;
    var contentStyle = this.$.tabsContainer.style;

    barStyle.backgroundColor = this.barColor;
    barStyle.width = this.barWidth + 'px';

    if (!this.selectedItem) {
      barStyle.height = 0;
      barStyle.top = 0;
      return;
    }

    var barHeight = 100 / this.items.length;
    barStyle.height = barHeight + '%';
    if (this.barPosition === 'right') {
      barStyle.left = 'inherit';
      barStyle.right = 0;
      contentStyle.marginRight = this.barWidth + 'px';
    }
    else contentStyle.marginLeft = this.barWidth + 'px';

    barStyle.top = barHeight * this.selectedIndex + '%';
  }

});


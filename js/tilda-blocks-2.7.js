function t300_init() {
  var bubbles = document.querySelectorAll(".t300");
  Array.prototype.forEach.call(bubbles, function (bubble) {
    var $hook = bubble.getAttribute("data-tooltip-hook"),
      $recid = bubble.getAttribute("data-tooltip-id");
    if ($hook !== "") {
      //TODO: Переписать метод tooltipster
      var $obj = $('a[href="' + $hook + '"]:not(.tooltipstered)');
      var $content = bubble.querySelector(".t300__content").innerHTML;
      var touchDevices = !1;
      if ($hook.charAt(0) == "#") {
        touchDevices = !0;
      }
      var position = bubble.getAttribute("data-tooltip-position");
      if (position === "") {
        position = "top";
      }
      $obj.tooltipster({
        theme: "t300__tooltipster-noir t300__tooltipster-noir_" + $recid + "",
        contentAsHTML: true,
        content: $content,
        interactive: true,
        touchDevices: touchDevices,
        position: position,
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  t300_init();
  setTimeout(function () {
    var tStore = document.querySelector("body .t-store");
    if (tStore) {
      Array.prototype.forEach.call(tStore, function (el, i) {
        new MutationObserver(function (mutationsList, observer) {
          for (var mutation in mutationsList) {
            var event = mutationsList[mutation];
            if (event.type === "attributes") {
              if (event.target.className.indexOf("t-popup_show") != -1) {
                t300_init();
              }
            }
          }
        }).observe(el, { attributes: !0, attributeFilter: ["class"], subtree: !0 });
      });
    }
    t300_init();
  }, 500);
});
  
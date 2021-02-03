let target = document.querySelectorAll(".observer"),
options = {rootMargin:"0",threshold:.2},
observer = new IntersectionObserver(
  function(e){
    e.forEach(
      function(e){
        if (e.isIntersecting){
          document.body.id = e.target.id+"-body";
          e.target.classList.add( "noopacity" );
        } else {
          e.target.classList.remove( "noopacity" );
        }
      }
    )
  },options
);
target.forEach(function(e){
observer.observe(e);
});;
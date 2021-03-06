var data = [
	[	"The Ultimate Coat Finder", 
  		"assets/images/coat-finder.jpg",
  		"<p>The coat finder was build as a different way for customers to find their perfect coat. The goal was to build a product that would show the value in a finder tool over the traditional index filter experience. I lead the technical design of the project, as well as implementation of the filtering scripts.</p><p>We were able to produce a tool that converted at 11% over a traditional index converting just under 8%, and secure financing for a more robust experience in the future.<p><a href='https://www.landsend.com/coat-finder/' target='_blank'>View Project</a></p>"
  	],
  	[	"Link Responsively", 
  		"assets/images/link-responsively.jpg",
  		"<p>Link Responsively was a tool we built to help bridge the gap into responsive web design. We were still using hotspot links often in our webpages and needed a quick way to create responsive hotspots.</p><p> This tool was built with designers in mind and made generating HTML a breeze.</p><p><a href='https://12oss.github.io/linkresponsively/' target='_blank'>View Project</a></p>"
  	],
    [ "The Dozer Game", 
      "assets/images/dozer.jpg",
      "<p>I’m a huge fan of vintage games. This is a remake of an old puzzle game I remember from a classic “50+ Windows ’95 Games” CD-ROM I had when I was a kid. Since I couldn’t find the game available anywhere I decided to build it myself. It's fun and addicting.</p><p><a href='http://brhendr.github.io/dozer/' target='_blank'>Play It!</a></p>"
    ],
    [ "Lands' End Applications", 
      "assets/images/le_index.jpg",
      "<p>I came to Lands’ End to help rebuild the site to accommodate all viewports, since then I’ve had the opportunity to redesign most of our web applications “mobile first”. It has been a cultural change, which has taken us down a new path of how web experiences are designed.</p><p><a href='https:www.landsend.com' target='_blank'>Take A Look</a></p>"
    ],
    [ "Adobe XD UI Kit", 
      "assets/images/ux.png",
      "<p>Even though Adobe’s new XD tool is still in beta, I love it. It has taken our prototyping to new levels of speed and accuracy. During this transition I was able to create a UI kit that allows our designer to quickly pull elements and add them to experiences. Staying on brand and working fast helps get visuals in front of product owners sooner.</p>"
    ],
    [ "Adobe Target A/B Testing", 
      "assets/images/a-b.jpg",
      "<p>Coming from a background in research and technology, I have been able to lead A/B testing efforts and collect data based on fact instead of feeling. Taking ownership of testing has helped me grow as a designer, developer, and leader. The ability to test the waters before devoting to a large-scale product development has been vital to all parts of the business.</p>"
    ]
];

$(window).on('load', function() {
  var fixedDivHeight = $('.page-intro').outerHeight();
  console.log(fixedDivHeight)
  $('.spacer').height(fixedDivHeight);
});

$('.box').on('click', function(){
	$('.overlay').toggle("slide", {direction: "down" }, 400);
	var html = data[$(this).index()];
	$('.overlay h2').html(html[0]);
	$('.overlay .content-img').attr('src' , html[1]);
	$('.overlay .info').html(html[2]);
})

$('.close').on('click', function(){
	$('.overlay').toggle("slide", {direction: "down" }, 400);
})
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Announcement bar ------------------------------------------------------ */

  var announcement = document.getElementById("announcement");

  if (announcement) {
    var messages = announcement.querySelectorAll(".announcement__item");
    var messageIndex = 0;
    var messageTimer = null;

    if (messages.length > 1) {
      var showMessage = function (index) {
        messages.forEach(function (message, i) {
          var current = i === index;
          message.classList.toggle("is-current", current);
          if (current) message.removeAttribute("aria-hidden");
          else message.setAttribute("aria-hidden", "true");
        });
        messageIndex = index;
      };

      var startMessages = function () {
        if (messageTimer) return;
        messageTimer = window.setInterval(function () {
          showMessage((messageIndex + 1) % messages.length);
        }, 4000);
      };

      var stopMessages = function () {
        window.clearInterval(messageTimer);
        messageTimer = null;
      };

      announcement.addEventListener("mouseenter", stopMessages);
      announcement.addEventListener("mouseleave", startMessages);
      startMessages();
    }
  }

  /* Header panels --------------------------------------------------------- */

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  var searchToggle = document.getElementById("search-toggle");
  var search = document.getElementById("site-search");
  var searchInput = document.getElementById("search-input");

  function setPanel(toggle, panel, open) {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
  }

  function syncHeaderState() {
    if (!header) return;
    var anyOpen =
      (navToggle && navToggle.getAttribute("aria-expanded") === "true") ||
      (searchToggle && searchToggle.getAttribute("aria-expanded") === "true");
    header.classList.toggle("is-open", Boolean(anyOpen));
  }

  function closePanels() {
    setPanel(navToggle, nav, false);
    setPanel(searchToggle, search, false);
    syncHeaderState();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") !== "true";
      setPanel(searchToggle, search, false);
      setPanel(navToggle, nav, open);
      syncHeaderState();
    });

    nav.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link) return;
      if (link.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        return;
      }
      /* Hiding the panel in this same tick cancels the link navigation. */
      window.setTimeout(closePanels, 0);
    });
  }

  if (searchToggle && search) {
    searchToggle.addEventListener("click", function () {
      var open = searchToggle.getAttribute("aria-expanded") !== "true";
      setPanel(navToggle, nav, false);
      setPanel(searchToggle, search, open);
      syncHeaderState();
      if (open && searchInput) searchInput.focus();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !header || !header.classList.contains("is-open")) return;
    var wasSearch = searchToggle && searchToggle.getAttribute("aria-expanded") === "true";
    closePanels();
    if (wasSearch) searchToggle.focus();
    else if (navToggle) navToggle.focus();
  });

  document.addEventListener("click", function (event) {
    if (!header || !header.classList.contains("is-open")) return;
    if (!header.contains(event.target)) closePanels();
  });

  /* Hero carousel --------------------------------------------------------- */

  var hero = document.querySelector(".hero");
  var progress = document.getElementById("hero-progress");

  if (hero && progress) {
    var HERO_SLIDE_COPY = [
      {
        title: "Our sun-ready favorites",
        byline: "Slip into summer style",
      },
      {
        title: "Mix. Match. Repeat.",
        byline: "Your strap, your rules",
      },
      {
        title: "Built for the beach",
        byline: "Swap in seconds",
      },
    ];

    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero__slide"));
    var segments = Array.prototype.slice.call(progress.querySelectorAll(".hero__segment"));
    var copy = hero.querySelector(".hero__copy");
    var eyebrow = hero.querySelector(".hero__eyebrow");
    var byline = hero.querySelector(".hero__byline");
    var currentSlide = 0;
    var copySwapTimer = null;

    var setSlideCopy = function (index, immediate) {
      var content = HERO_SLIDE_COPY[index];
      if (!content || !copy || !eyebrow || !byline) return;

      window.clearTimeout(copySwapTimer);

      if (immediate || reducedMotion.matches) {
        eyebrow.textContent = content.title;
        byline.textContent = content.byline;
        copy.classList.remove("is-changing");
        return;
      }

      copy.classList.add("is-changing");
      copySwapTimer = window.setTimeout(function () {
        eyebrow.textContent = content.title;
        byline.textContent = content.byline;
        copy.classList.remove("is-changing");
      }, 450);
    };

    var setSlide = function (index, immediate) {
      slides.forEach(function (slide, i) {
        var current = i === index;
        slide.classList.toggle("is-current", current);
        if (current) slide.removeAttribute("aria-hidden");
        else slide.setAttribute("aria-hidden", "true");
      });

      segments.forEach(function (segment, i) {
        if (i === index) segment.setAttribute("aria-current", "true");
        else segment.removeAttribute("aria-current");
        segment.classList.toggle("is-seen", i < index);
      });

      // Retrigger the fill animation, which is what times the slide.
      var fill = segments[index].querySelector(".hero__segment-fill");
      if (fill) {
        fill.style.animation = "none";
        void fill.offsetWidth;
        fill.style.animation = "";
      }

      setSlideCopy(index, immediate);
      currentSlide = index;
    };

    segments.forEach(function (segment, index) {
      segment.addEventListener("click", function () {
        setSlide(index);
      });
    });

    // Under reduced motion the fill has no animation, so this never fires and
    // the carousel simply waits for a click.
    progress.addEventListener("animationend", function (event) {
      if (event.animationName !== "hero-progress") return;
      setSlide((currentSlide + 1) % slides.length);
    });

    if (slides.length) setSlide(0, true);
  }

  /* Featured products carousel ------------------------------------------- */

  var FEATURED_PRODUCTS = (window.ClickClocks && window.ClickClocks.products) || [];

  var featuredTrack = document.getElementById("featured-products-track");
  var featuredPrev = document.getElementById("featured-products-prev");
  var featuredNext = document.getElementById("featured-products-next");
  var featuredStatus = document.getElementById("featured-products-status");

  if (featuredTrack && featuredPrev && featuredNext && FEATURED_PRODUCTS.length) {
    var featuredDesktop = window.matchMedia("(min-width: 1024px)");
    var featuredTablet = window.matchMedia("(min-width: 640px)");
    var featuredStart = 0;
    var featuredPageSize = 0;

    var getFeaturedPageSize = function () {
      if (featuredDesktop.matches) return 5;
      if (featuredTablet.matches) return 3;
      return 1;
    };

    var createFeaturedCard = function (product) {
      return window.ClickClocks.createProductCard(product, {
        sizes: window.ClickClocks.featuredSizes,
      });
    };

    var renderFeaturedPage = function (announce, animate) {
      featuredPageSize = getFeaturedPageSize();

      featuredTrack.textContent = "";

      var visibleNames = [];
      for (var i = 0; i < featuredPageSize; i += 1) {
        var product = FEATURED_PRODUCTS[(featuredStart + i) % FEATURED_PRODUCTS.length];
        visibleNames.push(product.name);
        featuredTrack.appendChild(createFeaturedCard(product));
      }

      featuredTrack.classList.remove("is-entering");
      if (animate && !reducedMotion.matches) {
        void featuredTrack.offsetWidth;
        featuredTrack.classList.add("is-entering");
      }

      if (featuredStatus) {
        featuredStatus.textContent =
          (announce ? "Now showing " : "Showing ") + visibleNames.join(", ") + ".";
      }
    };

    var moveFeaturedPage = function (direction) {
      featuredStart =
        (featuredStart + direction * getFeaturedPageSize() + FEATURED_PRODUCTS.length) %
        FEATURED_PRODUCTS.length;
      renderFeaturedPage(true, true);
    };

    featuredPrev.addEventListener("click", function () {
      moveFeaturedPage(-1);
    });

    featuredNext.addEventListener("click", function () {
      moveFeaturedPage(1);
    });

    var syncFeaturedPageSize = function () {
      var nextSize = getFeaturedPageSize();
      if (nextSize === featuredPageSize) return;
      renderFeaturedPage(false, false);
    };

    if (featuredDesktop.addEventListener) {
      featuredDesktop.addEventListener("change", syncFeaturedPageSize);
      featuredTablet.addEventListener("change", syncFeaturedPageSize);
    } else {
      featuredDesktop.addListener(syncFeaturedPageSize);
      featuredTablet.addListener(syncFeaturedPageSize);
    }

    renderFeaturedPage(false, false);
  }

  /* How it works ---------------------------------------------------------- */

  var HOW_IT_WORKS = {
    title: "How It Works",
    steps: [
      {
        label: "STEP 1",
        title: "Choose Your Base",
        body:
          "Unlike other flip flops or sandals, CC's have a base that comes with detachable straps so you can customize your shoes to match your outfit. Both our flip flops and slides come with the option of a black or white base.",
        image: "how-it-works-base",
        alt: "Black flip-flop and slide bases with detachable strap pieces on a light studio background.",
      },
      {
        label: "STEP 2",
        title: "Choose Your Straps",
        body:
          "You can completely customize your CC's by choosing the colors and designs that match your style. With our simple twist technology, all the straps are interchangeable so you can easily change up your look without changing your shoes.",
        image: "how-it-works-straps",
        alt: "Blue, coral and black interchangeable flip-flop straps arranged on a light studio background.",
      },
      {
        label: "STEP 3",
        title: "Show Off Your Style",
        body:
          "Once you have your base and your straps, you're ready to show off your style. With CC's, you can switch up your style with a quick twist of the straps. Collect as many straps as you have outfits.",
        image: "how-it-works-style",
        alt: "Person sitting at the edge of a pool wearing cobalt blue Click Clocks flip-flops.",
      },
    ],
  };

  var howItWorksSteps = document.getElementById("how-it-works-steps");

  if (howItWorksSteps && HOW_IT_WORKS.steps.length) {
    var howItWorksSizes = "(min-width: 1024px) 33vw, (min-width: 768px) 30vw, 100vw";

    HOW_IT_WORKS.steps.forEach(function (step) {
      var item = document.createElement("li");
      item.className = "how-it-works__step";

      var media = document.createElement("div");
      media.className = "how-it-works__media";

      var picture = document.createElement("picture");
      var source = document.createElement("source");
      source.type = "image/webp";
      source.srcset =
        "images/" + step.image + "-480.webp 480w, images/" + step.image + "-800.webp 800w";
      source.sizes = howItWorksSizes;

      var image = document.createElement("img");
      image.src = "images/" + step.image + "-800.jpg";
      image.srcset =
        "images/" + step.image + "-480.jpg 480w, images/" + step.image + "-800.jpg 800w";
      image.sizes = howItWorksSizes;
      image.width = 800;
      image.height = 800;
      image.alt = step.alt;
      image.loading = "lazy";
      image.decoding = "async";

      picture.appendChild(source);
      picture.appendChild(image);
      media.appendChild(picture);

      var label = document.createElement("p");
      label.className = "how-it-works__label";
      label.textContent = step.label;

      var title = document.createElement("h3");
      title.className = "how-it-works__title";
      title.textContent = step.title;

      var body = document.createElement("p");
      body.className = "how-it-works__body";
      body.textContent = step.body;

      item.appendChild(media);
      item.appendChild(label);
      item.appendChild(title);
      item.appendChild(body);
      howItWorksSteps.appendChild(item);
    });
  }

  /* Interactive story timeline ------------------------------------------- */

  var STORY_MILESTONES = [
    {
      title: "The Idea",
      date: "2024",
      body:
        "It started with a simple frustration: why can't you change your flip-flop straps without buying a whole new pair?",
      image: "story-01",
      alt: "Sketchbook with early removable sandal strap drawings and material samples.",
    },
    {
      title: "First Prototype",
      date: "Early 2025",
      body:
        "The first Click Clocks prototype was built in a garage. Messy, imperfect, and exactly what we needed to prove the concept worked.",
      image: "story-02",
      alt: "Hands testing a rough removable flip-flop strap prototype at a garage workbench.",
    },
    {
      title: "The Brand Takes Shape",
      date: "Mid 2025",
      body:
        "Quick Connect Footwear, LLC was formed. The name Click Clocks stuck. The mission became clear: customizable footwear that doesn't cost the earth.",
      image: "story-03",
      alt: "Customizable sandal prototypes, material swatches and packaging studies on a design table.",
    },
    {
      title: "First Drop",
      date: "2026",
      body:
        "The Element Edition launched. Roots, Flow, Fire, Breathe: four straps, four moods, one base. The response blew us away.",
      image: "story-04",
      alt: "Green, blue, coral and white interchangeable straps arranged around one black flip-flop base.",
    },
    {
      title: "What's Next",
      date: "Coming Soon",
      body:
        "New colorways, brand collabs, and a full slide collection. We're just getting started.",
      image: "story-05",
      alt: "Future Click Clocks slide and flip-flop colorways arranged across a bright design studio table.",
    },
  ];

  var storyStage = document.getElementById("story-timeline-stage");
  var storyMedia = document.getElementById("story-timeline-media");
  var storyMediaWrap = document.querySelector(".story-timeline__media-wrap");
  var storyContent = document.getElementById("story-timeline-content");
  var storyDate = document.getElementById("story-timeline-date");
  var storyTitle = document.getElementById("story-timeline-milestone-title");
  var storyBody = document.getElementById("story-timeline-body");
  var storyDots = document.getElementById("story-timeline-dots");
  var storyFill = document.getElementById("story-timeline-fill");
  var storyPrev = document.getElementById("story-timeline-prev");
  var storyNext = document.getElementById("story-timeline-next");

  if (
    storyStage &&
    storyMedia &&
    storyContent &&
    storyDate &&
    storyTitle &&
    storyBody &&
    storyDots &&
    storyFill &&
    storyPrev &&
    storyNext &&
    STORY_MILESTONES.length
  ) {
    var storyIndex = 0;
    var storySwapTimer = null;

    var storyPicture = document.createElement("picture");
    var storyWebp = document.createElement("source");
    var storyImage = document.createElement("img");

    storyWebp.type = "image/webp";
    storyImage.width = 1024;
    storyImage.height = 768;
    storyImage.loading = "lazy";
    storyImage.decoding = "async";
    storyPicture.appendChild(storyWebp);
    storyPicture.appendChild(storyImage);
    storyMedia.appendChild(storyPicture);

    var storyDotButtons = STORY_MILESTONES.map(function (milestone, index) {
      var item = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "story-timeline__dot";
      button.setAttribute(
        "aria-label",
        "Show milestone " + (index + 1) + " of " + STORY_MILESTONES.length + ": " + milestone.title
      );
      button.addEventListener("click", function () {
        showStoryMilestone(index);
      });
      item.appendChild(button);
      storyDots.appendChild(item);
      return button;
    });

    var updateStoryContent = function (milestone) {
      storyWebp.srcset =
        "images/" +
        milestone.image +
        "-640.webp 640w, images/" +
        milestone.image +
        "-1024.webp 1024w";
      storyWebp.sizes = "(min-width: 768px) 46vw, 100vw";
      storyImage.src = "images/" + milestone.image + "-1024.jpg";
      storyImage.srcset =
        "images/" +
        milestone.image +
        "-640.jpg 640w, images/" +
        milestone.image +
        "-1024.jpg 1024w";
      storyImage.sizes = storyWebp.sizes;
      storyImage.alt = milestone.alt;
      storyDate.textContent = milestone.date;
      storyTitle.textContent = milestone.title;
      storyBody.textContent = milestone.body;
    };

    var showStoryMilestone = function (index, immediate) {
      var nextIndex = Math.max(0, Math.min(index, STORY_MILESTONES.length - 1));
      var milestone = STORY_MILESTONES[nextIndex];
      window.clearTimeout(storySwapTimer);

      storyDotButtons.forEach(function (button, dotIndex) {
        button.classList.toggle("is-past", dotIndex < nextIndex);
        button.classList.toggle("is-active", dotIndex === nextIndex);
        if (dotIndex === nextIndex) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });

      storyFill.style.transform =
        "translateX(-50%) scaleY(" +
        (STORY_MILESTONES.length === 1
          ? "0"
          : nextIndex / (STORY_MILESTONES.length - 1)) +
        ")";
      storyPrev.disabled = nextIndex === 0;
      storyNext.disabled = nextIndex === STORY_MILESTONES.length - 1;
      storyIndex = nextIndex;

      if (immediate || reducedMotion.matches) {
        updateStoryContent(milestone);
        if (storyMediaWrap) storyMediaWrap.classList.remove("is-changing");
        storyContent.classList.remove("is-changing");
        return;
      }

      if (storyMediaWrap) storyMediaWrap.classList.add("is-changing");
      storyContent.classList.add("is-changing");
      storySwapTimer = window.setTimeout(function () {
        updateStoryContent(milestone);
        if (storyMediaWrap) storyMediaWrap.classList.remove("is-changing");
        storyContent.classList.remove("is-changing");
      }, 450);
    };

    storyPrev.addEventListener("click", function () {
      showStoryMilestone(storyIndex - 1);
    });

    storyNext.addEventListener("click", function () {
      showStoryMilestone(storyIndex + 1);
    });

    showStoryMilestone(0, true);
  }

  /* Why Click Clocks Are Different ---------------------------------------- */

  var WHY_CLICK_CLOCKS = [
    {
      title: "Sustainable & Durable",
      body:
        "Our straps are virtually indestructible, built to withstand daily wear while remaining comfortable and stylish.",
      image: "why-durable",
      alt: "Two people walking along a wooden boardwalk in charcoal and cream slides.",
    },
    {
      title: "Endless Variety",
      body:
        "Instead of buying entirely new flip-flops, you can simply purchase new straps in fresh colors and designs released every year.",
      image: "why-variety",
      alt: "A black flip-flop surrounded by olive, coral, navy and cream interchangeable straps.",
    },
    {
      title: "Eco-Friendly Soles",
      body:
        "Our lightweight soles are replaceable at a fraction of the cost. When returned, your old soles are responsibly recycled and repurposed through partner organizations, keeping waste out of landfills and oceans.",
      image: "why-eco",
      alt: "Person sitting cross-legged outdoors beside flip-flops with a coral strap.",
    },
    {
      title: "Positive Impact",
      body:
        "Every pair of Click Clocks purchased helps support Blue Waters and other nonprofit organizations dedicated to protecting marine environments, reducing plastic pollution, and creating a cleaner, healthier planet.",
      image: "why-impact",
      alt: "Person sitting at the edge of a sunlit pool wearing cobalt blue flip-flops.",
    },
    {
      title: "A Step Toward Change",
      body:
        "Every step you take in Click Clocks is a step toward reducing ocean plastic and protecting our planet. Together, we can transform the way we think about footwear.",
      image: "why-change",
      alt: "Grey flip-flops with blue, coral and white straps laid out on stone beside clear water.",
    },
  ];

  var whyCarousel = document.getElementById("why-carousel");
  var whySlides = document.getElementById("why-slides");
  var whyProgress = document.getElementById("why-progress");
  var whyPrev = document.getElementById("why-prev");
  var whyNext = document.getElementById("why-next");

  if (whyCarousel && whySlides && whyProgress && WHY_CLICK_CLOCKS.length) {
    var whySizes = "(min-width: 640px) 50vw, 100vw";
    var whyCurrent = 0;
    var whySlideEls = [];
    var whySegments = [];
    var whyClock = document.createElement("span");
    var whyClockShift = document.createElement("span");
    var whyClockFill = document.createElement("span");

    whyClock.className = "why-carousel__clock";
    whyClock.setAttribute("aria-hidden", "true");
    whyClock.style.setProperty("--why-n", String(WHY_CLICK_CLOCKS.length));
    whyClockShift.className = "why-carousel__clock-shift";
    whyClockFill.className = "why-carousel__clock-fill";
    whyClockShift.appendChild(whyClockFill);
    whyClock.appendChild(whyClockShift);
    whyProgress.appendChild(whyClock);

    WHY_CLICK_CLOCKS.forEach(function (slide, index) {
      var item = document.createElement("li");
      item.className = "why-carousel__slide";
      if (index !== 0) item.setAttribute("aria-hidden", "true");

      var media = document.createElement("div");
      media.className = "why-carousel__media";

      var picture = document.createElement("picture");
      var source = document.createElement("source");
      source.type = "image/webp";
      source.srcset =
        "images/" + slide.image + "-768.webp 768w, images/" + slide.image + "-1200.webp 1200w";
      source.sizes = whySizes;

      var image = document.createElement("img");
      image.src = "images/" + slide.image + "-1200.jpg";
      image.srcset =
        "images/" + slide.image + "-768.jpg 768w, images/" + slide.image + "-1200.jpg 1200w";
      image.sizes = whySizes;
      image.width = 1200;
      image.height = 900;
      image.alt = slide.alt;
      image.loading = "lazy";
      image.decoding = "async";

      picture.appendChild(source);
      picture.appendChild(image);
      media.appendChild(picture);

      var panel = document.createElement("div");
      panel.className = "why-carousel__panel";

      var eyebrow = document.createElement("p");
      eyebrow.className = "why-carousel__eyebrow";
      eyebrow.textContent = (index + 1 < 10 ? "0" : "") + (index + 1);

      var title = document.createElement("h3");
      title.className = "why-carousel__title";
      title.textContent = slide.title;

      var body = document.createElement("p");
      body.className = "why-carousel__body";
      body.textContent = slide.body;

      panel.appendChild(eyebrow);
      panel.appendChild(title);
      panel.appendChild(body);

      item.appendChild(media);
      item.appendChild(panel);
      whySlides.appendChild(item);
      whySlideEls.push(item);

      var segment = document.createElement("button");
      segment.className = "why-carousel__segment";
      segment.type = "button";
      segment.setAttribute(
        "aria-label",
        "Show slide " + (index + 1) + " of " + WHY_CLICK_CLOCKS.length
      );

      var track = document.createElement("span");
      track.className = "why-carousel__segment-track";
      var fill = document.createElement("span");
      fill.className = "why-carousel__segment-fill";
      track.appendChild(fill);
      segment.appendChild(track);

      segment.addEventListener("click", function () {
        setWhySlide(index);
      });

      whyProgress.insertBefore(segment, whyClock);
      whySegments.push(segment);
    });

    var setWhySlide = function (index) {
      var next = (index + WHY_CLICK_CLOCKS.length) % WHY_CLICK_CLOCKS.length;

      whySlideEls.forEach(function (slide, i) {
        var current = i === next;
        slide.classList.toggle("is-current", current);
        if (current) slide.removeAttribute("aria-hidden");
        else slide.setAttribute("aria-hidden", "true");
      });

      whySegments.forEach(function (segment, i) {
        if (i === next) segment.setAttribute("aria-current", "true");
        else segment.removeAttribute("aria-current");
        segment.classList.toggle("is-seen", i < next);
      });

      whyClock.style.setProperty("--why-i", String(next));
      whyCurrent = next;
    };

    if (whyPrev) {
      whyPrev.addEventListener("click", function () {
        setWhySlide(whyCurrent - 1);
      });
    }

    if (whyNext) {
      whyNext.addEventListener("click", function () {
        setWhySlide(whyCurrent + 1);
      });
    }

    // The clock fill uses --slide-duration / hero-progress, the same token
    // and keyframes as the hero. Restarting it here would reset the timer;
    // arrow and segment clicks only change the visible slide.
    if (!reducedMotion.matches) {
      whyClockFill.addEventListener("animationend", function (event) {
        if (event.animationName !== "hero-progress") return;
        setWhySlide(whyCurrent + 1);
        whyClockFill.style.animation = "none";
        void whyClockFill.offsetWidth;
        whyClockFill.style.animation = "";
      });
    }

    setWhySlide(0);
  }

  /* Scroll reveal --------------------------------------------------------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function revealAll() {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var siblings = Array.prototype.slice.call(entry.target.parentNode.children);
          var position = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = Math.min(position, 3) * 80 + "ms";
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }
})();

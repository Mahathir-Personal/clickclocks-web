(function (root) {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Product records are the single source for homepage featured cards and
     collection grids. Collection, type, and color fields are what the filter
     bar reads. Filtering is client-side until a backend is wired up. */
  var PRODUCTS = [
    {
      name: "Elite Package - Black Slides",
      price: "$125.00",
      priceValue: 125,
      href: "https://quickconnectfootwear.com/product/Elite-Package-Black-Slides",
      slug: "elite-package-black-slides",
      angles: 6,
      alt: "Pair of black slide sandals on a light gray studio background.",
      gender: "unisex",
      type: "slides",
      colors: ["black"],
      sizes: [8, 9, 10, 11, 12, 13],
      collection: "elite-package",
      print: "solid",
      detail: "minimalist",
      newest: true,
      bestSeller: true,
    },
    {
      name: "Elite Package - White Slides",
      price: "$125.00",
      priceValue: 125,
      href: "https://quickconnectfootwear.com/product/Elite-Package-White-Slides",
      slug: "elite-package-white-slides",
      angles: 6,
      alt: "Pair of white slide sandals on a light gray studio background.",
      gender: "unisex",
      type: "slides",
      colors: ["white"],
      sizes: [8, 9, 10, 11, 12, 13],
      collection: "elite-package",
      print: "solid",
      detail: "minimalist",
      newest: true,
      bestSeller: false,
    },
    {
      name: "Element Edition Bundle",
      price: "$64.00",
      priceValue: 64,
      href: "https://quickconnectfootwear.com/product/Element-Edition-Bundle",
      slug: "element-edition-bundle",
      angles: 6,
      alt: "Charcoal flip-flop soles with cobalt, coral and white interchangeable straps.",
      gender: "unisex",
      type: "bundles",
      colors: ["multi"],
      sizes: [7, 8, 9, 10, 11, 12],
      collection: "element-edition",
      print: "solid",
      detail: "textured",
      newest: false,
      bestSeller: true,
    },
    {
      name: "Element Edition Straps",
      price: "$20.00",
      priceValue: 20,
      href: "https://quickconnectfootwear.com/product/Element-Edition-Straps",
      slug: "element-edition-straps",
      angles: 5,
      alt: "Cobalt, coral and charcoal interchangeable flip-flop straps.",
      gender: "unisex",
      type: "straps",
      colors: ["multi", "blue", "red"],
      sizes: [],
      collection: "element-edition",
      print: "solid",
      detail: "textured",
      newest: false,
      bestSeller: true,
    },
    {
      name: "Regular Straps",
      price: "$14.99",
      priceValue: 14.99,
      href: "https://quickconnectfootwear.com/product/Regular-Straps",
      slug: "regular-straps",
      angles: 5,
      alt: "Black and white replacement flip-flop straps on a light gray background.",
      gender: "unisex",
      type: "straps",
      colors: ["black", "white"],
      sizes: [],
      collection: "regular",
      print: "solid",
      detail: "minimalist",
      newest: false,
      bestSeller: false,
    },
    {
      name: "Roots",
      price: "$20.00",
      priceValue: 20,
      href: "https://quickconnectfootwear.com/product/Roots",
      slug: "roots",
      angles: 5,
      alt: "Tan and forest green woven-texture flip-flop straps.",
      gender: "unisex",
      type: "straps",
      colors: ["brown", "green"],
      sizes: [],
      collection: "element-edition",
      print: "patterned",
      detail: "textured",
      newest: false,
      bestSeller: false,
    },
    {
      name: "Flow",
      price: "$20.00",
      priceValue: 20,
      href: "/product/Flow",
      slug: "flow",
      angles: 5,
      alt: "Ocean blue interchangeable flip-flop straps with a wave texture.",
      gender: "unisex",
      type: "straps",
      colors: ["blue"],
      sizes: [],
      collection: "element-edition",
      print: "patterned",
      detail: "textured",
      newest: true,
      bestSeller: false,
    },
    {
      name: "Fire",
      price: "$20.00",
      priceValue: 20,
      href: "/product/Fire",
      slug: "fire",
      angles: 5,
      alt: "Coral red interchangeable flip-flop straps on a pale studio background.",
      gender: "unisex",
      type: "straps",
      colors: ["red"],
      sizes: [],
      collection: "element-edition",
      print: "solid",
      detail: "textured",
      newest: true,
      bestSeller: false,
    },
    {
      name: "Breathe",
      price: "$20.00",
      priceValue: 20,
      href: "/product/Breathe",
      slug: "breathe",
      angles: 5,
      alt: "White and pale blue interchangeable flip-flop straps with a woven texture.",
      gender: "unisex",
      type: "straps",
      colors: ["white", "blue"],
      sizes: [],
      collection: "element-edition",
      print: "patterned",
      detail: "textured",
      newest: true,
      bestSeller: false,
    },
    {
      name: "Elite Package - Black",
      price: "Out of Stock",
      priceValue: 125,
      slug: "elite-package-black",
      angles: 6,
      alt: "Monochrome black flip-flops and slides with removable bands.",
      outOfStock: true,
      gender: "men",
      type: "flip-flops",
      colors: ["black"],
      sizes: [8, 9, 10, 11, 12],
      collection: "elite-package",
      print: "solid",
      detail: "minimalist",
      newest: false,
      bestSeller: false,
    },
  ];

  var COLLECTION_PAGES = {
    "new-arrivals": {
      title: "New Arrivals",
      eyebrow: "Men",
      match: function (product) {
        return product.newest;
      },
    },
    "best-sellers": {
      title: "Best Sellers",
      eyebrow: "Men",
      match: function (product) {
        return product.bestSeller;
      },
    },
    "element-edition": {
      title: "Element Edition",
      eyebrow: "Men",
      match: function (product) {
        return product.collection === "element-edition";
      },
    },
    "elite-packages": {
      title: "Elite Packages",
      eyebrow: "Men",
      match: function (product) {
        return product.collection === "elite-package";
      },
    },
    "flip-flops": {
      title: "Flip-Flops",
      eyebrow: "Men",
      match: function (product) {
        return product.type === "flip-flops";
      },
    },
    slides: {
      title: "Slides",
      eyebrow: "Men",
      match: function (product) {
        return product.type === "slides";
      },
    },
    straps: {
      title: "Straps",
      eyebrow: "Men",
      match: function (product) {
        return product.type === "straps";
      },
    },
    bundles: {
      title: "Bundles",
      eyebrow: "Men",
      match: function (product) {
        return product.type === "bundles";
      },
    },
    "collab-drop-01": {
      title: "Collab Drop 01",
      eyebrow: "Men",
      match: null,
    },
    "collab-drop-02": {
      title: "Collab Drop 02",
      eyebrow: "Men",
      match: null,
    },
  };

  var FILTER_FIELDS = [
    {
      key: "gender",
      label: "Gender",
      options: [
        { value: "men", label: "Men" },
        { value: "women", label: "Women" },
        { value: "unisex", label: "Unisex" },
      ],
    },
    {
      key: "type",
      label: "Product Type",
      options: [
        { value: "flip-flops", label: "Flip-Flops" },
        { value: "slides", label: "Slides" },
        { value: "straps", label: "Straps" },
        { value: "bundles", label: "Bundles" },
      ],
    },
    {
      key: "color",
      label: "Color",
      options: [
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
        { value: "brown", label: "Brown" },
        { value: "blue", label: "Blue" },
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "multi", label: "Multi" },
      ],
    },
    {
      key: "size",
      label: "Size",
      options: [6, 7, 8, 9, 10, 11, 12, 13].map(function (size) {
        return { value: String(size), label: String(size) };
      }),
    },
    {
      key: "price",
      label: "Price",
      options: [
        { value: "under-20", label: "Under $20" },
        { value: "20-50", label: "$20-$50" },
        { value: "50-100", label: "$50-$100" },
        { value: "100-plus", label: "$100+" },
      ],
    },
    {
      key: "collection",
      label: "Collection",
      options: [
        { value: "element-edition", label: "Element Edition" },
        { value: "elite-package", label: "Elite Package" },
        { value: "regular", label: "Regular" },
        { value: "yoga-mood", label: "Yoga Mood" },
      ],
    },
    {
      key: "print",
      label: "Print",
      options: [
        { value: "solid", label: "Solid" },
        { value: "patterned", label: "Patterned" },
        { value: "graphic", label: "Graphic" },
      ],
    },
    {
      key: "detail",
      label: "Detail",
      options: [
        { value: "minimalist", label: "Minimalist" },
        { value: "textured", label: "Textured" },
        { value: "embossed", label: "Embossed" },
      ],
    },
    {
      key: "sort",
      label: "Sort By",
      options: [
        { value: "relevant", label: "Most Relevant" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "newest", label: "Newest" },
        { value: "best-sellers", label: "Best Sellers" },
      ],
    },
  ];

  var GRID_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
  var FEATURED_SIZES = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw";

  var padAngle = function (index) {
    return index < 9 ? "0" + (index + 1) : String(index + 1);
  };

  var anglePath = function (slug, index, width, ext) {
    return "/images/" + slug + "-angle-" + padAngle(index) + "-" + width + "." + ext;
  };

  var angleSrcset = function (slug, index, ext) {
    return anglePath(slug, index, 480, ext) + " 480w, " + anglePath(slug, index, 800, ext) + " 800w";
  };

  var createProductCard = function (product, options) {
    var sizes = (options && options.sizes) || GRID_SIZES;
    var card = document.createElement("li");
    card.className = "featured-product-card";

    var media = document.createElement("div");
    media.className = "featured-product-card__media";

    var picture = document.createElement("picture");
    var webp = document.createElement("source");
    webp.type = "image/webp";
    webp.sizes = sizes;

    var image = document.createElement("img");
    image.sizes = sizes;
    image.width = 800;
    image.height = 800;
    image.loading = "lazy";
    image.decoding = "async";

    picture.appendChild(webp);
    picture.appendChild(image);
    media.appendChild(picture);

    var dots = document.createElement("div");
    dots.className = "featured-product-card__dots";

    var angleIndex = 0;
    var dotButtons = [];

    var showAngle = function (index) {
      var count = product.angles;
      angleIndex = ((index % count) + count) % count;
      webp.srcset = angleSrcset(product.slug, angleIndex, "webp");
      image.src = anglePath(product.slug, angleIndex, 800, "jpg");
      image.srcset = angleSrcset(product.slug, angleIndex, "jpg");
      image.alt = product.alt + " Angle " + (angleIndex + 1) + " of " + count + ".";
      dotButtons.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === angleIndex);
      });
    };

    for (var d = 0; d < product.angles; d += 1) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "featured-product-card__dot";
      dot.tabIndex = -1;
      dot.setAttribute("aria-label", "Show " + product.name + " angle " + (d + 1));
      if (!reducedMotion.matches) {
        dot.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          showAngle(Number(event.currentTarget.getAttribute("data-angle")));
        });
      }
      dot.setAttribute("data-angle", String(d));
      dots.appendChild(dot);
      dotButtons.push(dot);
    }

    if (!reducedMotion.matches) {
      var prevAngle = document.createElement("button");
      prevAngle.type = "button";
      prevAngle.className = "featured-product-card__angle featured-product-card__angle--prev";
      prevAngle.tabIndex = -1;
      prevAngle.setAttribute("aria-label", "Previous " + product.name + " photo");
      prevAngle.innerHTML = "<span aria-hidden=\"true\">&#8249;</span>";
      prevAngle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        showAngle(angleIndex - 1);
      });

      var nextAngle = document.createElement("button");
      nextAngle.type = "button";
      nextAngle.className = "featured-product-card__angle featured-product-card__angle--next";
      nextAngle.tabIndex = -1;
      nextAngle.setAttribute("aria-label", "Next " + product.name + " photo");
      nextAngle.innerHTML = "<span aria-hidden=\"true\">&#8250;</span>";
      nextAngle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        showAngle(angleIndex + 1);
      });

      media.appendChild(prevAngle);
      media.appendChild(nextAngle);
    }

    var body = document.createElement("div");
    body.className = "featured-product-card__body";

    var name = document.createElement("h3");
    name.className = "featured-product-card__name";
    name.textContent = product.name;

    var price = document.createElement("p");
    price.className = "featured-product-card__price";
    price.textContent = product.price;

    var cta = document.createElement(product.outOfStock ? "span" : "a");
    cta.className = "image-cta image-cta--card";
    if (product.outOfStock) {
      cta.classList.add("image-cta--disabled");
      cta.setAttribute("aria-disabled", "true");
    } else {
      cta.href = product.href;
    }

    var label = document.createElement("span");
    label.className = "image-cta__label";
    label.textContent = "Shop Now";

    var arrow = document.createElement("span");
    arrow.className = "image-cta__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "\u2192";

    cta.appendChild(label);
    cta.appendChild(arrow);
    if (product.outOfStock) {
      var badge = document.createElement("span");
      badge.className = "featured-product-card__badge";
      badge.textContent = "Out of Stock";
      card.appendChild(badge);
    }
    body.appendChild(name);
    body.appendChild(price);
    body.appendChild(cta);
    card.appendChild(media);
    card.appendChild(dots);
    card.appendChild(body);
    showAngle(0);

    return card;
  };

  var collectionSlugFromPath = function () {
    var match = window.location.pathname.match(/\/collections\/([^/]+)\/?$/);
    return match ? decodeURIComponent(match[1]) : "";
  };

  var setAccordion = function (item, open) {
    var toggle = item.querySelector(":scope > .nav-branch__toggle, :scope > .nav-group__toggle");
    var panel = item.querySelector(":scope > .nav-branch__panel, :scope > .nav-group__panel");
    if (!toggle || !panel) return;
    item.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if ("inert" in panel) panel.inert = !open;
  };

  var initNavAccordion = function () {
    var nav = document.getElementById("site-nav");
    if (!nav) return;

    var menItem = nav.querySelector(".nav-branch");
    var groups = Array.prototype.slice.call(nav.querySelectorAll(".nav-group"));
    var currentSlug = collectionSlugFromPath();

    if (menItem) setAccordion(menItem, false);
    groups.forEach(function (group) {
      setAccordion(group, false);
    });

    document.querySelectorAll(".nav-link--pending").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
    });

    if (menItem) {
      var menToggle = menItem.querySelector(".nav-branch__toggle");
      if (menToggle) {
        menToggle.addEventListener("click", function () {
          setAccordion(menItem, !menItem.classList.contains("is-open"));
        });
      }
    }

    groups.forEach(function (group) {
      var toggle = group.querySelector(".nav-group__toggle");
      if (!toggle) return;
      toggle.addEventListener("click", function () {
        var opening = !group.classList.contains("is-open");
        groups.forEach(function (other) {
          setAccordion(other, opening && other === group);
        });
      });
    });

    if (currentSlug) {
      if (menItem) {
        setAccordion(menItem, true);
        var menToggle = menItem.querySelector(".nav-branch__toggle");
        if (menToggle) menToggle.setAttribute("aria-current", "true");
        menItem.classList.add("is-current");
      }
      var activeLink = nav.querySelector('a[href="/collections/' + currentSlug + '/"]');
      if (activeLink) {
        activeLink.setAttribute("aria-current", "page");
        var group = activeLink.closest(".nav-group");
        if (group) setAccordion(group, true);
      }
    }
  };

  var inStock = function (product) {
    return !product.outOfStock;
  };

  var matchesPrice = function (product, value) {
    if (value === "under-20") return product.priceValue < 20;
    if (value === "20-50") return product.priceValue >= 20 && product.priceValue <= 50;
    if (value === "50-100") return product.priceValue > 50 && product.priceValue <= 100;
    if (value === "100-plus") return product.priceValue > 100;
    return true;
  };

  var matchesFilters = function (product, selected) {
    if (selected.gender === "unisex" && product.gender !== "unisex") return false;
    if (selected.gender === "men" && product.gender === "women") return false;
    if (selected.gender === "women" && product.gender === "men") return false;
    if (selected.type && product.type !== selected.type) return false;
    if (selected.color && product.colors.indexOf(selected.color) === -1) return false;
    if (selected.size) {
      var size = Number(selected.size);
      if (product.sizes.length && product.sizes.indexOf(size) === -1) return false;
    }
    if (selected.price && !matchesPrice(product, selected.price)) return false;
    if (selected.collection && product.collection !== selected.collection) return false;
    if (selected.print && product.print !== selected.print) return false;
    if (selected.detail && product.detail !== selected.detail) return false;
    return true;
  };

  var sortProducts = function (list, sort) {
    var copy = list.slice();
    if (sort === "price-asc") {
      copy.sort(function (a, b) {
        return a.priceValue - b.priceValue;
      });
    } else if (sort === "price-desc") {
      copy.sort(function (a, b) {
        return b.priceValue - a.priceValue;
      });
    } else if (sort === "newest") {
      copy.sort(function (a, b) {
        return Number(b.newest) - Number(a.newest);
      });
    } else if (sort === "best-sellers") {
      copy.sort(function (a, b) {
        return Number(b.bestSeller) - Number(a.bestSeller);
      });
    }
    return copy;
  };

  var optionLabel = function (field, value) {
    var found = field.options.filter(function (option) {
      return option.value === value;
    })[0];
    return found ? found.label : value;
  };

  var initCollectionPage = function () {
    var titleEl = document.getElementById("collection-title");
    var grid = document.getElementById("collection-grid");
    var status = document.getElementById("collection-status");
    var pillsRow = document.getElementById("filter-pills");
    var sortRow = document.getElementById("filter-sort");
    if (!titleEl || !grid || !pillsRow || !sortRow) return;

    var slug = collectionSlugFromPath();
    var page = COLLECTION_PAGES[slug] || {
      title: slug
        .split("-")
        .map(function (part) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join(" "),
      eyebrow: "Collection",
      match: null,
    };

    titleEl.textContent = page.title;
    document.title = page.title + " | Click Clocks";
    var eyebrow = document.getElementById("collection-eyebrow");
    if (eyebrow) eyebrow.textContent = page.eyebrow || "Men";

    var selected = {
      gender: "",
      type: "",
      color: "",
      size: "",
      price: "",
      collection: "",
      print: "",
      detail: "",
      sort: "relevant",
    };

    var chips = {};

    var closeMenus = function (except) {
      Object.keys(chips).forEach(function (key) {
        if (key === except) return;
        var chip = chips[key];
        chip.classList.remove("is-open");
        chip.querySelector(".filter-chip__button").setAttribute("aria-expanded", "false");
        chip.querySelector(".filter-chip__menu").hidden = true;
      });
    };

    var hasActiveFilters = function () {
      return FILTER_FIELDS.some(function (field) {
        if (field.key === "sort") return false;
        return Boolean(selected[field.key]);
      });
    };

    var renderGrid = function () {
      var stocked = PRODUCTS.filter(inStock);
      var collectionMatch = page.match
        ? stocked.filter(page.match)
        : stocked.slice();
      /* Pages without assigned stock (flip-flops, collabs, and similar) show
         every in-stock product as a placeholder until backend filters exist. */
      if (!collectionMatch.length) collectionMatch = stocked.slice();

      var filtered = collectionMatch.filter(function (product) {
        return matchesFilters(product, selected);
      });
      filtered = sortProducts(filtered, selected.sort);

      grid.textContent = "";
      filtered.forEach(function (product) {
        grid.appendChild(createProductCard(product, { sizes: GRID_SIZES }));
      });

      if (status) {
        status.textContent = filtered.length
          ? filtered.length + " product" + (filtered.length === 1 ? "" : "s")
          : "No products match these filters.";
      }

      var empty = document.getElementById("collection-empty");
      if (empty) empty.hidden = filtered.length > 0;

      var clearButtons = document.querySelectorAll("[data-filter-clear]");
      clearButtons.forEach(function (button) {
        button.hidden = !hasActiveFilters();
      });
    };

    var chipLabel = function (field) {
      var value = selected[field.key];
      if (field.key === "sort") return optionLabel(field, value);
      if (value) return field.label + ": " + optionLabel(field, value);
      return field.label;
    };

    var syncChip = function (field) {
      var wrap = chips[field.key];
      if (!wrap) return;
      var button = wrap.querySelector(".filter-chip__button");
      var value = selected[field.key];
      var isActive = field.key === "sort" ? value !== "relevant" : Boolean(value);
      wrap.classList.toggle("is-active", isActive);
      var label = wrap.querySelector(".filter-chip__value");
      label.textContent = chipLabel(field);
      wrap.querySelectorAll("[role='option']").forEach(function (option) {
        option.setAttribute(
          "aria-selected",
          option.getAttribute("data-value") === value ? "true" : "false"
        );
      });
    };

    var makeChip = function (field) {
      var wrap = document.createElement("div");
      wrap.className = "filter-chip";
      wrap.dataset.filter = field.key;

      var button = document.createElement("button");
      button.type = "button";
      button.className = "filter-chip__button";
      button.setAttribute("aria-haspopup", "listbox");
      button.setAttribute("aria-expanded", "false");

      var valueEl = document.createElement("span");
      valueEl.className = "filter-chip__value";
      valueEl.textContent = chipLabel(field);

      var chevron = document.createElement("span");
      chevron.className = "filter-chip__chevron";
      chevron.setAttribute("aria-hidden", "true");

      button.appendChild(valueEl);
      button.appendChild(chevron);

      var list = document.createElement("ul");
      list.className = "filter-chip__menu";
      list.setAttribute("role", "listbox");
      list.setAttribute("aria-label", field.label);
      list.hidden = true;

      field.options.forEach(function (option) {
        var item = document.createElement("li");
        item.className = "filter-chip__option";
        item.setAttribute("role", "option");
        item.setAttribute("data-value", option.value);
        item.setAttribute("aria-selected", "false");

        var dot = document.createElement("span");
        dot.className = "filter-chip__dot";
        dot.setAttribute("aria-hidden", "true");

        var text = document.createElement("span");
        text.textContent = option.label;

        item.appendChild(dot);
        item.appendChild(text);
        item.addEventListener("click", function () {
          if (selected[field.key] === option.value && field.key !== "sort") {
            selected[field.key] = "";
          } else {
            selected[field.key] = option.value;
          }
          closeMenus();
          syncChip(field);
          renderGrid();
        });
        list.appendChild(item);
      });

      button.addEventListener("click", function () {
        var open = !wrap.classList.contains("is-open");
        closeMenus(field.key);
        wrap.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
        list.hidden = !open;
      });

      wrap.appendChild(button);
      wrap.appendChild(list);
      chips[field.key] = wrap;
      syncChip(field);
      return wrap;
    };

    FILTER_FIELDS.forEach(function (field) {
      var chip = makeChip(field);
      if (field.key === "sort") sortRow.appendChild(chip);
      else pillsRow.appendChild(chip);
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".filter-chip")) closeMenus();
    });

    var clearAll = function () {
      FILTER_FIELDS.forEach(function (field) {
        selected[field.key] = field.key === "sort" ? "relevant" : "";
        syncChip(field);
      });
      closeMenus();
      renderGrid();
    };

    document.querySelectorAll("[data-filter-clear]").forEach(function (button) {
      button.addEventListener("click", clearAll);
    });

    var drawer = document.getElementById("filter-drawer");
    var drawerOpen = document.getElementById("filter-open");
    var drawerClose = document.getElementById("filter-close");
    var drawerBackdrop = document.getElementById("filter-backdrop");

    var setDrawer = function (open) {
      if (!drawer) return;
      drawer.classList.toggle("is-open", open);
      if (drawerBackdrop) drawerBackdrop.hidden = !open;
      document.body.classList.toggle("is-filter-open", open);
      if (drawerOpen) drawerOpen.setAttribute("aria-expanded", open ? "true" : "false");
    };

    if (drawerOpen) {
      drawerOpen.addEventListener("click", function () {
        setDrawer(true);
      });
    }
    if (drawerClose) {
      drawerClose.addEventListener("click", function () {
        setDrawer(false);
      });
    }
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener("click", function () {
        setDrawer(false);
      });
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setDrawer(false);
        closeMenus();
      }
    });

    renderGrid();
  };

  var FOOTER_COLUMNS = [
    {
      title: "About",
      links: [
        { label: "Our Story", href: "/pages/our-story" },
        { label: "Sustainability", href: "/pages/sustainability" },
        { label: "Blog", href: "/pages/blog" },
        { label: "Careers", href: "/pages/careers" },
        { label: "Privacy Policy", href: "/pages/privacy-policy" },
        { label: "Terms of Use", href: "/pages/terms-of-use" },
        { label: "Accessibility", href: "/pages/accessibility" },
        { label: "Privacy Notice for CA Residents", href: "/pages/ca-privacy" },
        { label: "Do Not Sell or Share My Personal Information", href: "/pages/ca-privacy#opt-out" },
      ],
    },
    {
      title: "Shop",
      links: [
        { label: "Women's Flip-Flops", href: "/collections/womens/" },
        { label: "Men's Flip-Flops", href: "/collections/mens/" },
        { label: "Slides", href: "/collections/slides/" },
        { label: "Straps", href: "/collections/straps/" },
        { label: "Bundles", href: "/collections/bundles/" },
        { label: "Element Edition", href: "/collections/element-edition/" },
        { label: "Elite Packages", href: "/collections/elite-packages/" },
        { label: "Shop All", href: "/collections/all/" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "Contact Us", href: "/pages/contact" },
        { label: "Help Center", href: "/pages/help-center" },
        { label: "Shipping Info", href: "/pages/shipping" },
        { label: "Return Policy", href: "/pages/returns" },
        { label: "Start a Return", href: "/pages/start-return" },
        { label: "Satisfaction Guarantee", href: "/pages/satisfaction-guarantee" },
        { label: "Size Guide", href: "/pages/size-guide" },
        { label: "Promotion Terms", href: "/pages/promotion-terms" },
        { label: "Product Reviews", href: "/pages/reviews" },
      ],
    },
  ];

  var FOOTER_SOCIAL = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"></rect><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"></circle></svg>',
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.2 3v11.1a3.3 3.3 0 1 1-2.4-3.18V8.6A6.7 6.7 0 0 0 16.7 10V7.4A4.6 4.6 0 0 0 19.8 5.2h-2.6A3.5 3.5 0 0 1 14.2 3z"></path></svg>',
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.2 8.5V6.8c0-.7.5-1 1.1-1h1.6V3h-2.2C12.1 3 10.5 4.6 10.5 7v1.5H8.4V11h2.1v10h3.7V11h2.4l.4-2.5h-2.8z"></path></svg>',
    },
    {
      label: "YouTube",
      href: "/videos",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="6" width="19" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"></rect><path fill="currentColor" d="M10.4 9.2v5.6l5.2-2.8z"></path></svg>',
    },
    {
      label: "Pinterest",
      href: "https://www.pinterest.com/",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path fill="currentColor" d="M12.4 7.4c-2.1 0-3.5 1.4-3.5 3.3 0 1.4.8 2.3 1.9 2.3.3 0 .6-.2.7-.6l.2-.7c.2-.8-.3-1.1-.8-1.1-.7 0-1.2.7-1.2 1.7 0 2 1.4 3.4 3.3 3.4 1.8 0 3.1-1.3 3.1-3.3 0-2.2-1.6-3.4-3.7-3.4zm.2 8.1-.8 3.2h-.1l.6-2.4c-.4.3-.9.5-1.5.5-2.4 0-4.1-1.8-4.1-4.4 0-2.6 2.1-4.6 4.8-4.6 2.6 0 4.4 1.8 4.4 4.2 0 2.6-1.6 4.5-3.3 4.5z"></path></svg>',
    },
  ];

  var FOOTER_PAYMENTS = ["Visa", "Mastercard", "Amex", "PayPal", "Shop Pay"];

  var renderFooterGroup = function (column) {
    var links = column.links
      .map(function (item) {
        return "<li><a href=\"" + item.href + "\">" + item.label + "</a></li>";
      })
      .join("");
    return (
      '<div class="site-footer__group">' +
      "<h2 class=\"site-footer__heading\">" +
      column.title +
      "</h2><ul>" +
      links +
      "</ul></div>"
    );
  };

  var initSiteFooter = function () {
    var footer = document.getElementById("site-footer");
    if (!footer) return;

    var social = FOOTER_SOCIAL.map(function (item) {
      return (
        "<li><a href=\"" +
        item.href +
        "\" aria-label=\"" +
        item.label +
        "\">" +
        item.icon +
        "</a></li>"
      );
    }).join("");

    var payments = FOOTER_PAYMENTS.map(function (name) {
      return '<li><span class="site-footer__pay">' + name + "</span></li>";
    }).join("");

    footer.innerHTML =
      '<div class="container site-footer__main">' +
      '<nav class="site-footer__grid" aria-label="Footer">' +
      FOOTER_COLUMNS.map(renderFooterGroup).join("") +
      '<div class="site-footer__connect">' +
      "<h2 class=\"site-footer__heading\" id=\"footer-connect-title\">Stay Connected</h2>" +
      "<h3 class=\"site-footer__newsletter-title\">Stay in the Loop</h3>" +
      "<p class=\"site-footer__newsletter-copy\">Sign up for early access to new drops, exclusive offers, and Click Clocks updates.</p>" +
      '<form class="site-footer__signup" action="/pages/newsletter" method="post">' +
      '<label class="visually-hidden" for="footer-email">Email address</label>' +
      '<input class="field__input" id="footer-email" name="email" type="email" autocomplete="email" required placeholder="Email address">' +
      '<button class="btn btn--primary" type="submit">Subscribe</button>' +
      "</form>" +
      "<p class=\"site-footer__disclaimer\">By subscribing you agree to receive Click Clocks emails. Unsubscribe anytime.</p>" +
      "<p class=\"site-footer__sms\">Prefer texts? Sign up for SMS alerts. <a href=\"/pages/sms-signup\">Sign Up</a></p>" +
      '<ul class="site-footer__social">' +
      social +
      "</ul></div></nav></div>" +
      '<div class="site-footer__bar">' +
      '<div class="container site-footer__bar-inner">' +
      "<p>&copy; 2026 Quick Connect Footwear, LLC. All rights reserved.</p>" +
      '<p class="site-footer__tagline">Made with purpose. Built to last.</p>' +
      '<ul class="site-footer__payments" aria-label="Accepted payment methods">' +
      payments +
      "</ul></div></div>";
  };

  /* Our Story page. Homepage STORY_MILESTONES stay in script.js. Bodies 1, 2,
     4, and 5 are expanded from that homepage copy; 3 is expanded from its
     three-sentence homepage version. Accent colors are for dates, dots, and
     the rail only. */
  var OUR_STORY_PAGE = {
    hero: {
      eyebrow: "Our Story",
      headline: "One base. Endless looks.",
      subline:
        "How a simple frustration turned into a better way to wear flip-flops.",
    },
    milestones: [
      {
        title: "The Idea",
        date: "2024",
        accent: "#6b5340",
        image: "story-01",
        alt: "Sketchbook with early removable sandal strap drawings and material samples.",
        expanded: true,
        body:
          "It started with a simple frustration: why can't you change your flip-flop straps without buying a whole new pair? Every season meant another pair in the closet, then another in the trash. We wanted one base that could keep up with how people actually dress: a new look without a new shoe.",
      },
      {
        title: "First Prototype",
        date: "Early 2025",
        accent: "#b24538",
        image: "story-02",
        alt: "Hands testing a rough removable flip-flop strap prototype at a garage workbench.",
        expanded: true,
        body:
          "The first Click Clocks prototype was built in a garage. Messy, imperfect, and exactly what we needed to prove the concept worked. The click had to be simple enough to do on a beach, and secure enough to last a whole summer. After a lot of failed fittings, the twist lock held.",
      },
      {
        title: "The Brand Takes Shape",
        date: "Mid 2025",
        accent: "#a15c12",
        image: "story-03",
        alt: "Customizable sandal prototypes, material swatches and packaging studies on a design table.",
        expanded: true,
        body:
          "Quick Connect Footwear, LLC was formed. The name Click Clocks stuck. The mission became clear: customizable footwear that doesn't cost the earth. We sketched the first Element palettes, wrote the recycling plan for worn-out soles, and decided the brand would live or die on whether people actually swapped their straps.",
      },
      {
        title: "First Drop",
        date: "2026",
        accent: "#1f6f68",
        image: "story-04",
        alt: "Green, blue, coral and white interchangeable straps arranged around one black flip-flop base.",
        expanded: true,
        body:
          "The Element Edition launched. Roots, Flow, Fire, Breathe: four straps, four moods, one base. The response blew us away. People mixed colors we never paired in the lookbook, and came back for a second set instead of a second pair. That was the proof the garage prototype had been waiting for.",
      },
      {
        title: "What's Next",
        date: "Coming Soon",
        accent: "#1a5276",
        image: "story-05",
        alt: "Future Click Clocks slide and flip-flop colorways arranged across a bright design studio table.",
        expanded: true,
        body:
          "New colorways, brand collabs, and a full slide collection. We're just getting started. Next up is more ways to rebuild the pair you already own, and partnerships that put Click Clocks on feet we have not reached yet. Same base. New looks. Still no pile of last season's straps.",
      },
    ],
    values: [
      {
        title: "Built to Last",
        body: "Straps that outlive the trend cycle.",
        icon: "ring",
      },
      {
        title: "Made to Change",
        body: "One base, a wardrobe of straps.",
        icon: "swap",
      },
      {
        title: "Made to Matter",
        body: "Soles recycled, oceans protected.",
        icon: "drop",
      },
    ],
    cta: {
      headline: "Ready to build your pair?",
      label: "Shop Now",
      href: "/#featured",
    },
  };

  var BLOG_CATEGORIES = [
    "All",
    "Style",
    "Sustainability",
    "Behind the Brand",
    "How-To",
    "Travel",
  ];

  var BLOG_PAGE_SIZE = 9;

  var BLOG_POSTS = [
    {
      slug: "five-ways-one-base",
      title: "Five Ways to Style One Base",
      category: "Style",
      date: "August 12, 2026",
      readTime: "4 min read",
      author: "Click Clocks editorial",
      excerpt:
        "One black base, five completely different looks. Here's how to build a strap rotation that covers your whole week.",
      image: "blog-five-ways",
      alt: "A black flip-flop base surrounded by five interchangeable straps on sand.",
      body: [
        {
          type: "p",
          text: "A week of outfits does not need a week of shoes. Keep one black base by the door and rotate the straps the way you rotate a shirt. The pair stays put. The look keeps moving.",
        },
        { type: "h2", text: "Monday: clean black" },
        {
          type: "p",
          text: "Start with the matte black strap that shipped on the base. It disappears under cropped trousers and makes a white sock look intentional instead of accidental.",
        },
        { type: "h2", text: "Midweek color" },
        {
          type: "p",
          text: "Swap to teal or coral when the rest of the outfit is quiet. One saturated strap does more than a loud print, and it takes ten seconds.",
        },
        {
          type: "quote",
          text: "The base is the uniform. The strap is the opinion.",
        },
        { type: "h2", text: "Weekend texture" },
        {
          type: "p",
          text: "Olive and cream read more like fabric than footwear. Wear them with linen, a damp beach towel, or nothing more planned than a grocery run.",
        },
        {
          type: "ul",
          items: [
            "Keep the black strap on the base as your default",
            "Park color straps in a dish by the door, not in a drawer",
            "Match the strap to the loudest thing you are already wearing, or to nothing at all",
          ],
        },
        {
          type: "image",
          stem: "blog-five-ways",
          alt: "Five strap colors arranged around a single black Click Clocks base.",
        },
      ],
    },
    {
      slug: "what-happens-old-soles",
      title: "What Happens to Your Old Soles",
      category: "Sustainability",
      date: "August 5, 2026",
      readTime: "6 min read",
      author: "Click Clocks editorial",
      excerpt:
        "We follow a returned pair from your doorstep through the recycling process and explain where the material ends up.",
      image: "blog-old-soles",
      alt: "Worn sandal soles and recycled rubber pellets on a workshop bench.",
      body: [
        {
          type: "p",
          text: "When a base is done, we would rather see it on a bench than in a bin. Returns land at the warehouse, get sorted, and move into a recycling stream built for EVA and rubber, not mixed landfill.",
        },
        { type: "h2", text: "From your doorstep" },
        {
          type: "p",
          text: "You mail the worn pair back with the label we send. Straps that still have life go into a parts bin. Bases that are cooked get cut down so the foam can be processed.",
        },
        {
          type: "quote",
          text: "The goal is not a perfect closed loop on day one. It is keeping a sole from becoming a permanent object.",
        },
        { type: "h2", text: "Where the material goes" },
        {
          type: "p",
          text: "Ground foam becomes underlayment, playground surfacing, and new midsole feedstock where the chemistry allows. We publish the split as the program grows, not as a round marketing number.",
        },
        {
          type: "ul",
          items: [
            "Straps with wear left get cleaned and reused",
            "Bases are sorted by compound before grinding",
            "Anything we cannot process is disclosed, not hidden in a footnote",
          ],
        },
        {
          type: "image",
          stem: "blog-old-soles",
          alt: "Cut foam pieces and recycled pellets beside worn sandal soles.",
        },
      ],
    },
    {
      slug: "garage-prototype",
      title: "The Garage Prototype That Started It All",
      category: "Behind the Brand",
      date: "July 28, 2026",
      readTime: "5 min read",
      author: "Click Clocks editorial",
      excerpt:
        "The first Click Clocks prototype was held together with more optimism than engineering. Here's what we learned from it.",
      image: "blog-prototype",
      alt: "A rough handmade flip-flop prototype on a garage workbench with tools.",
      body: [
        {
          type: "p",
          text: "The first Click Clocks prototype lived on a garage bench under a clamp light. The strap was too stiff. The lock was too proud. The idea was already the whole company.",
        },
        { type: "h2", text: "What had to click" },
        {
          type: "p",
          text: "It had to work with wet hands, sandy feet, and no tools. If you needed a coin or a tutorial, it was not done. The twist lock only shipped after it survived a summer of bad fittings.",
        },
        {
          type: "quote",
          text: "Messy, imperfect, and exactly what we needed to prove the concept worked.",
        },
        { type: "h3", text: "The lesson we kept" },
        {
          type: "p",
          text: "Every later version still has to pass the garage test: can someone change a strap on a beach without thinking about it? If the answer is no, we go back to the bench.",
        },
        {
          type: "image",
          stem: "blog-prototype",
          alt: "Hand tools and strap samples around an early Click Clocks prototype.",
        },
      ],
    },
    {
      slug: "swap-straps-guide",
      title: "How to Swap Your Straps in Under 10 Seconds",
      category: "How-To",
      date: "July 20, 2026",
      readTime: "3 min read",
      author: "Click Clocks editorial",
      excerpt:
        "A step-by-step walkthrough of the twist mechanism, plus the two mistakes most people make the first time.",
      image: "blog-swap-guide",
      alt: "Hands twisting a teal strap onto a black flip-flop base.",
      body: [
        {
          type: "p",
          text: "The mechanism is a twist, not a fight. Once you feel the seat, you will stop looking at it. Until then, here is the walkthrough.",
        },
        { type: "h2", text: "The motion" },
        {
          type: "ul",
          items: [
            "Hold the base steady with your off hand",
            "Align the strap posts with the sockets",
            "Press down and twist until you feel the lock seat",
            "Tug once. If it does not lift, you are done",
          ],
        },
        { type: "h2", text: "Two first-time mistakes" },
        {
          type: "p",
          text: "People either twist before the posts are seated, or they keep turning after the lock has already clicked. Seat first, then twist, then stop. The second tug is your confirmation, not more rotation.",
        },
        {
          type: "quote",
          text: "If it takes a tutorial every time, we built it wrong. This should become muscle memory.",
        },
        {
          type: "image",
          stem: "blog-swap-guide",
          alt: "Close-up of the twist lock as a strap clicks onto the base.",
        },
      ],
    },
    {
      slug: "packing-light",
      title: "Packing Light: One Pair, Ten Days",
      category: "Travel",
      date: "July 14, 2026",
      readTime: "5 min read",
      author: "Click Clocks editorial",
      excerpt:
        "Why interchangeable straps are the most underrated travel hack, and how to pack a strap set that covers everything.",
      image: "blog-packing",
      alt: "An open weekender bag with one pair of flip-flops and a compact strap set.",
      body: [
        {
          type: "p",
          text: "Shoes are the bulky part of a short trip. One base and a rolled strap set take the space of a paperback and cover dinner, the pool, and the walk to breakfast.",
        },
        { type: "h2", text: "What to pack" },
        {
          type: "ul",
          items: [
            "Black strap for evenings and travel days",
            "One color for heat and water",
            "One light strap if you wear a lot of white",
          ],
        },
        { type: "h2", text: "What to leave" },
        {
          type: "p",
          text: "A second pair of sandals. The backup flip-flops that never leave the bag. If the base fails, email us from the road and we will sort a replacement. That is rarer than packing three extra pairs.",
        },
        {
          type: "quote",
          text: "The underrated move is not fewer clothes. It is one pair of shoes that can change its mind.",
        },
        {
          type: "image",
          stem: "blog-packing",
          alt: "Rolled interchangeable straps packed beside a single pair of flip-flops.",
        },
      ],
    },
    {
      slug: "meet-element-edition",
      title: "Meet the Element Edition",
      category: "Style",
      date: "July 6, 2026",
      readTime: "4 min read",
      author: "Click Clocks editorial",
      excerpt:
        "Roots, Flow, Fire, and Breathe. Four straps, four moods, and the thinking behind each design.",
      image: "blog-element-edition",
      alt: "Four Element Edition straps in green, teal, coral, and sand beside a black base.",
      body: [
        {
          type: "p",
          text: "Element Edition is four straps that share a palette language without looking like a matching set. Each one is a mood you can click on, not a costume.",
        },
        { type: "h2", text: "The four" },
        {
          type: "ul",
          items: [
            "Roots: forest green, grounded, easy with denim",
            "Flow: ocean teal, the one that looks wet even when it is dry",
            "Fire: warm coral, for days that already have a pulse",
            "Breathe: pale sand, the quiet strap that still photographs well",
          ],
        },
        {
          type: "quote",
          text: "People mixed colors we never paired in the lookbook. That was the point.",
        },
        { type: "h3", text: "Wear them out of order" },
        {
          type: "p",
          text: "The names are a starting map, not a rule. Fire with a navy shirt is as fair as Roots with a black base. The edition works when you stop treating it like a set.",
        },
        {
          type: "image",
          stem: "blog-element-edition",
          alt: "Element Edition straps laid out in a row on stone.",
        },
      ],
    },
    {
      slug: "ocean-plastic-numbers",
      title: "Ocean Plastic by the Numbers",
      category: "Sustainability",
      date: "June 29, 2026",
      readTime: "7 min read",
      author: "Click Clocks editorial",
      excerpt:
        "The scale of the problem, what footwear contributes, and where a replaceable-sole model actually moves the needle.",
      image: "blog-ocean-plastic",
      alt: "Weathered plastic fragments on a shoreline at dusk.",
      body: [
        {
          type: "p",
          text: "Footwear is a small slice of ocean plastic and a large slice of what people throw away after a single season. A replaceable sole does not solve the ocean. It does cut the number of intact shoes that never needed to exist.",
        },
        { type: "h2", text: "What we can actually change" },
        {
          type: "p",
          text: "We measure pairs not replaced, straps kept in rotation, and bases returned for recycling. Those are numbers we can stand behind. Global plastic totals belong to the researchers who collect them, not to a product page.",
        },
        {
          type: "quote",
          text: "A replaceable-sole model moves the needle where a closet used to collect dead pairs.",
        },
        { type: "h2", text: "Honesty over scale theater" },
        {
          type: "p",
          text: "If a claim needs a footnote to stay true, we would rather shrink the claim. The work is fewer shoes made, more parts reused, and a return path that is not theater.",
        },
        {
          type: "image",
          stem: "blog-ocean-plastic",
          alt: "A quiet shoreline with scattered plastic fragments on wet sand.",
        },
      ],
    },
    {
      slug: "making-straps-last",
      title: "Making Your Straps Last",
      category: "How-To",
      date: "June 22, 2026",
      readTime: "3 min read",
      author: "Click Clocks editorial",
      excerpt:
        "Our straps are built tough, but a few habits will keep them looking new through years of wear.",
      image: "blog-strap-care",
      alt: "Fabric sandal straps hanging to dry on a wooden rack in sunlight.",
      body: [
        {
          type: "p",
          text: "Straps see salt, sunscreen, and the bottom of a beach bag. They are built for that. A little care still keeps the color from looking tired in year three.",
        },
        { type: "h2", text: "After salt water" },
        {
          type: "p",
          text: "Rinse with fresh water and hang them. Do not park a wet strap in a dark gym bag. Mildew is the one problem the lock cannot solve.",
        },
        { type: "h2", text: "Everyday habits" },
        {
          type: "ul",
          items: [
            "Wipe sunscreen off the webbing before it sits",
            "Unclick straps you are not wearing instead of stretching them over the base for storage",
            "Avoid the dryer. Air is enough",
          ],
        },
        {
          type: "quote",
          text: "Tough is the default. Looking new is a habit.",
        },
        {
          type: "image",
          stem: "blog-strap-care",
          alt: "Straps drying beside a linen cloth after a rinse.",
        },
      ],
    },
    {
      slug: "black-or-white-base",
      title: "Black Base or White Base?",
      category: "Style",
      date: "June 15, 2026",
      readTime: "4 min read",
      author: "Click Clocks editorial",
      excerpt:
        "A short guide to picking your first base, and why most people end up owning both.",
      image: "blog-base-choice",
      alt: "A matte black flip-flop base beside a matte white flip-flop base.",
      body: [
        {
          type: "p",
          text: "The first base is a personality test you will outgrow. Black hides wear and goes with everything. White photographs cleaner and makes color straps look louder. Most people buy the second one after a season.",
        },
        { type: "h2", text: "Choose black if" },
        {
          type: "p",
          text: "You want one pair that disappears. City walking, travel days, and any outfit that already has enough going on.",
        },
        { type: "h2", text: "Choose white if" },
        {
          type: "p",
          text: "You live in heat, wear a lot of linen, or want the strap to be the whole point. White shows scuffs sooner. That is honest, not a defect.",
        },
        {
          type: "quote",
          text: "Start with one. The second base is how you know the system stuck.",
        },
        {
          type: "image",
          stem: "blog-base-choice",
          alt: "Black and white Click Clocks bases standing side by side.",
        },
      ],
    },
  ];

  var escapeHtml = function (value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  var VALUE_ICONS = {
    ring:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="1.6"></circle></svg>',
    swap:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="4.5" y="5.5" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"></rect><rect x="10.5" y="9.5" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"></rect></svg>',
    drop:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4.5c0 0 6 7 6 10.2A6 6 0 1 1 6 14.7C6 11.5 12 4.5 12 4.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path></svg>',
  };

  var CTA_ARROW =
    '<svg class="image-cta__arrow" width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true" focusable="false"><path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  var storyPictureMarkup = function (stem, alt, eager) {
    var srcset = function (ext) {
      return (
        "/images/" +
        stem +
        "-640." +
        ext +
        " 640w, /images/" +
        stem +
        "-1024." +
        ext +
        " 1024w"
      );
    };
    return (
      "<picture>" +
      '<source type="image/webp" srcset="' +
      srcset("webp") +
      '" sizes="(min-width: 768px) 42vw, 92vw">' +
      '<img src="/images/' +
      stem +
      '-1024.jpg" srcset="' +
      srcset("jpg") +
      '" sizes="(min-width: 768px) 42vw, 92vw" width="1024" height="1280" alt="' +
      escapeHtml(alt) +
      '"' +
      (eager ? ' fetchpriority="high" decoding="async">' : ' loading="lazy" decoding="async">') +
      "</picture>"
    );
  };

  var blogHref = function (slug) {
    return "/blog/" + slug + "/";
  };

  var blogPictureMarkup = function (stem, alt, sizes, eager) {
    var srcset = function (ext) {
      return (
        "/images/" +
        stem +
        "-768." +
        ext +
        " 768w, /images/" +
        stem +
        "-1200." +
        ext +
        " 1200w, /images/" +
        stem +
        "-1600." +
        ext +
        " 1600w"
      );
    };
    return (
      "<picture>" +
      '<source type="image/webp" srcset="' +
      srcset("webp") +
      '" sizes="' +
      sizes +
      '">' +
      '<img src="/images/' +
      stem +
      '-1200.jpg" srcset="' +
      srcset("jpg") +
      '" sizes="' +
      sizes +
      '" width="1200" height="900" alt="' +
      escapeHtml(alt) +
      '"' +
      (eager ? ' fetchpriority="high" decoding="async">' : ' loading="lazy" decoding="async">') +
      "</picture>"
    );
  };

  var blogCardMarkup = function (post, eager, heading) {
    var href = blogHref(post.slug);
    var tag = heading || "h2";
    return (
      '<article class="blog-card">' +
      '<a class="blog-card__media" href="' +
      href +
      '">' +
      blogPictureMarkup(
        post.image,
        post.alt,
        "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw",
        eager
      ) +
      "</a>" +
      '<div class="blog-card__body">' +
      '<p class="blog-card__kicker">' +
      escapeHtml(post.category) +
      "</p>" +
      "<" +
      tag +
      "><a href=\"" +
      href +
      '">' +
      escapeHtml(post.title) +
      "</a></" +
      tag +
      ">" +
      '<p class="blog-card__meta">' +
      escapeHtml(post.date) +
      " · " +
      escapeHtml(post.readTime) +
      "</p>" +
      '<p class="blog-card__excerpt">' +
      escapeHtml(post.excerpt) +
      "</p></div></article>"
    );
  };

  var blogFeaturedMarkup = function (post) {
    var href = blogHref(post.slug);
    return (
      '<article class="blog-featured">' +
      '<a class="blog-featured__media" href="' +
      href +
      '">' +
      blogPictureMarkup(post.image, post.alt, "(min-width: 900px) 50vw, 100vw", true) +
      "</a>" +
      '<div class="blog-featured__copy">' +
      '<p class="blog-card__kicker">' +
      escapeHtml(post.category) +
      "</p>" +
      "<h2><a href=\"" +
      href +
      '">' +
      escapeHtml(post.title) +
      "</a></h2>" +
      '<p class="blog-card__meta">' +
      escapeHtml(post.date) +
      "</p>" +
      '<p class="blog-card__excerpt">' +
      escapeHtml(post.excerpt) +
      "</p>" +
      '<a class="blog-card__more" href="' +
      href +
      '">Read More</a></div></article>'
    );
  };

  var postsForCategory = function (category) {
    if (!category || category === "All") return BLOG_POSTS.slice();
    return BLOG_POSTS.filter(function (post) {
      return post.category === category;
    });
  };

  var renderBlogListing = function (category, visible) {
    var featuredMount = document.getElementById("blog-featured");
    var grid = document.getElementById("blog-grid");
    var empty = document.getElementById("blog-empty");
    var moreWrap = document.getElementById("blog-more");
    var moreBtn = document.getElementById("blog-load-more");
    if (!featuredMount || !grid || !empty || !moreWrap || !moreBtn) return 0;

    var posts = postsForCategory(category);
    if (!posts.length) {
      featuredMount.innerHTML = "";
      featuredMount.hidden = true;
      grid.innerHTML = "";
      empty.hidden = false;
      moreWrap.hidden = true;
      return 0;
    }

    empty.hidden = true;
    featuredMount.hidden = false;
    featuredMount.innerHTML = blogFeaturedMarkup(posts[0]);

    var rest = posts.slice(1);
    var shown = rest.slice(0, visible);
    grid.innerHTML = shown
      .map(function (post, index) {
        return blogCardMarkup(post, index < 2);
      })
      .join("");
    moreWrap.hidden = rest.length <= visible;
    moreBtn.hidden = rest.length <= visible;
    return rest.length;
  };

  var initBlogIndex = function () {
    var page = document.getElementById("blog-index");
    if (!page) return;

    var filters = document.getElementById("blog-filters");
    var hero = document.getElementById("story-hero");
    if (hero) {
      hero.innerHTML =
        '<div class="container story-hero__inner">' +
        '<p class="story-hero__eyebrow">The Journal</p>' +
        '<h1 class="story-hero__title" id="blog-hero-title">Notes on style, sustainability, and swapping straps.</h1>' +
        "</div>";
    }

    var active = "All";
    var visible = BLOG_PAGE_SIZE;

    if (filters) {
      filters.innerHTML = BLOG_CATEGORIES.map(function (name) {
        var pressed = name === active ? "true" : "false";
        var activeClass = name === active ? " is-active" : "";
        return (
          '<li class="filter-chip' +
          activeClass +
          '">' +
          '<button class="filter-chip__button" type="button" data-blog-category="' +
          escapeHtml(name) +
          '" aria-pressed="' +
          pressed +
          '">' +
          escapeHtml(name) +
          "</button></li>"
        );
      }).join("");

      filters.addEventListener("click", function (event) {
        var button = event.target.closest("[data-blog-category]");
        if (!button) return;
        active = button.getAttribute("data-blog-category");
        visible = BLOG_PAGE_SIZE;
        Array.prototype.forEach.call(filters.querySelectorAll(".filter-chip"), function (chip) {
          var chipButton = chip.querySelector("[data-blog-category]");
          var on = chipButton.getAttribute("data-blog-category") === active;
          chip.classList.toggle("is-active", on);
          chipButton.setAttribute("aria-pressed", on ? "true" : "false");
        });
        renderBlogListing(active, visible);
      });
    }

    var moreBtn = document.getElementById("blog-load-more");
    if (moreBtn) {
      moreBtn.addEventListener("click", function () {
        visible += BLOG_PAGE_SIZE;
        renderBlogListing(active, visible);
      });
    }

    renderBlogListing(active, visible);
  };

  var renderBlogBlocks = function (blocks) {
    return blocks
      .map(function (block) {
        if (block.type === "p") return "<p>" + escapeHtml(block.text) + "</p>";
        if (block.type === "h2") return "<h2>" + escapeHtml(block.text) + "</h2>";
        if (block.type === "h3") return "<h3>" + escapeHtml(block.text) + "</h3>";
        if (block.type === "quote") {
          return '<blockquote class="blog-quote">' + escapeHtml(block.text) + "</blockquote>";
        }
        if (block.type === "ul") {
          return (
            "<ul>" +
            block.items
              .map(function (item) {
                return "<li>" + escapeHtml(item) + "</li>";
              })
              .join("") +
            "</ul>"
          );
        }
        if (block.type === "image") {
          return (
            "<figure>" +
            blogPictureMarkup(block.stem, block.alt, "(min-width: 768px) 43.75rem, 92vw") +
            "</figure>"
          );
        }
        return "";
      })
      .join("");
  };

  var relatedPosts = function (post) {
    var same = BLOG_POSTS.filter(function (item) {
      return item.slug !== post.slug && item.category === post.category;
    });
    var others = BLOG_POSTS.filter(function (item) {
      return item.slug !== post.slug && item.category !== post.category;
    });
    return same.concat(others).slice(0, 3);
  };

  var SHARE_COPY_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="8" y="8" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"></rect><path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.6"></path></svg>';

  var initBlogArticle = function () {
    var page = document.getElementById("blog-article");
    if (!page) return;

    var match = window.location.pathname.match(/\/blog\/([^/]+)/);
    var slug = match ? decodeURIComponent(match[1]) : "";
    var post = BLOG_POSTS.filter(function (item) {
      return item.slug === slug;
    })[0];

    var hero = document.getElementById("blog-article-hero");
    var header = document.getElementById("blog-article-header");
    var body = document.getElementById("blog-article-body");
    var related = document.getElementById("blog-related");
    var news = document.getElementById("blog-newsletter");

    if (!post) {
      if (header) {
        header.innerHTML =
          '<div class="container blog-article__body">' +
          "<h1>Story not found</h1>" +
          '<p class="blog-article__meta">This piece is not in the journal. <a class="link" href="/pages/blog">Back to the journal</a></p>' +
          "</div>";
      }
      if (hero) hero.hidden = true;
      if (body) body.innerHTML = "";
      if (related) related.hidden = true;
      if (news) news.hidden = true;
      document.title = "Story not found | Click Clocks";
      return;
    }

    document.title = post.title + " | Click Clocks";
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", post.excerpt);

    if (hero) {
      hero.innerHTML = blogPictureMarkup(post.image, post.alt, "100vw", true);
    }

    if (header) {
      header.innerHTML =
        '<div class="container blog-article__body">' +
        '<p class="blog-article__kicker">' +
        escapeHtml(post.category) +
        "</p>" +
        "<h1>" +
        escapeHtml(post.title) +
        "</h1>" +
        '<p class="blog-article__meta">' +
        escapeHtml(post.category) +
        " · " +
        escapeHtml(post.date) +
        " · " +
        escapeHtml(post.readTime) +
        " · " +
        escapeHtml(post.author) +
        "</p></div>";
    }

    var shareUrl = encodeURIComponent(window.location.href);
    var shareText = encodeURIComponent(post.title);
    var shareImage = encodeURIComponent(
      window.location.origin + "/images/" + post.image + "-1200.jpg"
    );

    if (body) {
      body.innerHTML =
        '<div class="container blog-article__body">' +
        renderBlogBlocks(post.body) +
        '<div class="blog-share">' +
        '<span class="blog-share__label">Share</span>' +
        '<button class="blog-share__btn" type="button" id="blog-copy-link" aria-label="Copy link">' +
        SHARE_COPY_ICON +
        "</button>" +
        '<a class="blog-share__btn" href="https://www.facebook.com/sharer/sharer.php?u=' +
        shareUrl +
        '" aria-label="Share on Facebook" rel="noopener noreferrer" target="_blank">' +
        FOOTER_SOCIAL[2].icon +
        "</a>" +
        '<a class="blog-share__btn" href="https://twitter.com/intent/tweet?url=' +
        shareUrl +
        "&text=" +
        shareText +
        '" aria-label="Share on X" rel="noopener noreferrer" target="_blank">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4 4h4.2l4.1 5.6L16.8 4H20l-6.4 8.2L20.4 20h-4.2l-4.5-6.2L7.2 20H4l6.7-8.6z"></path></svg>' +
        "</a>" +
        '<a class="blog-share__btn" href="https://www.pinterest.com/pin/create/button/?url=' +
        shareUrl +
        "&description=" +
        shareText +
        "&media=" +
        shareImage +
        '" aria-label="Share on Pinterest" rel="noopener noreferrer" target="_blank">' +
        FOOTER_SOCIAL[4].icon +
        "</a>" +
        '<span class="blog-share__status" id="blog-copy-status" role="status"></span>' +
        "</div></div>";
    }

    var copyBtn = document.getElementById("blog-copy-link");
    var status = document.getElementById("blog-copy-status");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var done = function () {
          if (status) status.textContent = "Link copied";
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(window.location.href).then(done).catch(done);
        } else {
          done();
        }
      });
    }

    if (related) {
      related.innerHTML =
        '<div class="container">' +
        "<h2>Related Posts</h2>" +
        '<div class="blog-grid">' +
        relatedPosts(post)
          .map(function (item) {
            return blogCardMarkup(item, false, "h3");
          })
          .join("") +
        "</div></div>";
    }

    if (news) {
      news.innerHTML =
        '<div class="container">' +
        "<h2>Stay in the Loop</h2>" +
        "<p>New drops, strap guides, and notes from the bench. Unsubscribe anytime.</p>" +
        '<form action="/pages/newsletter" method="post">' +
        '<label class="visually-hidden" for="blog-news-email">Email address</label>' +
        '<input class="field__input" id="blog-news-email" name="email" type="email" autocomplete="email" required placeholder="Email address">' +
        '<button class="btn btn--primary" type="submit">Subscribe</button>' +
        "</form></div>";
    }
  };

  var initOurStoryPage = function () {
    var page = document.getElementById("story-page");
    if (!page) return;

    var hero = document.getElementById("story-hero");
    var timeline = document.getElementById("story-page-timeline");
    var values = document.getElementById("story-page-values");
    var cta = document.getElementById("story-page-cta");
    if (!hero || !timeline || !values || !cta) return;

    var reduce = reducedMotion.matches;
    var accents = OUR_STORY_PAGE.milestones.map(function (item) {
      return item.accent;
    });

    hero.innerHTML =
      '<div class="container story-hero__inner">' +
      '<p class="story-hero__eyebrow">' +
      escapeHtml(OUR_STORY_PAGE.hero.eyebrow) +
      "</p>" +
      '<h1 class="story-hero__title" id="story-hero-title">' +
      escapeHtml(OUR_STORY_PAGE.hero.headline) +
      "</h1>" +
      '<p class="story-hero__sub">' +
      escapeHtml(OUR_STORY_PAGE.hero.subline) +
      "</p></div>";

    var milestoneMarkup = OUR_STORY_PAGE.milestones
      .map(function (item, index) {
        var flip = index % 2 === 1 ? " story-page__milestone--flip" : "";
        return (
          '<article class="story-page__milestone' +
          flip +
          '" id="story-milestone-' +
          (index + 1) +
          '" style="--story-accent: ' +
          item.accent +
          '" data-story-index="' +
          index +
          '">' +
          '<div class="story-page__layout">' +
          '<div class="story-page__media">' +
          storyPictureMarkup(item.image, item.alt, index === 0) +
          "</div>" +
          '<div class="story-page__copy">' +
          '<p class="story-page__date">' +
          escapeHtml(item.date) +
          "</p>" +
          "<h2 class=\"story-page__title\">" +
          escapeHtml(item.title) +
          "</h2>" +
          '<p class="story-page__body">' +
          escapeHtml(item.body) +
          "</p></div></div></article>"
        );
      })
      .join("");

    var dotsMarkup = OUR_STORY_PAGE.milestones
      .map(function (item, index) {
        return (
          '<li class="story-page__dot' +
          (index === 0 ? " is-active" : " is-future") +
          '" style="--story-accent: ' +
          item.accent +
          '" data-story-index="' +
          index +
          '"><span></span></li>'
        );
      })
      .join("");

    timeline.style.setProperty("--story-accent-1", accents[0]);
    timeline.style.setProperty("--story-accent-2", accents[1]);
    timeline.style.setProperty("--story-accent-3", accents[2]);
    timeline.style.setProperty("--story-accent-4", accents[3]);
    timeline.style.setProperty("--story-accent-5", accents[4]);

    timeline.innerHTML =
      '<div class="container story-page__timeline-inner">' +
      '<div class="story-page__rail" aria-hidden="true">' +
      '<span class="story-page__rail-line"></span>' +
      '<span class="story-page__rail-fill" id="story-page-fill"></span>' +
      '<ol class="story-page__dots">' +
      dotsMarkup +
      "</ol></div>" +
      '<div class="story-page__milestones">' +
      milestoneMarkup +
      "</div></div>";

    values.innerHTML =
      '<h2 class="visually-hidden">What Click Clocks stands for</h2>' +
      '<div class="container story-values__grid">' +
      OUR_STORY_PAGE.values
        .map(function (item) {
          return (
            '<div class="story-values__item">' +
            '<span class="story-values__icon">' +
            (VALUE_ICONS[item.icon] || "") +
            "</span>" +
            "<h3>" +
            escapeHtml(item.title) +
            "</h3>" +
            "<p>" +
            escapeHtml(item.body) +
            "</p></div>"
          );
        })
        .join("") +
      "</div>";

    cta.innerHTML =
      '<div class="container story-cta__inner">' +
      '<h2 id="story-cta-title">' +
      escapeHtml(OUR_STORY_PAGE.cta.headline) +
      "</h2>" +
      '<a class="image-cta" href="' +
      escapeHtml(OUR_STORY_PAGE.cta.href) +
      '"><span class="image-cta__label">' +
      escapeHtml(OUR_STORY_PAGE.cta.label) +
      "</span>" +
      CTA_ARROW +
      "</a></div>";

    var fill = document.getElementById("story-page-fill");
    var articles = Array.prototype.slice.call(
      timeline.querySelectorAll(".story-page__milestone")
    );
    var dots = Array.prototype.slice.call(
      timeline.querySelectorAll(".story-page__dot")
    );
    var inner = timeline.querySelector(".story-page__timeline-inner");

    var positionDots = function () {
      if (!inner) return;
      var innerTop = inner.getBoundingClientRect().top;
      articles.forEach(function (article, index) {
        if (!dots[index]) return;
        var date = article.querySelector(".story-page__date") || article;
        var top = date.getBoundingClientRect().top - innerTop - 14;
        dots[index].style.top = Math.max(0, top) + "px";
      });
    };

    var setActiveDot = function (activeIndex) {
      dots.forEach(function (dot, index) {
        dot.classList.toggle("is-active", index === activeIndex);
        dot.classList.toggle("is-past", index < activeIndex);
        dot.classList.toggle("is-future", index > activeIndex);
      });
    };

    var syncRail = function () {
      if (!inner) return;
      var rect = inner.getBoundingClientRect();
      var startLine = window.innerHeight * 0.32;
      var span = Math.max(1, rect.height - window.innerHeight * 0.4);
      var progress = (startLine - rect.top) / span;
      progress = Math.min(1, Math.max(0, progress));
      if (fill) {
        fill.style.transform = reduce ? "scaleY(1)" : "scaleY(" + progress + ")";
      }
      var active = 0;
      articles.forEach(function (article, index) {
        if (article.getBoundingClientRect().top <= startLine) active = index;
      });
      setActiveDot(active);
    };

    if (reduce || !("IntersectionObserver" in window)) {
      articles.forEach(function (article) {
        article.classList.add("is-in");
      });
    } else {
      var reveal = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            reveal.unobserve(entry.target);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      articles.forEach(function (article) {
        reveal.observe(article);
      });
    }

    var inView = false;
    var ticking = false;
    var tick = function () {
      ticking = false;
      if (!inView) return;
      syncRail();
      ticking = true;
      window.requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window && inner) {
      var railWatch = new IntersectionObserver(
        function (entries) {
          inView = entries[0] && entries[0].isIntersecting;
          if (inView && !ticking) {
            ticking = true;
            window.requestAnimationFrame(tick);
          }
        },
        { rootMargin: "15% 0px 15% 0px" }
      );
      railWatch.observe(inner);
    } else {
      inView = true;
      ticking = true;
      window.requestAnimationFrame(tick);
    }

    positionDots();
    syncRail();

    if ("ResizeObserver" in window && inner) {
      new ResizeObserver(positionDots).observe(inner);
    } else {
      window.addEventListener("resize", positionDots);
    }
  };

  root.ClickClocks = {
    products: PRODUCTS,
    collections: COLLECTION_PAGES,
    featuredSizes: FEATURED_SIZES,
    createProductCard: createProductCard,
    ourStoryPage: OUR_STORY_PAGE,
    blogPosts: BLOG_POSTS,
  };

  initNavAccordion();
  initCollectionPage();
  initSiteFooter();
  initOurStoryPage();
  initBlogIndex();
  initBlogArticle();
})(window);

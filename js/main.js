/*------------------navigation menu-----------*/
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu"),
    navBar = document.querySelector(".nav-bar");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open")
    bodyScrollingToggle();
  };

  function hideNavMenu() {
    navMenu.classList.remove("open")
    fadeOutEffect();
    bodyScrollingToggle();
  };
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }


  // attach an event handler to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains('link-item')) {
      //
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;
        //desativa se ja estiver ativo em uma section
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        //e ativa uma nova section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");


        //desativa se já existir um link-item ativo no navigation menu-hamburger
        navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow")
        navMenu.querySelector(".active").classList.remove("active", "inner-shadow")

        //desativa se já existir um link-item ativo no nav bar
        navBar.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow")
        navBar.querySelector(".active").classList.remove("active", "inner-shadow")

        if (navBar.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          hideNavMenu();

        } else {
          let navItems = navBar.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // se clicar em link item e tiver no nav bar
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          })


        }

        // se clicar em link item e tiver no menu de navegaçao
        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          hideNavMenu();

        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // se clicar em link item e tiver no menu de navegaçao
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          })
          fadeOutEffect();
        }

        window.location.hash = hash;

      }
    }
  })

})();

/*---------------about section-----------*/

(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener('click', (event) => {
    // se event.target contem 'tab-item ' class nao contem 'active' class
    if (event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")) {
      const target = event.target.getAttribute("data-target");
      // deactivate existin active 'tab-item' desativa se tab item estivar ativo
      tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      //ativa um novo tab item 
      event.target.classList.add("active", "outer-shadow");
      // deactive existin active 'tab-content' desativa se estiver ativo o tab content
      aboutSection.querySelector(".tab-content.active").classList.remove("active");
      // active new 'tab-content ativa um novo content'
      aboutSection.querySelector(target).classList.add("active");
    }
  })
})();

//remove o scroll ativo no popup
function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling")
}
/*------------porftolio filter and popup-------------*/

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    porftolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;
  //adiciona eventos de click diretamente no container filter item
  filterContainer.addEventListener("click", (event) => {
    //seleciona funçoes que possui o filter-item e que nao estao ativas no momento
    if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
      //  deactivate existing active 'filter-item' desativa se tiver ativo o filter item
      filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active')
      //activate new "filter item" 
      event.target.classList.add("active", "outer-shadow")
      //constante que recebe os atributos do data target 
      const target = event.target.getAttribute("data-target");
      //percorre todos os items do portfolio items
      porftolioItems.forEach((item) => {
        //se o target for igual a categoria selecionada apresenta os projetos de tal categoria
        //e remove os objetos de outra categoria da tela
        //importante consultar css -> (.portfolio-section .portfolio-item.hide e show)
        if (target === item.getAttribute("data-category") || target === 'all') {
          item.classList.remove("hide");
          item.classList.add("show")
        } else {
          item.classList.remove("show")
          item.classList.add("hide");
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const porftolioItem = event.target.closest(".portfolio-item-inner").parentElement;

      //traz o portfolio item index
      itemIndex = Array.from(porftolioItem.parentElement.children).indexOf(porftolioItem)

      screenshots = porftolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots")

      //conver screenshots into array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();

    }
  })

  // function de close popup
  closeBtn.addEventListener("click", () => {
    popupToggle();

    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle()
    }

  })

  // function de open popup
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    /*activate loader until the popupImg loaded*/
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // deactivate loader after popupImg Loaded/ desativar o loade apos a imagem ser carregada
      popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
  }
  // next slide

  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++
    }
    popupSlideshow();

  })

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--
    }
    popupSlideshow();

  })

  function popupDetails() {
    //se portfolio-item-details nao existir
    if (!porftolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none"
      return;//finaliza a execuçao da funçao
    }
    projectDetailsBtn.style.display = "block"
    //get the porject details
    const details = porftolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
    //set project details
    popup.querySelector(".pp-project-details").innerHTML = details
    //get the project title
    const title = porftolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    //set the project title
    popup.querySelector(".pp-title h2").innerHTML = title;
    //get data category project
    const category = porftolioItems[itemIndex].getAttribute("data-category");
    //set data category
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("")
  }


  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle()
  })
  function popupDetailsToggle() {



    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus")
      projectDetailsBtn.querySelector("i").classList.add("fa-plus")
      projectDetailsContainer.classList.remove("active")
      projectDetailsContainer.style.maxHeight = 0 + "px"
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus")
      projectDetailsBtn.querySelector("i").classList.add("fa-minus")
      projectDetailsContainer.classList.add("active")
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px"
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }


})();

/*-----------------testimonial slider----------------- */
(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    activeSlide = sliderContainer.querySelector(".testi-item.active"),
    sliedWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);


  //set width of all slides
  slides.forEach((slide) => {
    slide.style.width = sliedWidth + "px";
  })

  //set width of slideContainer

  sliderContainer.style.width = sliedWidth * slides.length + "px";

  //function active button next and prev for slides 
  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0
    } else {
      slideIndex++
    }
    slider()
  })
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1
    } else {
      slideIndex--
    }
    slider()
  })

  function slider() {
    // desactive existing active slides
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    // active new slide
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(sliedWidth * slideIndex) + "px";
  }
  slider()

})();

//-----------------hide all sections active----------------------

(() => {

  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  })
})()

window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600)
})
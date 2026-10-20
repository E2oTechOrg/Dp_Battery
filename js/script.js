function loadComponent(id, file) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load " + file);
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      requestAnimationFrame(() => {
        if (id === "header-container") {
          initHeader();
          setActiveMenu();
        }
        if (id === "footer-container") {
          initFooter();
        }
        window.dispatchEvent(new Event("resize"));
      });
    })
    .catch(err => console.error(err));
}

function initHeader() {
  const header = document.getElementById("mainHeader");
  if (!header) {
    console.error("Header not found!");
    return;
  }
  console.log("Header loaded successfully");
}

function initFooter() {
  const footer = document.getElementById("footer");
  if (!footer) {
    console.error("Footer not found!");
    return;
  }
  console.log("Footer loaded successfully");
}

function setActiveMenu() {
  const links = document.querySelectorAll(".navbar-nav .nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
$(document).on('click', '.view-details', function () {
    var btn = $(this);
    var item = btn.closest('.portfolio-item');
    var name = item.find('h5').text();
    var price = item.find('.fw-bold').first().text();

    var defaults = {
        first:  ['Long life tubular battery', 'Long warranty', 'Free installation', 'Free doorstep delivery'],
        second: ['RO + UV purification', 'Wall mount type', 'Free installation', '1 year service warranty'],
        third:  ['Touch control', 'Strong suction', 'Free installation', '1 year service warranty']
    };
    var cat = item.hasClass('first') ? 'first' : item.hasClass('second') ? 'second' : 'third';

    var raw = String(btn.data('specs') || '');
    var list = raw ? raw.split('|') : defaults[cat];

    $('#pmName').text(name);
    $('#pmPrice').text(price);
    $('#pmMrp').text(btn.data('mrp') || '').toggle(!!btn.data('mrp'));
    $('#pmSave').text(btn.data('save') || '').toggle(!!btn.data('save'));
    $('#pmSpecs').html(list.map(function (s) {
        return '<li class="mb-2"><i class="fa fa-check-circle text-primary me-2"></i>' + s + '</li>';
    }).join(''));
    $('#pmWhatsapp').attr('href',
        'https://wa.me/910000000000?text=' + encodeURIComponent('Hi, I want to order ' + name));
});
loadComponent("header-container", "header.html");
loadComponent("footer-container", "footer.html");
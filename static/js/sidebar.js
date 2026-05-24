(function () {
    const MOBILE_BREAKPOINT = 768;

    const sidebar = document.querySelector('[data-sidebar]');
    const toggle = document.querySelector('[data-sidebar-toggle]');
    const closeButton = document.querySelector('[data-sidebar-close]');
    const backdrop = document.querySelector('[data-sidebar-backdrop]');

    if (!sidebar || !toggle || !backdrop) {
        return;
    }

    function isMobile() {
        return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
    }

    function openSidebar() {
        sidebar.classList.add('is-open');
        backdrop.hidden = false;
        backdrop.classList.add('is-visible');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('sidebar-open');
    }

    function closeSidebar() {
        sidebar.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('sidebar-open');

        window.setTimeout(function () {
            if (!sidebar.classList.contains('is-open')) {
                backdrop.hidden = true;
            }
        }, 200);
    }

    function toggleSidebar() {
        if (sidebar.classList.contains('is-open')) {
            closeSidebar();
            return;
        }

        openSidebar();
    }

    toggle.addEventListener('click', toggleSidebar);

    if (closeButton) {
        closeButton.addEventListener('click', closeSidebar);
    }

    backdrop.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('[data-sidebar-submenu-toggle]').forEach(function (button) {
        button.addEventListener('click', function () {
            const submenuId = button.getAttribute('aria-controls');
            const submenu = submenuId ? document.getElementById(submenuId) : null;

            if (!submenu) {
                return;
            }

            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const group = button.closest('.sidebar__group');

            button.setAttribute('aria-expanded', String(!isExpanded));
            submenu.hidden = isExpanded;

            if (group) {
                group.classList.toggle('is-open', !isExpanded);
            }
        });
    });

    sidebar.querySelectorAll('.sidebar__link:not(.sidebar__link--toggle)').forEach(function (link) {
        link.addEventListener('click', function () {
            if (isMobile()) {
                closeSidebar();
            }
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
            closeSidebar();
        }
    });

    window.addEventListener('resize', function () {
        if (!isMobile()) {
            closeSidebar();
        }
    });
}());

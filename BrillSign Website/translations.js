const translations = {
    en: {
        nav_features: "Features",
        nav_security: "Security",
        nav_pricing: "Pricing",
        nav_company: "Company",
        hero_title: "Take full control over your",
        hero_highlight: "Documents & Data",
        hero_subtitle: "Enterprise-grade encrypted e-signatures with decentralized storage—built for critical business documents.",
        btn_start: "Start building",
        btn_docs: "Read docs",
        grid_esign: "E-Sign",
        grid_identity: "Identity",
        grid_security: "Security",
        grid_encryption: "Encryption",
        grid_workflow: "Workflow",
        grid_compliance: "Compliance"
    },
    es: {
        nav_features: "Funcionalidades",
        nav_security: "Seguridad",
        nav_pricing: "Precios",
        nav_company: "Empresa",
        hero_title: "Tome el control total de sus",
        hero_highlight: "Documentos y Datos",
        hero_subtitle: "Firmas electrónicas cifradas de nivel empresarial con almacenamiento descentralizado para documentos críticos.",
        btn_start: "Empezar ahora",
        btn_docs: "Documentación",
        grid_esign: "Firma-E",
        grid_identity: "Identidad",
        grid_security: "Seguridad",
        grid_encryption: "Cifrado",
        grid_workflow: "Flujo",
        grid_compliance: "Cumplimiento"
    },
    hi: {
        nav_features: "विशेषताएं",
        nav_security: "सुरक्षा",
        nav_pricing: "कीमतें",
        nav_company: "कंपनी",
        hero_title: "अपने पर पूर्ण नियंत्रण रखें",
        hero_highlight: "दस्तावेज़ और डेटा",
        hero_subtitle: "विकेंद्रीकृत भंडारण के साथ एंटरप्राइज़-ग्रेड एन्क्रिप्टेड ई-हस्ताक्षर—महत्वपूर्ण व्यावसायिक दस्तावेजों के लिए निर्मित।",
        btn_start: "शुरू करें",
        btn_docs: "डॉक्स पढ़ें",
        grid_esign: "ई-साइन",
        grid_identity: "पहचान",
        grid_security: "सुरक्षा",
        grid_encryption: "एन्क्रिप्शन",
        grid_workflow: "वर्कफ़्लो",
        grid_compliance: "अनुपालन"
    }
};

function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.classList.contains('hero-gradient-text')) {
                el.textContent = translations[lang][key];
            } else if (el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'A') {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    // Update current lang display
    const currentLangDisplay = document.querySelector('.current-lang');
    if (currentLangDisplay) {
        const langNames = { en: "English", es: "Español", hi: "हिन्दी" };
        currentLangDisplay.textContent = langNames[lang] || lang.toUpperCase();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);

    // Toggle dropdown
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if (langDropdown) langDropdown.classList.remove('active');
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

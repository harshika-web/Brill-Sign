const translations = {
    en: {
        nav_features: "Features",
        nav_security: "Security",
        nav_pricing: "Pricing",
        nav_company: "Company",
        hero_title: "Take full control over your",
        hero_highlight: "Documents & Data",
        hero_subtitle: "Enterprise-grade encrypted e-signatures with decentralized storage—built for critical business documents.",
        btn_start: "Book a Demo",
        btn_docs: "Start a Free Trial",
        grid_esign: "E-Sign",
        grid_identity: "Identity",
        grid_security: "Security",
        grid_encryption: "Encryption",
        grid_workflow: "Workflow",
        grid_compliance: "Compliance",
        strategic_title: "Why Encrypted eSign Is a <span>Strategic Asset</span>",
        strategic_subtitle: "Encrypted eSign determines who owns the contract when something goes wrong. eSign is built so that ownership stays with the enterprise—not the vendor",
        strategic_card_1_title: "End-to-End Document Integrity",
        strategic_card_1_text: "Every document and signature is cryptographically sealed so any change whether intentional or accidental is immediately detectable.",
        strategic_card_2_title: "Decentralized Document Storage",
        strategic_card_2_text: "By design, eSign distributes document storage to prevent single points of control, limiting operational, regulatory, and vendor-related risk for enterprises.",
        strategic_card_3_title: "Strong Non-Repudiation",
        strategic_card_3_text: "Signatures are bound to the signer, the document, and the moment of signing, creating proof that stands up in audits and disputes.",
        strategic_card_4_title: "Sovereign Signer Identity Layer",
        strategic_card_4_text: "eSign establishes signer identity through decentralized identifiers, enabling proof of authority or eligibility without collecting or retaining excess personal data.",
        test_title: "Experiences worth hearing from",
        test_highlight: "eSign turns signatures into <span>defensible records</span>",
        test_subtitle: "Every document remains verifiable, compliant, and ready for scrutiny when it matters most.",
        test_card_1_quote: "We stopped thinking about signatures as a workflow and started treating them as evidence.",
        test_card_1_text: "BrillSign gave us confidence that every signed document would still hold up months or years later, without relying on vendor access or manual reconstruction.",
        test_card_2_quote: "Audit reviews went from reactive to routine.",
        test_card_2_text: "With immutable logs and enforced policies, our compliance team no longer has to chase records or explain inconsistencies during audits.",
        test_card_3_quote: "The biggest value wasn’t speed — it was certainty.",
        test_card_3_text: "Knowing documents can’t be altered and identities are verifiable removed a class of legal and security risk we were previously accepting.",
        test_card_4_quote: "We reduced vendor trust without increasing operational friction.",
        test_card_4_text: "BrillSign let us keep control of keys and data while still supporting enterprise-scale signing workflows.",
        test_card_5_quote: "Cross-border signing stopped being a legal bottleneck.",
        test_card_5_text: "Jurisdiction-aware workflows meant fewer escalations to legal and faster turnaround without compliance shortcuts.",
        test_card_6_quote: "Exiting the platform isn’t a risk scenario anymore.",
        test_card_6_text: "Our signed documents remain independently verifiable, which changed how procurement and legal evaluated long-term contracts.",
        test_card_7_quote: "Security reviews focused on architecture — not promises.",
        test_card_7_text: "Zero-knowledge handling and verifiable audit trails made approvals faster because risk was reduced by design."
    },
    es: {
        nav_features: "Funcionalidades",
        nav_security: "Seguridad",
        nav_pricing: "Precios",
        nav_company: "Empresa",
        hero_title: "Tome el control total de sus",
        hero_highlight: "Documentos y Datos",
        hero_subtitle: "Firmas electrónicas cifradas de nivel empresarial con almacenamiento descentralizado para documentos críticos.",
        btn_start: "Unirse a la lista de espera",
        btn_docs: "Ver documentación",
        grid_esign: "Firma-E",
        grid_identity: "Identidad",
        grid_security: "Seguridad",
        grid_encryption: "Cifrado",
        grid_workflow: "Flujo",
        grid_compliance: "Cumplimiento",
        strategic_title: "Por qué el eSign encriptado es un <span>activo estratégico</span>",
        strategic_subtitle: "El eSign encriptado determina quién es el propietario del contrato cuando algo sale mal. eSign está diseñado para que la propiedad permanezca en la empresa, no en el proveedor.",
        strategic_card_1_title: "Integridad del documento de extremo a extremo",
        strategic_card_1_text: "Cada documento y firma está sellado criptográficamente para que cualquier cambio, ya sea intencionado o accidental, sea inmediatamente detectable.",
        strategic_card_2_title: "Almacenamiento descentralizado de documentos",
        strategic_card_2_text: "Por diseño, eSign distribuye el almacenamiento de documentos para evitar puntos únicos de control, limitando el riesgo operativo, regulatorio y relacionado con el proveedor para las empresas.",
        strategic_card_3_title: "Sólido no repudio",
        strategic_card_3_text: "Las firmas están vinculadas al firmante, al documento y al momento de la firma, creando una prueba que se mantiene en auditorías y disputas.",
        strategic_card_4_title: "Capa de identidad soberana del firmante",
        strategic_card_4_text: "eSign establece la identidad del firmante a través de identificadores descentralizados, lo que permite la prueba de autoridad o elegibilidad sin recopilar ni retener datos personales en exceso.",
        test_title: "Experiencias que vale la pena escuchar",
        test_highlight: "eSign convierte las firmas en <span>registros defendibles</span>",
        test_subtitle: "Cada documento sigue siendo verificable, cumple con las normas y está listo para ser examinado cuando más importa.",
        test_card_1_quote: "Dejamos de pensar en las firmas como un flujo de trabajo y empezamos a tratarlas como evidencia.",
        test_card_1_text: "BrillSign nos dio la confianza de que cada documento firmado seguiría siendo válido meses o años después, sin depender del acceso del proveedor ni de la reconstrucción manual.",
        test_card_2_quote: "Las revisiones de auditoría pasaron de ser reactivas a rutinarias.",
        test_card_2_text: "Con registros inmutables y políticas aplicadas, nuestro equipo de cumplimiento ya no tiene que perseguir registros ni explicar inconsistencias durante las auditorías.",
        test_card_3_quote: "El mayor valor no fue la velocidad, fue la certeza.",
        test_card_3_text: "Saber que los documentos no pueden alterarse y que las identidades son verificables eliminó una clase de riesgo legal y de seguridad que antes aceptábamos.",
        test_card_4_quote: "Redujimos la confianza en el proveedor sin aumentar la fricción operativa.",
        test_card_4_text: "BrillSign nos permitió mantener el control de las llaves y los datos mientras seguimos admitiendo flujos de trabajo de firma a escala empresarial.",
        test_card_5_quote: "La firma transfronteriza dejó de ser un cuello de botella legal.",
        test_card_5_text: "Los flujos de trabajo conscientes de la jurisdicción significaron menos escaladas a legal y una respuesta más rápida sin atajos de cumplimiento.",
        test_card_6_quote: "Salir de la plataforma ya no es un escenario de riesgo.",
        test_card_6_text: "Nuestros documentos firmados siguen siendo verificables de forma independiente, lo que cambió la forma en que las áreas de compras y legal evaluaban los contratos a largo plazo.",
        test_card_7_quote: "Las revisiones de seguridad se centraron en la arquitectura, no en las promesas.",
        test_card_7_text: "El manejo de conocimiento cero y las pistas de auditoría verificables agilizaron las aprobaciones porque el riesgo se redujo por diseño."
    },
    hi: {
        nav_features: "विशेषताएं",
        nav_security: "सुरक्षा",
        nav_pricing: "कीमतें",
        nav_company: "कंपनी",
        hero_title: "अपने पर पूर्ण नियंत्रण रखें",
        hero_highlight: "दस्तावेज़ और डेटा",
        hero_subtitle: "विकेंद्रीकृत भंडारण के साथ एंटरप्राइज़-ग्रेड एन्क्रिप्टेड ई-हस्ताक्षर—महत्वपूर्ण व्यावसायिक दस्तावेजों के लिए निर्मित।",
        btn_start: "प्रतीक्षा सूची में शामिल हों",
        btn_docs: "दस्तावेज़ देखें",
        grid_esign: "ई-साइन",
        grid_identity: "पहचान",
        grid_security: "सुरक्षा",
        grid_encryption: "एन्क्रिप्शन",
        grid_workflow: "वर्कफ़्लो",
        grid_compliance: "अनुपालन",
        strategic_title: "एन्क्रिप्टेड ई-साइन एक <span>रणनीतिक संपत्ति</span> क्यों है",
        strategic_subtitle: "एन्क्रिप्टेड ई-साइन यह निर्धारित करता है कि कुछ गलत होने पर अनुबंध का मालिक कौन है। ई-साइन को इसलिए बनाया गया है ताकि स्वामित्व एंटरप्राइज़ के पास रहे—विक्रेता के पास नहीं।",
        strategic_card_1_title: "एंड-टू-एंड दस्तावेज़ अखंडता",
        strategic_card_1_text: "प्रत्येक दस्तावेज़ और हस्ताक्षर को क्रिप्टोग्राफिक रूप से सील किया गया है ताकि कोई भी परिवर्तन, चाहे वह जानबूझकर हो या अनजाने में, तुरंत पता चल सके।",
        strategic_card_2_title: "विकेंद्रीकृत दस्तावेज़ भंडारण",
        strategic_card_2_text: "डिज़ाइन के आधार पर, ई-साइन नियंत्रण के एकल बिंदुओं को रोकने के लिए दस्तावेज़ भंडारण को वितरित करता है, जिससे उद्यमों के लिए परिचालन, नियामक और विक्रेता से संबंधित जोखिम सीमित हो जाता है।",
        strategic_card_3_title: "मजबूत गैर-अस्वीकरण",
        strategic_card_3_text: "हस्ताक्षर हस्ताक्षरकर्ता, दस्तावेज़ और हस्ताक्षर के क्षण से जुड़े होते हैं, जो प्रमाण बनाते हैं जो ऑडिट और विवादों में टिकते हैं।",
        strategic_card_4_title: "संप्रभु हस्ताक्षरकर्ता पहचान परत",
        strategic_card_4_text: "ई-साइन विकेंद्रीकृत पहचानकर्ताओं के माध्यम से हस्ताक्षरकर्ता की पहचान स्थापित करता है, जो अतिरिक्त व्यक्तिगत डेटा एकत्र या बनाए रखे बिना अधिकार या पात्रता का प्रमाण सक्षम बनाता है।",
        test_title: "सुनने लायक अनुभव",
        test_highlight: "ई-साइन हस्ताक्षरों को <span>बचाव योग्य रिकॉर्ड</span> में बदल देता है",
        test_subtitle: "हर दस्तावेज़ सत्यापन योग्य, अनुपालन योग्य और जांच के लिए तैयार रहता है जब यह सबसे अधिक मायने रखता है।",
        test_card_1_quote: "हमने हस्ताक्षरों को वर्कफ़्लो के रूप में सोचना बंद कर दिया और उन्हें सबूत के रूप में मानना शुरू कर दिया।",
        test_card_1_text: "ब्रिलसाइन ने हमें विश्वास दिलाया कि हर हस्ताक्षरित दस्तावेज़ महीनों या वर्षों बाद भी टिका रहेगा, विक्रेता की पहुंच या मैन्युअल पुनर्निर्माण पर निर्भर हुए बिना।",
        test_card_2_quote: "ऑडिट समीक्षाएं प्रतिक्रियाशील से नियमित हो गईं।",
        test_card_2_text: "अपरिवर्तनीय लॉग और लागू नीतियों के साथ, हमारी अनुपालन टीम को अब ऑडिट के दौरान रिकॉर्ड का पीछा करने या विसंगतियों की व्याख्या करने की आवश्यकता नहीं है।",
        test_card_3_quote: "सबसे बड़ा मूल्य गति नहीं थी — वह निश्चितता थी।",
        test_card_3_text: "यह जानना कि दस्तावेजों को बदला नहीं जा सकता है और पहचान सत्यापन योग्य है, कानूनी और सुरक्षा जोखिम के एक वर्ग को हटा दिया जिसे हम पहले स्वीकार कर रहे थे।",
        test_card_4_quote: "हमने परिचालन घर्षण को बढ़ाए बिना विक्रेता के भरोसे को कम किया।",
        test_card_4_text: "ब्रिलसाइन ने हमें चाबियों और डेटा पर नियंत्रण रखने दिया जबकि अभी भी एंटरप्राइज़-स्केल साइनिंग वर्कफ़्लो का समर्थन करता है।",
        test_card_5_quote: "सीमा पार हस्ताक्षर करना कानूनी बाधा बनना बंद हो गया।",
        test_card_5_text: "क्षेत्र-जागरूक वर्कफ़्लो का मतलब कानूनी स्तर पर कम वृद्धि और अनुपालन शॉर्टकट के बिना तेज़ टर्नअराउंड था।",
        test_card_6_quote: "प्लेटफ़ॉर्म से बाहर निकलना अब कोई जोखिम भरा परिदृश्य नहीं है।",
        test_card_6_text: "हमारे हस्ताक्षरित दस्तावेज़ स्वतंत्र रूप से सत्यापन योग्य रहते हैं, जिसने खरीद और कानूनी विभाग द्वारा दीर्घकालिक अनुबंधों का मूल्यांकन करने के तरीके को बदल दिया।",
        test_card_7_quote: "सुरक्षा समीक्षा वादों पर नहीं — वास्तुकला पर केंद्रित थी।",
        test_card_7_text: "जीरो-नॉलेज हैंडलिंग और सत्यापन योग्य ऑडिट ट्रेल्स ने अनुमोदन को तेज़ कर दिया क्योंकि डिज़ाइन द्वारा जोखिम कम कर दिया गया था।"
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
            } else if (el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'A') {
                if (translations[lang][key].includes('<span')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
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
        // Use short codes: EN, ES, HI
        const langNames = { en: "EN", es: "ES", hi: "HI" };
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

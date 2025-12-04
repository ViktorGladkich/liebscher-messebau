
import React, { useEffect } from 'react';

export const DatenschutzPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-secondary min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif mb-16 text-primary">Datenschutz&shy;erklärung</h1>
        
        <div className="space-y-12 text-gray-600 font-light leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-primary mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-bold mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">2. Datenerfassung auf unserer Website</h2>
            <h3 className="font-bold mb-2">Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
            <h3 className="font-bold mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">3. Analyse-Tools und Werbung</h2>
            <p>
              Derzeit setzen wir keine externen Tracking- oder Werbe-Tools (wie Google Analytics) auf dieser Website ein.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">4. Plugins und Tools</h2>
            <h3 className="font-bold mb-2">Google Web Fonts</h3>
            <p>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

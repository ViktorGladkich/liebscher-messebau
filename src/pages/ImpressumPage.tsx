
import React, { useEffect } from 'react';

export const ImpressumPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-secondary min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif mb-16 text-primary">Impressum</h1>
        
        <div className="space-y-12 text-gray-600 font-light leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-primary mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Liebscher Messestandbau GmbH<br />
              Industriestraße 45<br />
              10115 Berlin<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">Kontakt</h2>
            <p>
              Telefon: +49 30 1234 5678<br />
              E-Mail: info@liebscher-messe.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Berlin-Charlottenburg<br />
              Registernummer: HRB 123456 B
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE 123 456 789
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Max Liebscher<br />
              Industriestraße 45<br />
              10115 Berlin
            </p>
          </section>

          <section className="pt-8 border-t border-primary/10">
            <h2 className="text-lg font-bold text-primary mb-4">Haftung für Inhalte</h2>
            <p className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

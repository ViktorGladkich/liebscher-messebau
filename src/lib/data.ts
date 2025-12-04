import type { ProjectData } from "../types";

export const projectsData: ProjectData[] = [
  { 
    id: 1, 
    slug: 'lumina-grand-hall',
    title: 'Lumina Grand Hall', 
    category: 'Technologie', 
    year: '2024', 
    location: 'Stuttgart',
    client: 'Lumina Tech Systems',
    imageUrl: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2700&auto=format&fit=crop', 
    description: 'Eine immersive Lichtinstallation für die Tech Week.',
    challenge: 'Die Herausforderung bestand darin, ein abstraktes Softwareprodukt in ein physisches, haptisches Erlebnis zu übersetzen, das 5000 Besucher täglich fesselt, ohne chaotisch zu wirken.',
    solution: 'Wir entwickelten "The Core" – eine zentrale, pulsierende Lichtskulptur, die als Herzstück des Standes fungiert. Umgeben von minimalistischen Workstations bot der Stand sowohl Spektakel als auch Rückzugsorte für tiefe Gespräche.',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop'
    ]
  },
  { 
    id: 2, 
    slug: 'azure-pavilion',
    title: 'Azure Pavilion', 
    category: 'Automotive', 
    year: '2023', 
    location: 'München',
    client: 'Azure Motors',
    imageUrl: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop', 
    description: 'Nachhaltige Mobilität in fließenden Formen.',
    challenge: 'Präsentation der neuen E-Flotte in einem Umfeld, das "Natur" und "Technik" nicht als Gegensätze, sondern als Symbiose darstellt.',
    solution: 'Verwendung von gebogenem, recyceltem Holz in Kombination mit hochglänzenden weißen Oberflächen. Der Pavillon wirkte wie eine organische Welle, die sich durch die Messehalle bewegt.',
    gallery: [
      'https://images.unsplash.com/photo-1506543730435-e2c1d455f5e9?q=80&w=2548&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215842964-222b4bef9728?q=80&w=2700&auto=format&fit=crop'
    ]
  },
  { 
    id: 3, 
    slug: 'nordic-living',
    title: 'Nordic Living', 
    category: 'Interieur', 
    year: '2023', 
    location: 'Köln',
    client: 'Nordic Home Collective',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2700&auto=format&fit=crop', 
    description: 'Minimalismus trifft auf radikale Gemütlichkeit.',
    challenge: 'Wie stellt man Möbel auf einer hektischen Messe so aus, dass sich der Besucher wie zu Hause fühlt?',
    solution: 'Wir bauten ein "Haus im Haus" Konzept mit halbdurchlässigen Textilwänden, die akustisch abschirmten, aber Licht durchließen. Ein warmer Rückzugsort inmitten des Messechaos.',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop'
    ]
  },
  { 
    id: 4, 
    slug: 'aether-space',
    title: 'Aether Space', 
    category: 'Pharma', 
    year: '2022', 
    location: 'Basel',
    client: 'Aether Pharm',
    imageUrl: 'https://images.unsplash.com/photo-1506543730435-e2c1d455f5e9?q=80&w=2548&auto=format&fit=crop', 
    description: 'Reine Laborästhetik neu interpretiert.',
    challenge: 'Komplexe biochemische Prozesse verständlich und ästhetisch ansprechend darzustellen.',
    solution: 'Eine Installation aus 1000 hängenden Glasphiolen, die durch LED-Steuerung Molekülketten bildeten. Klinische Reinheit traf auf künstlerische Abstraktion.',
    gallery: [
       'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=2700&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop'
    ]
  },
  { 
    id: 5, 
    slug: 'eco-systems',
    title: 'Eco Systems', 
    category: 'Nachhaltigkeit', 
    year: '2022', 
    location: 'Berlin',
    client: 'Green Future AG',
    imageUrl: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=2700&auto=format&fit=crop', 
    description: 'Ein Stand, der zu 100% kompostierbar ist.',
    challenge: 'Einen Messestand zu entwickeln, der nach der Messe keinen Müll hinterlässt.',
    solution: 'Verwendung von Myzel-basierten Platten und lokalem Nadelholz. Nach der Messe wurden die Elemente in einem lokalen Gemeinschaftsgarten weiterverwendet.',
    gallery: []
  },
  { 
    id: 6, 
    slug: 'urban-mobility',
    title: 'Urban Mobility', 
    category: 'Automotive', 
    year: '2021', 
    location: 'Frankfurt',
    client: 'City Move',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop', 
    description: 'Die Stadt der Zukunft im Modellmaßstab.',
    challenge: 'Urbane Dichte auf begrenztem Raum darzustellen.',
    solution: 'Ein vertikales Standkonzept über zwei Ebenen, das die Vielschichtigkeit moderner Metropolen widerspiegelt.',
    gallery: []
  },
  { 
    id: 7, 
    slug: 'digital-nexus',
    title: 'Digital Nexus', 
    category: 'Technologie', 
    year: '2021', 
    location: 'Hannover',
    client: 'NexGen Data',
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b4bef9728?q=80&w=2700&auto=format&fit=crop', 
    description: 'Datenströme als architektonisches Element.',
    challenge: 'Unsichtbare Cloud-Infrastruktur sichtbar machen.',
    solution: 'Einsatz von transparenten OLED-Screens und einer Matrix-Deckenkonstruktion.',
    gallery: []
  },
  { 
    id: 8, 
    slug: 'pure-form',
    title: 'Pure Form', 
    category: 'Interieur', 
    year: '2020', 
    location: 'Mailand',
    client: 'Casa Pura',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop', 
    description: 'Italienische Eleganz in Perfektion.',
    challenge: 'Ein klassisches Showroom-Gefühl auf einer temporären Fläche.',
    solution: 'Massive Marmorböden (modular verlegt) und schwere Samtvorhänge schufen eine Atmosphäre von Permanenz und Luxus.',
    gallery: []
  }
];

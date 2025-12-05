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
    imageUrl: '/projects/luminaGrandHall.jpg', 
    description: 'Eine immersive Lichtinstallation für die Tech Week.',
    challenge: 'Die Herausforderung bestand darin, ein abstraktes Softwareprodukt in ein physisches, haptisches Erlebnis zu übersetzen, das 5000 Besucher täglich fesselt, ohne chaotisch zu wirken.',
    solution: 'Wir entwickelten "The Core" – eine zentrale, pulsierende Lichtskulptur, die als Herzstück des Standes fungiert. Umgeben von minimalistischen Workstations bot der Stand sowohl Spektakel als auch Rückzugsorte für tiefe Gespräche.',
    gallery: [
      '/projects/luminaGrandHall2.jpg',
      '/projects/luminaGrandHall3.jpg',
      '/projects/luminaGrandHall4.jpg'
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
    imageUrl: '/projects/azurePavilion3.jpg', 
    description: 'Nachhaltige Mobilität in fließenden Formen.',
    challenge: 'Präsentation der neuen E-Flotte in einem Umfeld, das "Natur" und "Technik" nicht als Gegensätze, sondern als Symbiose darstellt.',
    solution: 'Verwendung von gebogenem, recyceltem Holz in Kombination mit hochglänzenden weißen Oberflächen. Der Pavillon wirkte wie eine organische Welle, die sich durch die Messehalle bewegt.',
    gallery: [
      '/projects/azurePavilion2.jpg',
      '/projects/azurePavilion.jpg',
      '/projects/azurePavilion4.jpg'
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
    imageUrl: '/projects/nordicLiving.jpg', 
    description: 'Minimalismus trifft auf radikale Gemütlichkeit.',
    challenge: 'Wie stellt man Möbel auf einer hektischen Messe so aus, dass sich der Besucher wie zu Hause fühlt?',
    solution: 'Wir bauten ein "Haus im Haus" Konzept mit halbdurchlässigen Textilwänden, die akustisch abschirmten, aber Licht durchließen. Ein warmer Rückzugsort inmitten des Messechaos.',
    gallery: [
      '/projects/nordicLiving2.jpg',
      '/projects/nordicLiving3.jpg',
      '/projects/nordicLiving4.jpg'
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
    imageUrl: '/projects/aetherSpace.jpg', 
    description: 'Reine Laborästhetik neu interpretiert.',
    challenge: 'Komplexe biochemische Prozesse verständlich und ästhetisch ansprechend darzustellen.',
    solution: 'Eine Installation aus 1000 hängenden Glasphiolen, die durch LED-Steuerung Molekülketten bildeten. Klinische Reinheit traf auf künstlerische Abstraktion.',
    gallery: [
       '/projects/aetherSpace2.jpg',
       '/projects/aetherSpace3.jpg',
        '/projects/aetherSpace4.jpg'
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
    imageUrl: '/projects/ecoStand.jpg', 
    description: 'Ein Stand, der zu 100% kompostierbar ist.',
    challenge: 'Einen Messestand zu entwickeln, der nach der Messe keinen Müll hinterlässt.',
    solution: 'Verwendung von Myzel-basierten Platten und lokalem Nadelholz. Nach der Messe wurden die Elemente in einem lokalen Gemeinschaftsgarten weiterverwendet.',
    gallery: [
      '/projects/ecoStand2.jpg',
      '/projects/ecoStand3.jpg',
      '/projects/ecoStand4.jpg'
    ]
  },
  { 
    id: 6, 
    slug: 'urban-mobility',
    title: 'Urban Mobility', 
    category: 'Automotive', 
    year: '2021', 
    location: 'Frankfurt',
    client: 'City Move',
    imageUrl: '/projects/urbanMobility.jpg', 
    description: 'Die Stadt der Zukunft im Modellmaßstab.',
    challenge: 'Urbane Dichte auf begrenztem Raum darzustellen.',
    solution: 'Ein vertikales Standkonzept über zwei Ebenen, das die Vielschichtigkeit moderner Metropolen widerspiegelt.',
    gallery: [
      '/projects/urbanMobility2.jpg',
      '/projects/urbanMobility3.jpg',
      '/projects/urbanMobility4.jpg'
    ]
  },
  { 
    id: 7, 
    slug: 'digital-nexus',
    title: 'Digital Nexus', 
    category: 'Technologie', 
    year: '2021', 
    location: 'Hannover',
    client: 'NexGen Data',
    imageUrl: '/projects/digitalNexus.jpg', 
    description: 'Datenströme als architektonisches Element.',
    challenge: 'Unsichtbare Cloud-Infrastruktur sichtbar machen.',
    solution: 'Einsatz von transparenten OLED-Screens und einer Matrix-Deckenkonstruktion.',
    gallery: [
      '/projects/digitalNexus2.jpg',
      '/projects/digitalNexus3.jpg',
      '/projects/digitalNexus4.jpg'
    ]
  },
  { 
    id: 8, 
    slug: 'pure-form',
    title: 'Pure Form', 
    category: 'Interieur', 
    year: '2020', 
    location: 'Mailand',
    client: 'Casa Pura',
    imageUrl: '/projects/pureForm.jpg', 
    description: 'Italienische Eleganz in Perfektion.',
    challenge: 'Ein klassisches Showroom-Gefühl auf einer temporären Fläche.',
    solution: 'Massive Marmorböden (modular verlegt) und schwere Samtvorhänge schufen eine Atmosphäre von Permanenz und Luxus.',
    gallery: [
      '/projects/pureForm2.jpg',
      '/projects/pureForm3.jpg',
      '/projects/pureForm4.jpg'
    ]
  }
];

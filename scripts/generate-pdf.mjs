import React from 'react';
import { renderToBuffer, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

Font.register({
  family: 'Rufina',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/rufina/v17/Yq6V-LyURyLy-aKyow.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/rufina/v17/Yq6W-LyURyLy-aKKHztAvA.ttf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Figtree',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/figtree/v9/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_chQF5e.ttf', fontWeight: 300 },
    { src: 'https://fonts.gstatic.com/s/figtree/v9/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_dNQF5e.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/figtree/v9/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_ehR15e.ttf', fontWeight: 600 },
  ],
});

const S = StyleSheet.create({
  page: { fontFamily: 'Figtree', fontSize: 7.5, fontWeight: 300, color: '#141210', backgroundColor: '#FCFCFA', paddingTop: 30, paddingBottom: 28, paddingHorizontal: 36 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 12, marginBottom: 12, borderBottomWidth: 1.5, borderBottomColor: '#FEFE7D', borderBottomStyle: 'solid' },
  headerLeft: { flexDirection: 'column', maxWidth: 340 },
  name: { fontFamily: 'Rufina', fontSize: 22, fontWeight: 700, color: '#141210', lineHeight: 1 },
  role: { fontSize: 8, fontWeight: 300, color: '#ACACAA', marginTop: 3 },
  statement: { fontSize: 7.5, fontWeight: 300, color: '#141210', lineHeight: 1.55, marginTop: 7, borderLeftWidth: 1.5, borderLeftColor: '#FEFE7D', borderLeftStyle: 'solid', paddingLeft: 6 },
  headerRight: { alignItems: 'flex-end', gap: 4 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  badgeText: { backgroundColor: '#FEFE7D', color: '#484800', fontSize: 6, fontWeight: 600, letterSpacing: 0.3, paddingVertical: 2, paddingHorizontal: 7, borderRadius: 20 },
  meta: { fontSize: 7, fontWeight: 300, color: '#ACACAA', textAlign: 'right', lineHeight: 1.6, marginTop: 3 },
  body: { flexDirection: 'row', gap: 20, marginTop: 0 },
  colLeft: { width: 300, flexShrink: 0 },
  colRight: { width: 203, flexShrink: 0 },
  sectionTitle: { fontSize: 6, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', color: '#CACAC8', marginBottom: 5, marginTop: 10, paddingBottom: 3, borderBottomWidth: 0.5, borderBottomColor: '#EEEEE8', borderBottomStyle: 'solid' },
  firstSection: { marginTop: 0 },
  expItem: { marginBottom: 7 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  expCompany: { fontFamily: 'Rufina', fontSize: 10, fontWeight: 700, color: '#141210' },
  expYear: { fontSize: 6.5, fontWeight: 300, color: '#ACACAA' },
  expRoleBadge: { backgroundColor: '#FEFE7D', color: '#484800', fontSize: 6, fontWeight: 600, paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 20, alignSelf: 'flex-start', marginTop: 2, marginBottom: 3 },
  expDesc: { fontSize: 7, fontWeight: 300, color: '#ACACAA', lineHeight: 1.45 },
  expMetrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 2 },
  expMetric: { fontSize: 6.5, fontWeight: 600, color: '#141210' },
  expBullets: { marginTop: 3, gap: 2 },
  expBullet: { flexDirection: 'row', gap: 4 },
  expBulletDot: { fontSize: 7, color: '#ACACAA', marginTop: 0.5 },
  expBulletLabel: { fontSize: 7, fontWeight: 600, color: '#141210' },
  expBulletText: { fontSize: 7, fontWeight: 300, color: '#ACACAA', lineHeight: 1.4, flex: 1 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 4 },
  tag: { fontSize: 6, fontWeight: 400, color: '#ACACAA', borderWidth: 0.5, borderColor: '#E4E4DC', borderStyle: 'solid', paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 20 },
  formItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#F0F0EA', borderBottomStyle: 'solid' },
  formSchool: { fontFamily: 'Rufina', fontSize: 7.5, fontWeight: 400, color: '#141210' },
  formDiploma: { fontSize: 6, fontWeight: 300, color: '#ACACAA', marginTop: 1 },
  formYear: { fontSize: 6.5, fontWeight: 300, color: '#ACACAA', flexShrink: 0 },
  rayItem: { marginBottom: 5 },
  rayLabel: { fontSize: 6.5, fontWeight: 600, color: '#141210', marginBottom: 2 },
  rayText: { fontSize: 7, fontWeight: 300, color: '#ACACAA', lineHeight: 1.45 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderTopColor: '#EEEEE8', borderTopStyle: 'solid', paddingTop: 5, marginTop: 10 },
  footerText: { fontSize: 6.5, fontWeight: 300, color: '#ACACAA' },
});

const e = React.createElement;

const CVDoc = e(Document, null,
  e(Page, { size: 'A4', style: S.page },
    // Header
    e(View, { style: S.header },
      e(View, { style: S.headerLeft },
        e(Text, { style: S.name }, 'Geoffrey Bruyère'),
        e(Text, { style: S.role }, 'CEO · CMO · Marque, Croissance & Transformation IA'),
        e(Text, { style: S.statement }, "Diriger une marque B2C, c'est tenir deux exigences contradictoires en même temps : créer du désir et produire de la performance. J'ai passé 16 ans à faire les deux - de zéro à 10 M€ chez BonneGueule, puis dans le ComEx d'un leader européen du e-tourisme. C'est ce que je veux construire à nouveau, avec l'IA comme levier."),
      ),
      e(View, { style: S.headerRight },
        e(View, { style: S.badge },
          e(Text, { style: S.badgeText }, 'DISPONIBLE'),
        ),
        e(Text, { style: S.meta }, 'Aix-en-Provence · Paris · Monde\nBilingue anglais / français'),
      ),
    ),
    // Body
    e(View, { style: S.body },
      // Left column
      e(View, { style: S.colLeft },
        e(Text, { style: [S.sectionTitle, S.firstSection] }, '01 · PARCOURS'),
        // Core Summit
        e(View, { style: S.expItem },
          e(View, { style: S.expHeader }, e(Text, { style: S.expCompany }, 'Core Summit'), e(Text, { style: S.expYear }, '2026–présent')),
          e(Text, { style: S.expRoleBadge }, 'Co-fondateur · Side project'),
          e(Text, { style: S.expDesc }, "Séminaire d'executive coaching en immersion montagne pour fondateurs et CEOs (lancement juillet 2026)."),
          e(Text, { style: S.expDesc }, 'Construction complète IA-first : site, tunnel de vente, pipeline de candidatures - développé avec Claude Code et agents IA.'),
        ),
        // Voyage Privé
        e(View, { style: S.expItem },
          e(View, { style: S.expHeader }, e(Text, { style: S.expCompany }, 'Voyage Privé'), e(Text, { style: S.expYear }, '2024–2025 · 2 ans')),
          e(Text, { style: S.expRoleBadge }, 'CMO · ComEx'),
          e(Text, { style: S.expDesc }, 'Stratégie marketing globale d\'un acteur leader du voyage premium en ligne (C.A. >1Md€, CAGR >+10%) : acquisition online / offline dont TV / organique, CRM, branding, retail média sur 9 marchés.'),
          e(View, { style: S.expMetrics }, e(Text, { style: S.expMetric }, '>1Md€ CA'), e(Text, { style: S.expMetric }, '+10% CAGR'), e(Text, { style: S.expMetric }, '>10M€ budget'), e(Text, { style: S.expMetric }, '9 marchés')),
          e(View, { style: S.expBullets },
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Performance '), 'Pilotage de la performance marketing (budget >10M€, reporting CEO).')),
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Direction & Gouvernance (ComEx) '), 'Alignement stratégie marketing / objectifs groupe, décisions cross-fonctions (tech, produit, commercial).')),
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Organisation & Chantiers '), "Réorganisation de l'équipe de 35 experts, création de la fonction branding et refonte complète de la plateforme de marque.")),
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Transformation IA '), "Déploiement d'automatisations IA sur CRM, SEO et acquisition payante. Réduction >50% coûts SEO, renégociation >25% SaaS.")),
          ),
        ),
        // BonneGueule
        e(View, { style: S.expItem },
          e(View, { style: S.expHeader }, e(Text, { style: S.expCompany }, 'BonneGueule'), e(Text, { style: S.expYear }, '2010–2022 · 12 ans')),
          e(Text, { style: S.expRoleBadge }, 'CEO · Co-fondateur'),
          e(Text, { style: S.expDesc }, "Création d'un modèle pionnier, à la fois marque de mode masculine digitale et média communautaire. Croissance organique et rentable de 0 à 10M€ (+50% CAGR, 6,8% EBE)."),
          e(View, { style: S.expMetrics }, e(Text, { style: S.expMetric }, '10M€ CA'), e(Text, { style: S.expMetric }, '6,8% EBE'), e(Text, { style: S.expMetric }, 'NPS 95'), e(Text, { style: S.expMetric }, '60 pers.'), e(Text, { style: S.expMetric }, '10 boutiques')),
          e(View, { style: S.expBullets },
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Modèle économique '), "Précurseur du \"nouveau luxe\" et des DNVB — média comme moteur d'acquisition organique, boutiques comme extension de marque. 4,5M V.U./an, 150k abonnés YouTube.")),
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Croissance et Marque '), 'Désirabilité fondée sur le récit authentique et des lancements en drop. Aucun discount en 12 ans. NPS 95. 63% de repeat business.')),
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Distribution omnicanale digital-first '), "Ouverture de 10 magasins expérientiels en propre (choix des emplacements, financement, suivi travaux).")),
            e(View, { style: S.expBullet }, e(Text, { style: S.expBulletDot }, '—'), e(Text, { style: S.expBulletText }, e(Text, { style: S.expBulletLabel }, 'Leadership '), "De 1 à 60 collaborateurs (Top 100 GPtW France) — de fondateur-exécutant à dirigeant d'organisation.")),
          ),
        ),
        // Wavestone
        e(View, { style: S.expItem },
          e(View, { style: S.expHeader }, e(Text, { style: S.expCompany }, 'Wavestone · HeadMind Partners'), e(Text, { style: S.expYear }, '2009–2011 · 2 ans')),
          e(Text, { style: S.expRoleBadge }, 'Consultant en stratégie · CDI'),
          e(Text, { style: S.expDesc }, 'Début de carrière dans le conseil : fonctions commerciales, puis consultant en stratégie.'),
        ),
        // Rayonnement
        e(Text, { style: S.sectionTitle }, 'DISTINCTIONS & RAYONNEMENT'),
        e(View, { style: S.rayItem }, e(Text, { style: S.rayLabel }, 'Distinctions'), e(Text, { style: S.rayText }, "FT1000 - Financial Times Europe's Fastest Growing Companies (#580). Délégation française G20 Young Entrepreneurs 2018 - Buenos Aires.")),
        e(View, { style: S.rayItem }, e(Text, { style: S.rayLabel }, 'Conférences'), e(Text, { style: S.rayText }, 'Hermès, Moët, Weston, Galeries Lafayette, IADS, IFM, HEC, ESSEC, Sciences Po, Bpifrance.')),
        e(View, { style: S.rayItem }, e(Text, { style: S.rayLabel }, 'Business cases'), e(Text, { style: S.rayText }, 'BonneGueule étudié dans les MBA de HEC Entrepreneurs, ESSEC et IFM.')),
      ),
      // Right column
      e(View, { style: S.colRight },
        e(Text, { style: [S.sectionTitle, S.firstSection] }, '02 · SAVOIR-FAIRE DIRIGEANT'),
        e(View, { style: S.tags }, ...["Direction d'entreprise", "Leadership (→ 60 p.)", "Transformation digitale", "Financement", "Stratégie de croissance", "Retail expérientiel", "E-commerce", "Branding", "International"].map(t => e(Text, { key: t, style: S.tag }, t))),
        e(Text, { style: S.sectionTitle }, 'IA - STRATÉGIE & EXÉCUTION'),
        e(View, { style: S.tags }, ...["Augmentation des fonctions clé", "Orchestration d'agents IA", "Génération d'assets", "Prototypage full-stack", "Audit stacks IA", "Automatisations (workers)", "SEO pour LLMs (GEO)"].map(t => e(Text, { key: t, style: S.tag }, t))),
        e(Text, { style: S.sectionTitle }, '03 · FORMATION'),
        ...[
          { school: 'ESCP / Institut Français de la Mode', diploma: 'Accélérateur Mode & Luxe · IFM Labels · Paris', year: '2017' },
          { school: 'Bosphore University', diploma: 'MBA Program · Istanbul', year: '2010' },
          { school: 'Mines-Télécom Business School', diploma: 'MSc in Management · Paris', year: '2006' },
          { school: 'CPGE Lycée Albert Schweitzer', diploma: 'Maths Sup / Maths Spé · Mulhouse', year: '2004' },
        ].map(f => e(View, { key: f.year, style: S.formItem }, e(View, null, e(Text, { style: S.formSchool }, f.school), e(Text, { style: S.formDiploma }, f.diploma)), e(Text, { style: S.formYear }, f.year))),
        e(Text, { style: S.sectionTitle }, '04 · CULTURE PERSONNELLE'),
        ...[
          { label: 'Esthétique et matières', text: 'Architecture, arts graphiques, mode masculine, objets bien faits.' },
          { label: 'Montagne', text: 'Randonnées engagées (bivouac, multi-jours, hiver), alpinisme, escalade.' },
          { label: 'Sciences humaines', text: 'Méditation Zen Sōtō, psychologie, spiritualité.' },
        ].map(c => e(View, { key: c.label, style: S.rayItem }, e(Text, { style: S.rayLabel }, c.label), e(Text, { style: S.rayText }, c.text))),
      ),
    ),
    // Footer
    e(View, { style: S.footer },
      e(Text, { style: S.footerText }, 'geoffreybruyere@gmail.com · (+33)6 27 40 18 91'),
      e(Text, { style: S.footerText }, 'linkedin.com/in/geoffreybruyere · bruyere.cc'),
    ),
  ),
);

async function main() {
  console.log('Generating PDF...');
  const buffer = await renderToBuffer(CVDoc);
  const outPath = resolve(__dirname, '../public/geoffrey-bruyere-cv.pdf');
  writeFileSync(outPath, buffer);
  console.log(`PDF generated: ${outPath} (${(buffer.length / 1024).toFixed(1)}kb)`);
}

main().catch(console.error);

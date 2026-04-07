import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Rufina',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/rufina/v14/Yq6V-LyURyLy-aKyoxRktOdClg.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/rufina/v14/Yq6W-LyURyLy-aKKoxRkTCfXTg.woff2', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Figtree',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5ewkEU.woff2', fontWeight: 300 },
    { src: 'https://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5ewkEU.woff2', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5ewkEU.woff2', fontWeight: 600 },
  ],
});

const S = StyleSheet.create({
  page: {
    fontFamily: 'Figtree',
    fontSize: 7.5,
    fontWeight: 300,
    color: '#141210',
    backgroundColor: '#FCFCFA',
    paddingTop: 30,
    paddingBottom: 28,
    paddingHorizontal: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#FEFE7D',
    borderBottomStyle: 'solid',
  },
  headerLeft: { flexDirection: 'column', maxWidth: 340 },
  name: { fontFamily: 'Rufina', fontSize: 22, fontWeight: 700, color: '#141210', lineHeight: 1 },
  role: { fontSize: 8, fontWeight: 300, color: '#ACACAA', marginTop: 3 },
  statement: {
    fontSize: 7.5, fontWeight: 300, color: '#141210', lineHeight: 1.55, marginTop: 7,
    borderLeftWidth: 1.5, borderLeftColor: '#FEFE7D', borderLeftStyle: 'solid', paddingLeft: 6,
  },
  headerRight: { alignItems: 'flex-end', gap: 4 },
  badge: {
    backgroundColor: '#FEFE7D', color: '#484800', fontSize: 6, fontWeight: 600,
    letterSpacing: 0.8, paddingVertical: 2, paddingHorizontal: 7, borderRadius: 20,
  },
  meta: { fontSize: 7, fontWeight: 300, color: '#ACACAA', textAlign: 'right', lineHeight: 1.6, marginTop: 3 },
  body: { flexDirection: 'row', gap: 20, flex: 1 },
  colLeft: { width: '58%' },
  colRight: { width: '42%' },
  sectionTitle: {
    fontSize: 6, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: '#CACAC8',
    marginBottom: 5, marginTop: 10, paddingBottom: 3,
    borderBottomWidth: 0.5, borderBottomColor: '#EEEEE8', borderBottomStyle: 'solid',
  },
  firstSection: { marginTop: 0 },
  expItem: { marginBottom: 7 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  expCompany: { fontFamily: 'Rufina', fontSize: 10, fontWeight: 700, color: '#141210' },
  expYear: { fontSize: 6.5, fontWeight: 300, color: '#ACACAA' },
  expRoleBadge: {
    backgroundColor: '#FEFE7D', color: '#484800', fontSize: 6, fontWeight: 600,
    paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 20,
    alignSelf: 'flex-start', marginTop: 2, marginBottom: 3,
  },
  expDesc: { fontSize: 7, fontWeight: 300, color: '#ACACAA', lineHeight: 1.45 },
  expMetrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 2 },
  expMetric: { fontSize: 6.5, fontWeight: 600, color: '#141210' },
  expBullets: { marginTop: 3, gap: 2 },
  expBullet: { flexDirection: 'row', gap: 4 },
  expBulletDot: { fontSize: 7, color: '#ACACAA', marginTop: 0.5 },
  expBulletLabel: { fontSize: 7, fontWeight: 600, color: '#141210' },
  expBulletText: { fontSize: 7, fontWeight: 300, color: '#ACACAA', lineHeight: 1.4, flex: 1 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 4 },
  tag: {
    fontSize: 6, fontWeight: 400, color: '#ACACAA',
    borderWidth: 0.5, borderColor: '#E4E4DC', borderStyle: 'solid',
    paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 20,
  },
  formItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#F0F0EA', borderBottomStyle: 'solid',
  },
  formSchool: { fontFamily: 'Rufina', fontSize: 7.5, fontWeight: 400, color: '#141210' },
  formDiploma: { fontSize: 6, fontWeight: 300, color: '#ACACAA', marginTop: 1 },
  formYear: { fontSize: 6.5, fontWeight: 300, color: '#ACACAA', flexShrink: 0 },
  rayItem: { marginBottom: 5 },
  rayLabel: { fontSize: 6.5, fontWeight: 600, color: '#141210', marginBottom: 2 },
  rayText: { fontSize: 7, fontWeight: 300, color: '#ACACAA', lineHeight: 1.45 },
  footer: {
    flexDirection: 'row', justifyContent: 'space-between',
    borderTopWidth: 0.5, borderTopColor: '#EEEEE8', borderTopStyle: 'solid',
    paddingTop: 5, marginTop: 10,
  },
  footerText: { fontSize: 6.5, fontWeight: 300, color: '#ACACAA' },
});

export function CVDocument() {
  return (
    <Document>
      <Page size="A4" style={S.page}>
        <View style={S.header}>
          <View style={S.headerLeft}>
            <Text style={S.name}>Geoffrey Bruyère</Text>
            <Text style={S.role}>CEO · CMO · Marque, Croissance & Transformation IA</Text>
            <Text style={S.statement}>
              Diriger une marque B2C, c'est tenir deux exigences contradictoires en même temps : créer du désir et produire de la performance. J'ai passé 16 ans à faire les deux - de zéro à 10 M€ chez BonneGueule, puis dans le ComEx d'un leader européen du e-tourisme. C'est ce que je veux construire à nouveau, avec l'IA comme levier.
            </Text>
          </View>
          <View style={S.headerRight}>
            <Text style={S.badge}>● DISPONIBLE</Text>
            <Text style={S.meta}>Aix-en-Provence · Paris · Monde{'\n'}Bilingue anglais / français</Text>
          </View>
        </View>

        <View style={S.body}>
          <View style={S.colLeft}>
            <Text style={[S.sectionTitle, S.firstSection]}>01 · Parcours</Text>

            <View style={S.expItem}>
              <View style={S.expHeader}>
                <Text style={S.expCompany}>Core Summit</Text>
                <Text style={S.expYear}>2026–présent</Text>
              </View>
              <Text style={S.expRoleBadge}>Co-fondateur · Side project</Text>
              <Text style={S.expDesc}>Séminaire d'executive coaching en immersion montagne pour fondateurs et CEOs (lancement juillet 2026).</Text>
              <Text style={S.expDesc}>Construction complète IA-first : site, tunnel de vente, pipeline de candidatures - développé avec Claude Code et agents IA.</Text>
            </View>

            <View style={S.expItem}>
              <View style={S.expHeader}>
                <Text style={S.expCompany}>Voyage Privé</Text>
                <Text style={S.expYear}>2024–2025 · 2 ans</Text>
              </View>
              <Text style={S.expRoleBadge}>CMO · ComEx</Text>
              <Text style={S.expDesc}>Stratégie marketing globale d'un acteur leader du voyage premium en ligne (C.A. {'>'}1Md€, CAGR {'>'}+10%) : acquisition online / offline dont TV / organique, CRM, branding, retail média sur 9 marchés.</Text>
              <View style={S.expMetrics}>
                <Text style={S.expMetric}>{'>'}1Md€ CA</Text>
                <Text style={S.expMetric}>+10% CAGR</Text>
                <Text style={S.expMetric}>{'>'}10M€ budget</Text>
                <Text style={S.expMetric}>9 marchés</Text>
              </View>
              <View style={S.expBullets}>
                <View style={S.expBullet}><Text style={S.expBulletDot}>-</Text><Text style={S.expBulletText}><Text style={S.expBulletLabel}>Performance </Text>Pilotage de la performance marketing (budget {'>'}10M€, reporting CEO).</Text></View>
                <View style={S.expBullet}><Text style={S.expBulletDot}>-</Text><Text style={S.expBulletText}><Text style={S.expBulletLabel}>Transfo IA </Text>Réduction {'>'}50% coûts SEO, renégociation {'>'}25% SaaS.</Text></View>
              </View>
            </View>

            <View style={S.expItem}>
              <View style={S.expHeader}>
                <Text style={S.expCompany}>BonneGueule</Text>
                <Text style={S.expYear}>2010–2022 · 12 ans</Text>
              </View>
              <Text style={S.expRoleBadge}>CEO · Co-fondateur</Text>
              <Text style={S.expDesc}>Création d'un modèle pionnier, à la fois marque de mode masculine digitale et média communautaire. Croissance organique et rentable de 0 à 10M€ (+50% CAGR, 6,8% EBE).</Text>
              <View style={S.expMetrics}>
                <Text style={S.expMetric}>10M€ CA</Text>
                <Text style={S.expMetric}>6,8% EBE</Text>
                <Text style={S.expMetric}>NPS 95</Text>
                <Text style={S.expMetric}>60 pers.</Text>
                <Text style={S.expMetric}>10 boutiques</Text>
              </View>
              <View style={S.expBullets}>
                <View style={S.expBullet}><Text style={S.expBulletDot}>-</Text><Text style={S.expBulletText}><Text style={S.expBulletLabel}>Marque </Text>Aucun discount en 12 ans. NPS 95. 63% repeat. 4,5M V.U./an.</Text></View>
                <View style={S.expBullet}><Text style={S.expBulletDot}>-</Text><Text style={S.expBulletText}><Text style={S.expBulletLabel}>Leadership </Text>1 → 60 collaborateurs. Top 100 GPtW France. 7,7M€ levés.</Text></View>
              </View>
            </View>

            <View style={S.expItem}>
              <View style={S.expHeader}>
                <Text style={S.expCompany}>Wavestone · HeadMind Partners</Text>
                <Text style={S.expYear}>2009–2011 · 2 ans</Text>
              </View>
              <Text style={S.expRoleBadge}>Consultant en stratégie · CDI</Text>
              <Text style={S.expDesc}>Début de carrière dans le conseil : fonctions commerciales, puis consultant en stratégie.</Text>
            </View>

            <Text style={S.sectionTitle}>Distinctions & Rayonnement</Text>
            <View style={S.rayItem}>
              <Text style={S.rayLabel}>Distinctions</Text>
              <Text style={S.rayText}>FT1000 - Financial Times Europe's Fastest Growing Companies (#580). Délégation française G20 Young Entrepreneurs 2018 - Buenos Aires.</Text>
            </View>
            <View style={S.rayItem}>
              <Text style={S.rayLabel}>Conférences</Text>
              <Text style={S.rayText}>Hermès, Moët, Weston, Galeries Lafayette, IADS, IFM, HEC, ESSEC, Sciences Po, Bpifrance. Thèmes : marque, e-commerce, entrepreneuriat digital.</Text>
            </View>
            <View style={S.rayItem}>
              <Text style={S.rayLabel}>Business cases</Text>
              <Text style={S.rayText}>BonneGueule étudié dans les MBA de HEC Entrepreneurs, ESSEC et IFM.</Text>
            </View>
          </View>

          <View style={S.colRight}>
            <Text style={[S.sectionTitle, S.firstSection]}>02 · Savoir-faire dirigeant</Text>
            <View style={S.tags}>
              {["Direction d'entreprise", "Leadership (→ 60 p.)", "Transformation digitale", "Financement", "Stratégie de croissance", "Retail expérientiel", "E-commerce", "Branding", "International"].map(t => <Text key={t} style={S.tag}>{t}</Text>)}
            </View>

            <Text style={S.sectionTitle}>IA - Stratégie & exécution</Text>
            <View style={S.tags}>
              {["Augmentation des fonctions clé", "Orchestration d'agents IA", "Génération d'assets", "Prototypage full-stack", "Audit stacks IA", "Automatisations (workers)", "SEO pour LLMs (GEO)"].map(t => <Text key={t} style={S.tag}>{t}</Text>)}
            </View>

            <Text style={S.sectionTitle}>03 · Formation</Text>
            {[
              { school: 'ESCP / Institut Français de la Mode', diploma: 'Accélérateur Mode & Luxe · IFM Labels · Paris', year: '2017' },
              { school: 'Bosphore University', diploma: 'MBA Program · Istanbul', year: '2010' },
              { school: 'Mines-Télécom Business School', diploma: 'MSc in Management · Paris', year: '2006' },
              { school: 'CPGE Lycée Albert Schweitzer', diploma: 'Maths Sup / Maths Spé · Mulhouse', year: '2004' },
            ].map(f => (
              <View key={f.year} style={S.formItem}>
                <View><Text style={S.formSchool}>{f.school}</Text><Text style={S.formDiploma}>{f.diploma}</Text></View>
                <Text style={S.formYear}>{f.year}</Text>
              </View>
            ))}

            <Text style={S.sectionTitle}>04 · Culture personnelle</Text>
            {[
              { label: 'Esthétique et matières', text: 'Architecture, arts graphiques, mode masculine, objets bien faits.' },
              { label: 'Montagne', text: 'Randonnées engagées (bivouac, multi-jours, hiver), alpinisme, escalade.' },
              { label: 'Sciences humaines', text: 'Méditation Zen Sōtō, psychologie, spiritualité.' },
            ].map(c => (
              <View key={c.label} style={S.rayItem}>
                <Text style={S.rayLabel}>{c.label}</Text>
                <Text style={S.rayText}>{c.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={S.footer}>
          <Text style={S.footerText}>geoffreybruyere@gmail.com · (+33)6 27 40 18 91</Text>
          <Text style={S.footerText}>linkedin.com/in/geoffreybruyere · bruyere.cc</Text>
        </View>
      </Page>
    </Document>
  );
}

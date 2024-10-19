export const appRoutes = {
  home: '/home',
  collection: {
    root: '/collection',
    form: '/collection/form',
    informations: (id: string | undefined) => `/collection/${id}/informations`,
    components: {
      root: (id: string | undefined) => `/collection/${id}/components`,
      form: (id: string | undefined) => `/collection/${id}/components/form`,
    },
  },
  stats: '/stats',
  notes: {
    root: '/notes',
    form: '/notes/form',
  },
  tools: {
    root: '/tools',
    aurebeshTranslator: '/tools/aurebeshTranslator',
  },
  settings: '/settings',
};

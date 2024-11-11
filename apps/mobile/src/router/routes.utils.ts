export const appRoutes = {
  auth: {
    login: '(auth)/login',
    signUp: '(auth)/signup',
  },
  home: '(root)/home',
  collection: {
    root: '(root)/collection',
    form: '(root)/collection/form',
    informations: (id: string | undefined) => `(root)/collection/${id}/informations`,
    components: {
      root: (id: string | undefined) => `(root)/collection/${id}/components`,
      form: (id: string | undefined) => `(root)/collection/${id}/components/form`,
    },
  },
  stats: '(root)/stats',
  notes: {
    root: '(root)/notes',
    form: '(root)/notes/form',
  },
  tools: {
    root: '(root)/tools',
    aurebeshTranslator: '(root)/tools/aurebeshTranslator',
  },
  settings: '(root)/settings',
};

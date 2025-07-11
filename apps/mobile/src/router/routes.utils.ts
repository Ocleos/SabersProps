export const appRoutes = {
  auth: {
    login: '(auth)/login',
    signUp: '(auth)/signup',
  },
  collection: {
    components: {
      form: (id: string | undefined) => `(root)/collection/${id}/components/form`,
      root: (id: string | undefined) => `(root)/collection/${id}/components`,
    },
    form: '(root)/collection/form',
    informations: (id: string | undefined) => `(root)/collection/${id}/informations`,
    root: '(root)/collection',
  },
  home: '(root)/home',
  notes: {
    form: '(root)/notes/form',
    root: '(root)/notes',
  },
  settings: '(root)/settings',
  stats: '(root)/stats',
  todos: '(root)/todos',
  tools: {
    aurebeshTranslator: '(root)/tools/aurebeshTranslator',
    root: '(root)/tools',
  },
};

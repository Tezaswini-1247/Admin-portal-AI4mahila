'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Analytics = "Estatísticas";
const Email = "Email";
const Password = "Palavra-passe";
const Provider = "Provedor";
const ResetPasswordToken = "Código de redefinição da palavra-passe";
const Role = "Função";
const Username = "Nome de utilizador";
const Users = "Utilizadores";
const pt = {
	Analytics: Analytics,
	"Auth.form.button.forgot-password": "Enviar email",
	"Auth.form.button.login": "Entrar",
	"Auth.form.button.register": "Pronto para começar",
	"Auth.form.error.blocked": "A tua conta foi bloqueada por um administrador.",
	"Auth.form.error.code.provide": "O código fornecido está incorreto.",
	"Auth.form.error.confirmed": "O email da tua conta não foi confirmado.",
	"Auth.form.error.email.invalid": "Este email é inválido.",
	"Auth.form.error.email.provide": "Por favor, preenche com o nome de utilizador ou email.",
	"Auth.form.error.email.taken": "Este email já está a ser utilizado.",
	"Auth.form.error.invalid": "Utilizador ou palavra-passe inválidos.",
	"Auth.form.error.params.provide": "Os parâmetros submetidos estão errados.",
	"Auth.form.error.password.format": "A sua palavra-passe não pode conter o símbolo `$` mais do que 3 vezes.",
	"Auth.form.error.password.local": "Este utilizador nunca definiu uma palavra-passe local, por favor, faz login pelo serviço utilizado durante a criação da conta.",
	"Auth.form.error.password.matching": "As palavra-passes não coincidem.",
	"Auth.form.error.password.provide": "Por favor, digita a tua palavra-passe.",
	"Auth.form.error.ratelimit": "Demasiadas tentativas, por favor, tenta novamente daqui a um minuto.",
	"Auth.form.error.user.not-exist": "Este email não existe.",
	"Auth.form.error.username.taken": "Este nome de utilizador já está a ser utilizado.",
	"Auth.form.forgot-password.email.label": "Introduz o teu email",
	"Auth.form.forgot-password.email.label.success": "Email enviado com sucesso",
	"Auth.form.register.news.label": "Manter-me atualizado sobre novas funcionalidades e futuras melhorias (ao fazê-lo, estás a aceitar os {terms} e a {policy}).",
	"Auth.form.rememberMe.label": "Lembrar-me",
	"Auth.form.username.label": "Nome de utilizador",
	"Auth.form.username.placeholder": "Kai Doe",
	"Auth.link.forgot-password": "Esqueceu-se da palavra-passe?",
	"Auth.link.ready": "Pronto para entrar?",
	"Auth.privacy-policy-agreement.policy": "política de privacidade",
	"Auth.privacy-policy-agreement.terms": "termos de serviço",
	"Content Manager": "Gestor de Conteúdo",
	"Content Type Builder": "Construtor de Tipos de Conteúdo",
	Email: Email,
	"Files Upload": "Carregamento de Ficheiros",
	"HomePage.head.title": "Página principal",
	"HomePage.roadmap": "Vê o nosso roadmap",
	"HomePage.welcome.congrats": "Parabéns!",
	"HomePage.welcome.congrats.content": "Iniciaste sessão como o primeiro administrador. Para descobrires as poderosas funcionalidades do Strapi,",
	"HomePage.welcome.congrats.content.bold": "recomendamos que cries o teu primeiro modelo.",
	"New entry": "Novo item",
	Password: Password,
	Provider: Provider,
	ResetPasswordToken: ResetPasswordToken,
	Role: Role,
	"Settings.error": "Erro",
	"Settings.global": "Definições Globais",
	"Settings.webhooks.create": "Criar um webhook",
	"Settings.webhooks.create.header": "Criar um novo header",
	"Settings.webhooks.created": "Webhook criado",
	"Settings.webhooks.events.create": "Ao criar",
	"Settings.webhooks.form.events": "Eventos",
	"Settings.webhooks.form.headers": "Headers",
	"Settings.webhooks.form.url": "Url",
	"Settings.webhooks.key": "Key",
	"Settings.webhooks.list.button.add": "Adicionar novo webhook",
	"Settings.webhooks.list.description": "Obtém notificações POST de alterações.",
	"Settings.webhooks.list.empty.description": "Adiciona o teu primeiro webhook a esta lista.",
	"Settings.webhooks.list.empty.link": "Vê a nossa documentação",
	"Settings.webhooks.list.empty.title": "Ainda não há nenhum webhook",
	"Settings.webhooks.singular": "webhook",
	"Settings.webhooks.title": "Webhooks",
	"Settings.webhooks.trigger": "Executar",
	"Settings.webhooks.trigger.cancel": "Cancelar execução",
	"Settings.webhooks.trigger.pending": "Pendente…",
	"Settings.webhooks.trigger.save": "Por favor, grava antes de executar",
	"Settings.webhooks.trigger.success": "Sucesso!",
	"Settings.webhooks.trigger.success.label": "Execução com sucesso",
	"Settings.webhooks.trigger.test": "Execução de teste",
	"Settings.webhooks.trigger.title": "Gravar antes de executar",
	"Settings.webhooks.value": "Valor",
	Username: Username,
	Users: Users,
	"Users & Permissions": "Utilizadores & Permissões",
	"app.components.BlockLink.code": "Exemplos de código",
	"app.components.Button.cancel": "Cancelar",
	"app.components.Button.reset": "Restaurar",
	"app.components.ComingSoonPage.comingSoon": "Em breve",
	"app.components.DownloadInfo.download": "Transferência em progresso...",
	"app.components.DownloadInfo.text": "Isto poderá levar alguns minutos. Obrigado pela sua paciência",
	"app.components.EmptyAttributes.title": "Ainda não há atributos",
	"app.components.HomePage.button.blog": "VÊ MAIS NO BLOG",
	"app.components.HomePage.community": "Encontre a comunidade na web",
	"app.components.HomePage.community.content": "Conversa com membros da equipa, contribuidores e desenvolvedores através de diferentes canais.",
	"app.components.HomePage.create": "Cria o teu primeiro Tipo de Conteúdo",
	"app.components.HomePage.welcome": "Bem-vindo(a) a bordo",
	"app.components.HomePage.welcome.again": "Bem-vindo(a) ",
	"app.components.HomePage.welcomeBlock.content": "Estamos felizes em ter-te como um dos membros da comunidade. Estamos constantemente à procura de feedback, por isso sente-te à vontade para nos enviares uma mensagem em privado no ",
	"app.components.HomePage.welcomeBlock.content.again": "Esperamos que estejas a progredir no teu projeto... Sente-te à vontade em ler as nossas últimas publicações sobre o Strapi. Estamos a dar o nosso melhor para melhorar o produto, baseando-nos no teu feedback.",
	"app.components.HomePage.welcomeBlock.content.issues": "problemas.",
	"app.components.HomePage.welcomeBlock.content.raise": " ou levante ",
	"app.components.ImgPreview.hint": "Arraste & solte o seu ficheiro nesta área ou {browse} um ficheiro para o carregar",
	"app.components.ImgPreview.hint.browse": "escolha",
	"app.components.InputFile.newFile": "Adicionar um novo ficheiro",
	"app.components.InputFileDetails.open": "Abrir num novo separador",
	"app.components.InputFileDetails.originalName": "Nome original:",
	"app.components.InputFileDetails.remove": "Remover este ficheiro",
	"app.components.InputFileDetails.size": "Tamanho:",
	"app.components.InstallPluginPage.Download.description": "Pode demorar alguns segundos a descarregar e instalar o plugin.",
	"app.components.InstallPluginPage.Download.title": "A descarregar...",
	"app.components.InstallPluginPage.description": "Estende a tua aplicação sem problemas.",
	"app.components.LeftMenuFooter.help": "Ajuda",
	"app.components.LeftMenuFooter.poweredBy": "Feito com ",
	"app.components.LeftMenuLinkContainer.collectionTypes": "Modelos",
	"app.components.LeftMenuLinkContainer.configuration": "Configurações",
	"app.components.LeftMenuLinkContainer.general": "Geral",
	"app.components.LeftMenuLinkContainer.noPluginsInstalled": "Nenhuma extensão instalada",
	"app.components.LeftMenuLinkContainer.plugins": "Extensões",
	"app.components.LeftMenuLinkContainer.singleTypes": "Modelos Únicos",
	"app.components.ListPluginsPage.description": "Lista de extensões instaladas no projeto.",
	"app.components.ListPluginsPage.head.title": "Lista de extensões",
	"app.components.Logout.logout": "Sair",
	"app.components.Logout.profile": "Perfil",
	"app.components.NotFoundPage.back": "Voltar à página inicial",
	"app.components.NotFoundPage.description": "Não encontrado",
	"app.components.Official": "Oficial",
	"app.components.Onboarding.label.completed": "% completo",
	"app.components.Onboarding.title": "Como Começar - Vídeos",
	"app.components.PluginCard.Button.label.download": "Transferir",
	"app.components.PluginCard.Button.label.install": "Já instalado",
	"app.components.PluginCard.PopUpWarning.install.impossible.autoReload.needed": "A funcionalidade autoReload precisa de estar ligada. Por favor, inicia a tua aplicação com `yarn develop`.",
	"app.components.PluginCard.PopUpWarning.install.impossible.confirm": "Compreendo!",
	"app.components.PluginCard.PopUpWarning.install.impossible.environment": "Por questões de segurança, um plugin só pode ser descarregado num ambiente de desenvolvimento.",
	"app.components.PluginCard.PopUpWarning.install.impossible.title": "Impossível descarregar",
	"app.components.PluginCard.compatible": "Compatível com a tua aplicação",
	"app.components.PluginCard.compatibleCommunity": "Compatível com a comunidade",
	"app.components.PluginCard.more-details": "Mais detalhes",
	"app.components.listPlugins.button": "Adicionar Nova Extensão",
	"app.components.listPlugins.title.none": "Nenhuma extensão instalada",
	"app.components.listPluginsPage.deletePlugin.error": "Ocorreu um erro ao desinstalar a extensão",
	"app.containers.App.notification.error.init": "Ocorreu um erro ao efetuar um pedido para a API",
	"app.links.configure-view": "Configurar o editor",
	"app.utils.SelectOption.defaultMessage": " ",
	"app.utils.defaultMessage": " ",
	"app.utils.filters": "Filtros",
	"app.utils.placeholder.defaultMessage": " ",
	"component.Input.error.validation.integer": "Este valor precisa de ser um número inteiro",
	"components.AutoReloadBlocker.description": "Inicia o Strapi com um dos seguintes comandos:",
	"components.AutoReloadBlocker.header": "A funcionalidade autoReload é necessária para esta extensão.",
	"components.ErrorBoundary.title": "Algo correu mal...",
	"components.Input.error.attribute.key.taken": "Este valor já existe",
	"components.Input.error.attribute.sameKeyAndName": "Não pode ser igual",
	"components.Input.error.attribute.taken": "Já existe um atributo com este nome",
	"components.Input.error.contentTypeName.taken": "Já existe um tipo de conteúdo com este nome",
	"components.Input.error.custom-error": "{errorMessage} ",
	"components.Input.error.password.noMatch": "As palavra-passes não coincidem",
	"components.Input.error.validation.email": "Isto não é um email",
	"components.Input.error.validation.json": "Não está em formato JSON",
	"components.Input.error.validation.max": "Valor demasiado elevado {max}.",
	"components.Input.error.validation.maxLength": "Valor demasiado longo {max}.",
	"components.Input.error.validation.min": "Valor demasiado baixo {min}.",
	"components.Input.error.validation.minLength": "Valor demasiado curto {min}.",
	"components.Input.error.validation.minSupMax": "Não pode ser superior",
	"components.Input.error.validation.regex": "O valor não corresponde com a expressão regex.",
	"components.Input.error.validation.required": "Este valor é obrigatório.",
	"components.Input.error.validation.unique": "Este valor tem de ser único, mas já está a ser utilizado.",
	"components.InputSelect.option.placeholder": "Escolhe aqui",
	"components.ListRow.empty": "Não existem dados para mostrar.",
	"components.OverlayBlocker.description": "Estás a usar uma funcionalidade que precisa que o servidor seja reiniciado. Por favor, aguarda até que o servidor esteja totalmente reiniciado.",
	"components.OverlayBlocker.description.serverError": "O servidor já deveria ter reiniciado. Por favor verifica os logs no terminal.",
	"components.OverlayBlocker.title": "A aguardar pela reinicialização...",
	"components.OverlayBlocker.title.serverError": "A reinicialização está a demorar mais do que o esperado",
	"components.PageFooter.select": "itens por página",
	"components.ProductionBlocker.description": "Por motivos de segurança, temos que desativar esta extensão noutros ambientes.",
	"components.ProductionBlocker.header": "Esta extensão está disponível apenas em ambiente de desenvolvimento.",
	"components.Search.placeholder": "Procurar...",
	"components.Wysiwyg.collapse": "Colapsar",
	"components.Wysiwyg.selectOptions.H1": "Título H1",
	"components.Wysiwyg.selectOptions.H2": "Título H2",
	"components.Wysiwyg.selectOptions.H3": "Título H3",
	"components.Wysiwyg.selectOptions.H4": "Título H4",
	"components.Wysiwyg.selectOptions.H5": "Título H5",
	"components.Wysiwyg.selectOptions.H6": "Título H6",
	"components.Wysiwyg.selectOptions.title": "Adicionar título",
	"components.WysiwygBottomControls.charactersIndicators": "caracteres",
	"components.WysiwygBottomControls.fullscreen": "Expandir",
	"components.WysiwygBottomControls.uploadFiles": "Arrasta e solta ficheiros, cola da área de transferência ou {browse}.",
	"components.WysiwygBottomControls.uploadFiles.browse": "selecione-os",
	"components.popUpWarning.message": "Tens a certeza que pretendes apagar isto?",
	"components.popUpWarning.title": "Por favor confirma",
	"form.button.done": "Concluir",
	"global.prompt.unsaved": "Tens a certeza que queres sair desta página? Todas as tuas modificações serão perdidas",
	"notification.contentType.relations.conflict": "O tipo de conteúdo tem relações que entram em conflito",
	"notification.error": "Ocorreu um erro",
	"notification.error.layout": "Não foi possível encontrar o layout",
	"notification.form.error.fields": "O formulário contém erros",
	"notification.form.success.fields": "Alterações gravadas",
	"notification.success.delete": "O item foi eliminado",
	"request.error.model.unknown": "Este modelo não existe"
};

exports.Analytics = Analytics;
exports.Email = Email;
exports.Password = Password;
exports.Provider = Provider;
exports.ResetPasswordToken = ResetPasswordToken;
exports.Role = Role;
exports.Username = Username;
exports.Users = Users;
exports.default = pt;
//# sourceMappingURL=pt-CEcd6cjN.js.map
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Analytics = "Statistik";
const Documentation = "Dokumentation";
const Email = "E-mail";
const Password = "Kodeord";
const Provider = "Provider";
const ResetPasswordToken = "Nulstil kodeord token";
const Role = "Rolle";
const Username = "Brugernavn";
const Users = "Brugere";
const anErrorOccurred = "Øv! Noget gik galt. Prøv venligst igen.";
const clearLabel = "Ryd";
const or = "ELLER";
const skipToContent = "Gå til indhold";
const submit = "Indsend";
const dk = {
	Analytics: Analytics,
	"Auth.components.Oops.text": "Din konto er blevet suspenderet",
	"Auth.components.Oops.text.admin": "Hvis dette er en fejl, kontakt venligst din administrator.",
	"Auth.components.Oops.title": "Åh nej...",
	"Auth.form.button.forgot-password": "Send e-mail",
	"Auth.form.button.go-home": "GÅ TILBAGE TIL HJEM",
	"Auth.form.button.login": "Log ind",
	"Auth.form.button.login.providers.error": "Vi kan ikke forbinde dig gennem den valgte provider.",
	"Auth.form.button.login.strapi": "Log ind med Strapi",
	"Auth.form.button.password-recovery": "Gendan kodeord",
	"Auth.form.button.register": "KOM I GANG",
	"Auth.form.confirmPassword.label": "Bekræft kodeord",
	"Auth.form.currentPassword.label": "Nuværende kodeord",
	"Auth.form.email.label": "E-mail",
	"Auth.form.email.placeholder": "johndoe@gmail.com",
	"Auth.form.error.blocked": "Din konto er blevet blokeret af administratoren.",
	"Auth.form.error.code.provide": "Forkert kode angivet.",
	"Auth.form.error.confirmed": "Din e-mail er ikke bekræftet.",
	"Auth.form.error.email.invalid": "Denne e-mail er forkert.",
	"Auth.form.error.email.provide": "Angiv venligst dit brugernavn eller e-mail.",
	"Auth.form.error.email.taken": "E-mailen er allerede taget.",
	"Auth.form.error.invalid": "Brugernavn eller kodeord er ikke gyldig.",
	"Auth.form.error.params.provide": "Forkerte parametre angivet.",
	"Auth.form.error.password.format": "Dit kodeord må ikke indeholde tegnet `$` mere end 3 gange.",
	"Auth.form.error.password.local": "Denne bruger har ikke angivet et lokalt kodeord, log venligst ind via link fra oprettelsen.",
	"Auth.form.error.password.matching": "Kodeordene er ikke ens.",
	"Auth.form.error.password.provide": "Angiv venligst dit kodeord.",
	"Auth.form.error.ratelimit": "For mange forsøg, prøv igen om lidt.",
	"Auth.form.error.user.not-exist": "Der findes ingen bruger med denne e-mail.",
	"Auth.form.error.username.taken": "Brugernavnet er allerede taget.",
	"Auth.form.firstname.label": "Fornavn",
	"Auth.form.firstname.placeholder": "John",
	"Auth.form.forgot-password.email.label": "Indtast din e-mail",
	"Auth.form.forgot-password.email.label.success": "E-mail sendt til",
	"Auth.form.lastname.label": "Efternavn",
	"Auth.form.lastname.placeholder": "Doe",
	"Auth.form.password.hide-password": "Skjul kodeord",
	"Auth.form.password.hint": "Kodeord skal indeholde mindst 8 tegn, 1 stort bogstav, 1 lille bogstav og 1 tal",
	"Auth.form.password.show-password": "Vis kodeord",
	"Auth.form.register.news.label": "Hold mig opdateret omkring nye features og kommende forbedringer (ved at gøre dette accepterer du {terms} og {policy}).",
	"Auth.form.register.subtitle": "Dit login bliver kun brugt til at autentificere dig selv i admin panelet. Alle gemte data bliver gemt i din egen database.",
	"Auth.form.rememberMe.label": "Husk mig",
	"Auth.form.username.label": "Brugernavn",
	"Auth.form.username.placeholder": "John Doe",
	"Auth.form.welcome.subtitle": "Log ind med din Strapi bruger",
	"Auth.form.welcome.title": "Velkommen!",
	"Auth.link.forgot-password": "Glemt dit kodeord?",
	"Auth.link.ready": "Klar til at logge ind?",
	"Auth.link.signin": "Log ind",
	"Auth.link.signin.account": "Har du allerede en konto?",
	"Auth.login.sso.divider": "Eller log ind med",
	"Auth.login.sso.loading": "Henter providere...",
	"Auth.login.sso.subtitle": "Log ind med SSO",
	"Auth.privacy-policy-agreement.policy": "Priviatpolitik",
	"Auth.privacy-policy-agreement.terms": "vilkår",
	"Content Manager": "Indhold",
	"Content Type Builder": "Indholdstyper",
	Documentation: Documentation,
	Email: Email,
	"Files Upload": "Fil upload",
	"HomePage.head.title": "Hjem",
	"HomePage.roadmap": "Se vores roadmap",
	"HomePage.welcome.congrats": "Tillykke!",
	"HomePage.welcome.congrats.content": "Du er logget ind som den første administrator. For at lære de gode features som Strapi har,",
	"HomePage.welcome.congrats.content.bold": "anbefaler vi at du opretter din første dokument type.",
	"Media Library": "Medie bibliotek",
	"New entry": "Nyt element",
	Password: Password,
	Provider: Provider,
	ResetPasswordToken: ResetPasswordToken,
	Role: Role,
	"Roles & Permissions": "Roller og rettigheder",
	"Roles.ListPage.notification.delete-all-not-allowed": "Nogle roller kunne ikke slettes da de er forbundet til en eller flere brugere",
	"Roles.ListPage.notification.delete-not-allowed": "En rolle kan ikke slettes hvis den er forbundet til en bruger",
	"Roles.RoleRow.select-all": "Vælg {name} for bulk handling",
	"Roles.components.List.empty.withSearch": "Der er ingen rolle der matcher søgningen ({search})...",
	"Settings.PageTitle": "Indstillinger - {name}",
	"Settings.apiTokens.addFirstToken": "Tilføj dit første API token",
	"Settings.apiTokens.addNewToken": "Tilføj nyt API token",
	"Settings.tokens.copy.editMessage": "Af sikkerhedsmæssige årsager, kan du kun se dit token én gang.",
	"Settings.tokens.copy.editTitle": "Dette token er ikke længere tilgængeligt.",
	"Settings.tokens.copy.lastWarning": "Kopiér dette token, du kommer ikke til at se det igen!",
	"Settings.apiTokens.create": "Tilføj element",
	"Settings.apiTokens.description": "Liste over genererede tokens til at bruge API'et",
	"Settings.apiTokens.emptyStateLayout": "Du har endnu ikke noget indhold...",
	"Settings.tokens.notification.copied": "Token er kopieret til klippebordet.",
	"Settings.apiTokens.title": "API Tokens",
	"Settings.tokens.types.full-access": "Fuld adgang",
	"Settings.tokens.types.read-only": "Read-only",
	"Settings.application.description": "Se dit projekts detaljer",
	"Settings.application.edition-title": "NUVÆRENDE PLAN",
	"Settings.application.get-help": "Få hjælp",
	"Settings.application.link-pricing": "Se alle priser",
	"Settings.application.link-upgrade": "Opgrader dit projekt",
	"Settings.application.node-version": "NODE VERSION",
	"Settings.application.strapi-version": "STRAPI VERSION",
	"Settings.application.strapiVersion": "strapi version",
	"Settings.application.title": "Applikation",
	"Settings.error": "Fejl",
	"Settings.global": "Globale indstillinger",
	"Settings.permissions": "Rettigheder",
	"Settings.permissions.category": "Rettighedsindstillinger for {category}",
	"Settings.permissions.category.plugins": "Rettighedsindstilling for {category} plugin",
	"Settings.permissions.conditions.anytime": "Altid",
	"Settings.permissions.conditions.apply": "Godkend",
	"Settings.permissions.conditions.can": "Kan",
	"Settings.permissions.conditions.conditions": "Definér betingelser",
	"Settings.permissions.conditions.links": "Links",
	"Settings.permissions.conditions.no-actions": "Der er ingen handling",
	"Settings.permissions.conditions.none-selected": "Når som helst",
	"Settings.permissions.conditions.or": "ELLER",
	"Settings.permissions.conditions.when": "Når",
	"Settings.permissions.select-all-by-permission": "Vælg alle {label} tilladelser",
	"Settings.permissions.select-by-permission": "Vælg {label} tilladelse",
	"Settings.permissions.users.create": "Opret ny bruger",
	"Settings.permissions.users.email": "E-mail",
	"Settings.permissions.users.firstname": "Fornavn",
	"Settings.permissions.users.lastname": "Efternavn",
	"Settings.permissions.users.form.sso": "Forbind med SSO",
	"Settings.permissions.users.form.sso.description": "Når aktiveret (TIL), kan brugere logge ind med SSO",
	"Settings.permissions.users.listview.header.subtitle": "Alle brugere som har adgnag til Strapi admin panelet",
	"Settings.permissions.users.tabs.label": "Tabs Tilladelser",
	"Settings.profile.form.notify.data.loaded": "Dine profildata er blevet hentet",
	"Settings.profile.form.section.experience.clear.select": "Nulstil det valgte interface sprog",
	"Settings.profile.form.section.experience.here": "dokumentation",
	"Settings.profile.form.section.experience.interfaceLanguage": "Interface sprog",
	"Settings.profile.form.section.experience.interfaceLanguage.hint": "Dette vil kun vise dit eget interface i det valgte sprog.",
	"Settings.profile.form.section.experience.interfaceLanguageHelp": "Valget vil kun ændre sproget for dig. Referér venligst til dette {here} for at gøre andre sprog tilgængelige for dit hold.",
	"Settings.profile.form.section.experience.title": "Oplevelse",
	"Settings.profile.form.section.head.title": "Bruger profil",
	"Settings.profile.form.section.profile.page.title": "Profil side",
	"Settings.roles.create.description": "Definér rollens rettigheder",
	"Settings.roles.create.title": "Opret en rolle",
	"Settings.roles.created": "Rolle oprettet",
	"Settings.roles.edit.title": "Redigér en rolle",
	"Settings.roles.form.button.users-with-role": "Brugere med denne rolle",
	"Settings.roles.form.created": "Oprettet",
	"Settings.roles.form.description": "Navn og beskrivelse af rollen",
	"Settings.roles.form.permission.property-label": "{label} tilladelser",
	"Settings.roles.form.permissions.attributesPermissions": "Feltrettigheder",
	"Settings.roles.form.permissions.create": "Opret",
	"Settings.roles.form.permissions.delete": "Slet",
	"Settings.roles.form.permissions.publish": "Offentliggør",
	"Settings.roles.form.permissions.read": "Læs",
	"Settings.roles.form.permissions.update": "Opdatér",
	"Settings.roles.list.button.add": "Tilføj ny rolle",
	"Settings.roles.list.description": "Liste over roller",
	"Settings.roles.title.singular": "rolle",
	"Settings.sso.description": "Ændre indstillingerne for Single Sign-On funktionen.",
	"Settings.sso.form.defaultRole.description": "Det vil forbinde nye autentificerede brugere til den valgte rolle",
	"Settings.sso.form.defaultRole.description-not-allowed": "Du skal have tilladelse til at læse admin roller",
	"Settings.sso.form.defaultRole.label": "Standard rolle",
	"Settings.sso.form.registration.description": "Opret ny bruger med SSO log ind hvis ingen bruger findes",
	"Settings.sso.form.registration.label": "Auto-registrering",
	"Settings.sso.title": "Single Sign-On",
	"Settings.webhooks.create": "Opret en webhook",
	"Settings.webhooks.create.header": "Opret en ny header",
	"Settings.webhooks.created": "Webhook oprettet",
	"Settings.webhooks.event.publish-tooltip": "Dette event findes kun for indhold med udkast/offentliggør system slået til",
	"Settings.webhooks.events.create": "Opret",
	"Settings.webhooks.events.update": "Opdater",
	"Settings.webhooks.form.events": "Events",
	"Settings.webhooks.form.headers": "Headers",
	"Settings.webhooks.form.url": "Url",
	"Settings.webhooks.headers.remove": "Fjern overskriftrække {number}",
	"Settings.webhooks.key": "Key",
	"Settings.webhooks.list.button.add": "Tilføj ny webhook",
	"Settings.webhooks.list.description": "Modtag POST ændringsnotifikationer.",
	"Settings.webhooks.list.empty.description": "Tilføj din første til denne liste.",
	"Settings.webhooks.list.empty.link": "Se vores dokumentation",
	"Settings.webhooks.list.empty.title": "Der er ingen webhooks endnu",
	"Settings.webhooks.list.th.actions": "handlinger",
	"Settings.webhooks.list.th.status": "status",
	"Settings.webhooks.singular": "webhook",
	"Settings.webhooks.title": "Webhooks",
	"Settings.webhooks.to.delete": "{webhooksToDeleteLength, plural, one {# asset} other {# assets}} selected",
	"Settings.webhooks.trigger": "Trigger",
	"Settings.webhooks.trigger.cancel": "Annuller trigger",
	"Settings.webhooks.trigger.pending": "Venter…",
	"Settings.webhooks.trigger.save": "Gem venligst for at trigger",
	"Settings.webhooks.trigger.success": "Succes!",
	"Settings.webhooks.trigger.success.label": "Trigger succesfuld",
	"Settings.webhooks.trigger.test": "Test-trigger",
	"Settings.webhooks.trigger.title": "Gem inden trigger",
	"Settings.webhooks.value": "Værdi",
	Username: Username,
	Users: Users,
	"Users & Permissions": "Brugere & rettigheder",
	"Users.components.List.empty": "Der er ingen brugere...",
	"Users.components.List.empty.withFilters": "Der er ingen brugere med de valgte filtre...",
	"Users.components.List.empty.withSearch": "Der er ingen brugere der matcher søgningen ({search})...",
	"admin.pages.MarketPlacePage.head": "Marketplace - Plugins",
	"admin.pages.MarketPlacePage.submit.plugin.link": "Indsend dit plugin",
	"admin.pages.MarketPlacePage.subtitle": "Få mere ud af Strapi",
	anErrorOccurred: anErrorOccurred,
	"app.component.CopyToClipboard.label": "Kopiér til klippebord",
	"app.component.search.label": "Søg efter {target}",
	"app.component.table.duplicate": "Duplikér {target}",
	"app.component.table.edit": "Redigér {target}",
	"app.component.table.select.one-entry": "Vælg {target}",
	"app.components.BlockLink.blog": "Blog",
	"app.components.BlockLink.blog.content": "Læs de seneste nyheder omkring Strapi og økosystemet.",
	"app.components.BlockLink.code": "Kode eksempler",
	"app.components.BlockLink.code.content": "Lær ved at teste rigtige projekter udviklet af community.",
	"app.components.BlockLink.documentation.content": "Opdag essentielle koncepter, guides og instruktioner.",
	"app.components.BlockLink.tutorial": "Tutorials",
	"app.components.BlockLink.tutorial.content": "Følg step-by-step instruktioner til at bruge og ændre Strapi.",
	"app.components.Button.cancel": "Annuller",
	"app.components.Button.confirm": "Bekræft",
	"app.components.Button.reset": "Nulstil",
	"app.components.ComingSoonPage.comingSoon": "Kommer snart",
	"app.components.ConfirmDialog.title": "Bekræftelse",
	"app.components.DownloadInfo.download": "Download er i gang...",
	"app.components.DownloadInfo.text": "Dette kan tage et øjeblik, tak for din tålmodighed.",
	"app.components.EmptyAttributes.title": "Der er ingen felter endnu",
	"app.components.EmptyStateLayout.content-document": "Intet indhold fundet",
	"app.components.EmptyStateLayout.content-permissions": "Du har ikke tilladelse til at tilgå indholdet",
	"app.components.HomePage.button.blog": "SE MERE PÅ BLOGGEN",
	"app.components.HomePage.community": "Find fællesskabet på nettet",
	"app.components.HomePage.community.content": "Diskutér med team medlemmer, contributors og udviklere på forskellige kanaler.",
	"app.components.HomePage.create": "Opret din første indholdstype",
	"app.components.HomePage.roadmap": "Se vores roadmap",
	"app.components.HomePage.welcome": "Velkommen ombord!",
	"app.components.HomePage.welcome.again": "Velkommen ",
	"app.components.HomePage.welcomeBlock.content": "Vi er glade for at have dig som en dig af fællesskabet. Vi leder konstant efter feedback så send os gerne en besked på ",
	"app.components.HomePage.welcomeBlock.content.again": "Vi håber at det går fremad med dit projekt... Læs gerne de seneste nyheder omkring Strapi. Vi gør vores bedste for at forbedre produktet baseret på din feedback.",
	"app.components.HomePage.welcomeBlock.content.issues": "problemer.",
	"app.components.HomePage.welcomeBlock.content.raise": " eller fremhæv ",
	"app.components.ImgPreview.hint": "Drag & drop din fil til dette område eller {browse} efter en fil at uploade",
	"app.components.ImgPreview.hint.browse": "browse",
	"app.components.InputFile.newFile": "Tilføj ny fil",
	"app.components.InputFileDetails.open": "Åben i en ny fane",
	"app.components.InputFileDetails.originalName": "Originalt navn:",
	"app.components.InputFileDetails.remove": "Fjern denne fil",
	"app.components.InputFileDetails.size": "Størrelse:",
	"app.components.InstallPluginPage.Download.description": "Det tager muligvis et øjeblik at downloade og installere dette plugin.",
	"app.components.InstallPluginPage.Download.title": "Downloader...",
	"app.components.InstallPluginPage.description": "Udvid din app problemfrit.",
	"app.components.LeftMenu.collapse": "Indskrænk menu",
	"app.components.LeftMenu.expand": "Udvid menu",
	"app.components.LeftMenu.logout": "Log ud",
	"app.components.LeftMenuFooter.help": "Hjælp",
	"app.components.LeftMenuFooter.poweredBy": "Powered by ",
	"app.components.LeftMenuLinkContainer.collectionTypes": "Dokument typer",
	"app.components.LeftMenuLinkContainer.configuration": "Konfigurationer",
	"app.components.LeftMenuLinkContainer.general": "Generelt",
	"app.components.LeftMenuLinkContainer.noPluginsInstalled": "Ingen plugins installeret endnu",
	"app.components.LeftMenuLinkContainer.plugins": "Plugins",
	"app.components.LeftMenuLinkContainer.singleTypes": "Enkelt typer",
	"app.components.ListPluginsPage.deletePlugin.description": "Det tager muligvis et øjeblik at afinstallere dette plugin.",
	"app.components.ListPluginsPage.deletePlugin.title": "Afinstallerer",
	"app.components.ListPluginsPage.description": "Liste over installerede plugins i dette projekt.",
	"app.components.ListPluginsPage.head.title": "Vis plugins",
	"app.components.Logout.logout": "Log ud",
	"app.components.Logout.profile": "Profil",
	"app.components.MarketplaceBanner": "Opdap plugins bygget af commnuity, samt mange andre awesome ting til at kickstarte dit projekt.",
	"app.components.MarketplaceBanner.image.alt": "strapi raket logo",
	"app.components.MarketplaceBanner.link": "Tjek det ud nu",
	"app.components.NotFoundPage.back": "Tilbage til hjem",
	"app.components.NotFoundPage.description": "Ikke fundet",
	"app.components.Official": "Officielt",
	"app.components.Onboarding.help.button": "Hjælp knap",
	"app.components.Onboarding.label.completed": "% gennefært",
	"app.components.Onboarding.title": "Kom i gang videoer",
	"app.components.PluginCard.Button.label.download": "Download",
	"app.components.PluginCard.Button.label.install": "Allerede installeret",
	"app.components.PluginCard.PopUpWarning.install.impossible.autoReload.needed": "AutoReload funktionen skal aktiveres. Start venligst din app med `yarn develop`.",
	"app.components.PluginCard.PopUpWarning.install.impossible.confirm": "Jeg forstår!",
	"app.components.PluginCard.PopUpWarning.install.impossible.environment": "Af sikkerhedsmæssige årsager kan et plugin kun downloades i et development miljø.",
	"app.components.PluginCard.PopUpWarning.install.impossible.title": "Download er ikke muligt",
	"app.components.PluginCard.compatible": "Kompatibel med din app",
	"app.components.PluginCard.compatibleCommunity": "Kompatibel med fællesskabet",
	"app.components.PluginCard.more-details": "Flere detaljer",
	"app.components.ToggleCheckbox.off-label": "Fra",
	"app.components.ToggleCheckbox.on-label": "Til",
	"app.components.Users.MagicLink.connect": "Send dette link til brugeren for at de kan connecte.",
	"app.components.Users.MagicLink.connect.sso": "Send dette link til brugeren. Det første log ind kan klares med en SSO provider",
	"app.components.Users.ModalCreateBody.block-title.details": "Detaljer",
	"app.components.Users.ModalCreateBody.block-title.roles": "Brugerens roller",
	"app.components.Users.ModalCreateBody.block-title.roles.description": "En bruger kan have en eller flere roller",
	"app.components.Users.SortPicker.button-label": "Sortér efter",
	"app.components.Users.SortPicker.sortby.email_asc": "E-mail (A til Z)",
	"app.components.Users.SortPicker.sortby.email_desc": "E-mail (Z til A)",
	"app.components.Users.SortPicker.sortby.firstname_asc": "Fornavn (A til Z)",
	"app.components.Users.SortPicker.sortby.firstname_desc": "Fornavn (Z til A)",
	"app.components.Users.SortPicker.sortby.lastname_asc": "Efternavn (A til Z)",
	"app.components.Users.SortPicker.sortby.lastname_desc": "Efternavn (Z til A)",
	"app.components.Users.SortPicker.sortby.username_asc": "Brugernavn (A til Z)",
	"app.components.Users.SortPicker.sortby.username_desc": "Brugernavn (Z til A)",
	"app.components.listPlugins.button": "Tilføj nyt plugin",
	"app.components.listPlugins.title.none": "Ingen plugins installeret",
	"app.components.listPluginsPage.deletePlugin.error": "Der skete en fejl under afinstallering af dette plugin",
	"app.containers.App.notification.error.init": "Der skete en fejl under forespørgelse af API",
	"app.containers.AuthPage.ForgotPasswordSuccess.text.contact-admin": "Hvis du ikke modtager dette link, kontakt venligst din administrator.",
	"app.containers.AuthPage.ForgotPasswordSuccess.text.email": "Det tager muligvis et øjeblik at modtage dit kodeord link.",
	"app.containers.AuthPage.ForgotPasswordSuccess.title": "E-mail sendt",
	"app.containers.Users.EditPage.form.active.label": "Aktiv",
	"app.containers.Users.EditPage.header.label": "Redigér {name}",
	"app.containers.Users.EditPage.header.label-loading": "Redigér bruger",
	"app.containers.Users.EditPage.roles-bloc-title": "Tildelte roller",
	"app.containers.Users.ModalForm.footer.button-success": "Opret bruger",
	"app.links.configure-view": "Konfigurér visning",
	"app.static.links.cheatsheet": "CheatSheet",
	"app.utils.SelectOption.defaultMessage": " ",
	"app.utils.add-filter": "Tilføj filter",
	"app.utils.close-label": "Luk",
	"app.utils.defaultMessage": " ",
	"app.utils.duplicate": "Duplikér",
	"app.utils.edit": "Redigér",
	"app.utils.errors.file-too-big.message": "Filen er for stor",
	"app.utils.filter-value": "Filtrér værdi",
	"app.utils.filters": "Filtre",
	"app.utils.notify.data-loaded": "{target} er hentet",
	"app.utils.placeholder.defaultMessage": " ",
	"app.utils.publish": "Offentliggør",
	"app.utils.select-all": "Vælg alle",
	"app.utils.select-field": "Vælg felt",
	"app.utils.select-filter": "Vælg filter",
	"app.utils.unpublish": "Udkast",
	clearLabel: clearLabel,
	"coming.soon": "Dette indhold er under konstruktion og er tilbage om et par uger!",
	"component.Input.error.validation.integer": "Værdien skal være et helt tal",
	"components.AutoReloadBlocker.description": "Kør Strapi med en af følgende kommandoer:",
	"components.AutoReloadBlocker.header": "Reload funktion er påkrævet for dette plugin.",
	"components.ErrorBoundary.title": "Noget gik galt...",
	"components.FilterOptions.FILTER_TYPES.$contains": "indeholder",
	"components.FilterOptions.FILTER_TYPES.$containsi": "indeholder (sag ufølsom)",
	"components.FilterOptions.FILTER_TYPES.$endsWith": "slutter med",
	"components.FilterOptions.FILTER_TYPES.$endsWithi": "slutter med (sag ufølsom)",
	"components.FilterOptions.FILTER_TYPES.$eq": "er",
	"components.FilterOptions.FILTER_TYPES.$eqi": "er (sag ufølsom)",
	"components.FilterOptions.FILTER_TYPES.$gt": "er større end",
	"components.FilterOptions.FILTER_TYPES.$gte": "er større end eller lig med",
	"components.FilterOptions.FILTER_TYPES.$lt": "er mindre end",
	"components.FilterOptions.FILTER_TYPES.$lte": "er mindre end eller lig med",
	"components.FilterOptions.FILTER_TYPES.$ne": "er ikke",
	"components.FilterOptions.FILTER_TYPES.$nei": "er ikke (sag ufølsom)",
	"components.FilterOptions.FILTER_TYPES.$notContains": "indeholder ikke",
	"components.FilterOptions.FILTER_TYPES.$notContainsi": "indeholder ikke (sag ufølsom)",
	"components.FilterOptions.FILTER_TYPES.$notNull": "er ikke null",
	"components.FilterOptions.FILTER_TYPES.$null": "er null",
	"components.FilterOptions.FILTER_TYPES.$startsWith": "starter med",
	"components.FilterOptions.FILTER_TYPES.$startsWithi": "starter med (sag ufølsom)",
	"components.Input.error.attribute.key.taken": "Værdien findes allerede",
	"components.Input.error.attribute.sameKeyAndName": "Kan ikke være lig",
	"components.Input.error.attribute.taken": "Dette feltnavn findes allerede",
	"components.Input.error.contain.lowercase": "Kodeord skal indeholde mindst et lille bogstav",
	"components.Input.error.contain.number": "Kodeord skal indehold mindst et tal",
	"components.Input.error.contain.uppercase": "Kodeord skal indholde mindst et stort bogstav",
	"components.Input.error.contentTypeName.taken": "Dette navn er allerede taget",
	"components.Input.error.custom-error": "{errorMessage} ",
	"components.Input.error.password.noMatch": "Kodeord er ikke ens",
	"components.Input.error.validation.email": "Dette er ikke en e-mail",
	"components.Input.error.validation.json": "Dette matcher ikke JSON formatet",
	"components.Input.error.validation.max": "Værdien er for høj {max}.",
	"components.Input.error.validation.maxLength": "Værdien er for lang {max}.",
	"components.Input.error.validation.min": "Værdien er for lav {min}.",
	"components.Input.error.validation.minLength": "Værdien er for kort {min}.",
	"components.Input.error.validation.minSupMax": "Kan ikke være højere",
	"components.Input.error.validation.regex": "Værdien matcher ikke regex.",
	"components.Input.error.validation.required": "Værdien er påkrævet.",
	"components.Input.error.validation.unique": "Værdien er allerede brugt.",
	"components.InputSelect.option.placeholder": "Vælg her",
	"components.ListRow.empty": "Der er ingen data at vise.",
	"components.NotAllowedInput.text": "Ingen tilladelse til at se dette felt",
	"components.OverlayBlocker.description": "Du bruger en feature der kræver genstart. Vent veligst til serveren er oppe.",
	"components.OverlayBlocker.description.serverError": "Serveren skulle have restartet, tjek venligst dine logs i terminalen.",
	"components.OverlayBlocker.title": "Venter på genstart...",
	"components.OverlayBlocker.title.serverError": "Genstart tager længere end forventet",
	"components.PageFooter.select": "elementer pr side",
	"components.ProductionBlocker.description": "Af sikkerhedsmæssige årsager deaktiveres dette plugin i andre miljøer.",
	"components.ProductionBlocker.header": "Dette plugin er kun tilgængeligt under udvikling.",
	"components.Search.placeholder": "Søg...",
	"components.TableHeader.sort": "Sortér efter {label}",
	"components.Wysiwyg.ToggleMode.markdown-mode": "Markdown tilstand",
	"components.Wysiwyg.ToggleMode.preview-mode": "Forhåndsvisningstilstand",
	"components.Wysiwyg.collapse": "Kollaps",
	"components.Wysiwyg.selectOptions.H1": "Titel H1",
	"components.Wysiwyg.selectOptions.H2": "Titel H2",
	"components.Wysiwyg.selectOptions.H3": "Titel H3",
	"components.Wysiwyg.selectOptions.H4": "Titel H4",
	"components.Wysiwyg.selectOptions.H5": "Titel H5",
	"components.Wysiwyg.selectOptions.H6": "Titel H6",
	"components.Wysiwyg.selectOptions.title": "Tilføj en titel",
	"components.WysiwygBottomControls.charactersIndicators": "tegn",
	"components.WysiwygBottomControls.fullscreen": "Udvid",
	"components.WysiwygBottomControls.uploadFiles": "Drag & drop filer, indsæt fra udklipsholder eller {browse}.",
	"components.WysiwygBottomControls.uploadFiles.browse": "vælg dem",
	"components.pagination.go-to": "Gå til side {page}",
	"components.pagination.go-to-next": "Gå til næste side",
	"components.pagination.go-to-previous": "Gå til forrige side",
	"components.pagination.remaining-links": "og {number} ander links",
	"components.popUpWarning.button.cancel": "Annuller",
	"components.popUpWarning.button.confirm": "Bekræft",
	"components.popUpWarning.message": "Er du sikker på at du vil slette?",
	"components.popUpWarning.title": "Bekræft venligst",
	"form.button.done": "Færdig",
	"global.prompt.unsaved": "Er du sikker på at du vil forlade denne side? Alle dine ændringer vil gå tabt",
	"notification.contentType.relations.conflict": "Der er en eller flere konflikter med indholdstypens relationer",
	"notification.default.title": "Information:",
	"notification.error": "Der er sket en fejl",
	"notification.error.layout": "Kunne ikke hente layout",
	"notification.form.error.fields": "Formularen indeholder fejl",
	"notification.form.success.fields": "Ændringer gemt",
	"notification.link-copied": "Link kopieret til udklipsholder",
	"notification.permission.not-allowed-read": "Du har ikke tilladelse til at se dette dokument",
	"notification.success.delete": "Elementet er blevet slettet",
	"notification.success.saved": "Gemt",
	"notification.success.title": "Succes:",
	"notification.version.update.message": "En ny version af Strapi er tilgængelig!",
	"notification.warning.title": "Advarsel:",
	or: or,
	"request.error.model.unknown": "Denne model findes ikke",
	skipToContent: skipToContent,
	submit: submit
};

exports.Analytics = Analytics;
exports.Documentation = Documentation;
exports.Email = Email;
exports.Password = Password;
exports.Provider = Provider;
exports.ResetPasswordToken = ResetPasswordToken;
exports.Role = Role;
exports.Username = Username;
exports.Users = Users;
exports.anErrorOccurred = anErrorOccurred;
exports.clearLabel = clearLabel;
exports.default = dk;
exports.or = or;
exports.skipToContent = skipToContent;
exports.submit = submit;
//# sourceMappingURL=dk-Dy9JFy9v.js.map

const groups = "Groepen";
const models = "Collectie Types";
const pageNotFound = "Pagina niet gevonden";
const nl = {
  "App.schemas.data-loaded": "De schema's zijn succesvol geladen",
  "ListViewTable.relation-loaded": "De relaties zijn geladen",
  "ListViewTable.relation-loading": "Relaties worden geladen",
  "ListViewTable.relation-more": "Deze relatie bevat meer entiteiten dan weergegeven",
  "EditRelations.title": "Gerelateerde data",
  "HeaderLayout.button.label-add-entry": "Nieuwe invoer",
  "api.id": "API ID",
  "components.AddFilterCTA.add": "Filters",
  "components.AddFilterCTA.hide": "Filters",
  "components.DragHandle-label": "Sleep",
  "components.DraggableAttr.edit": "Klik om aan te passen",
  "components.DraggableCard.delete.field": "Verwijder {item}",
  "components.DraggableCard.edit.field": "Pas {item} aan",
  "components.DraggableCard.move.field": "Verplaats {item}",
  "components.ListViewTable.row-line": "item regel {number}",
  "components.DynamicZone.ComponentPicker-label": "Kies één component",
  "components.DynamicZone.add-component": "Voeg een component toe aan {componentName}",
  "components.DynamicZone.delete-label": "Verwijder {name}",
  "components.DynamicZone.error-message": "Het component bevat fout(en)",
  "components.DynamicZone.missing-components": "Er {number, plural, =0 {zijn # missende componenten} one {is één # missend component} other {zijn # missende componenten}}",
  "components.DynamicZone.move-down-label": "Verplaats component naar beneden",
  "components.DynamicZone.move-up-label": "Verplaats component naar boven",
  "components.DynamicZone.pick-compo": "Kies één component",
  "components.DynamicZone.required": "Component is vereist",
  "components.EmptyAttributesBlock.button": "Ga naar instellingspagina",
  "components.EmptyAttributesBlock.description": "Je kunt je instellingen wijzigen",
  "components.FieldItem.linkToComponentLayout": "Stel de lay-out van het component in",
  "components.FieldSelect.label": "Voeg veld toe",
  "components.FilterOptions.button.apply": "Pas toe",
  "components.FiltersPickWrapper.PluginHeader.actions.apply": "Pas toe",
  "components.FiltersPickWrapper.PluginHeader.actions.clearAll": "Wis alles",
  "components.FiltersPickWrapper.PluginHeader.description": "Stel de voorwaarden in om toe te passen voor het filteren van de items",
  "components.FiltersPickWrapper.PluginHeader.title.filter": "Filters",
  "components.FiltersPickWrapper.hide": "Verberg",
  "components.LeftMenu.Search.label": "Zoek een Content-Type",
  "components.LeftMenu.collection-types": "Collectie Types",
  "components.LeftMenu.single-types": "Enkele Types",
  "components.LimitSelect.itemsPerPage": "Items per pagina",
  "components.NotAllowedInput.text": "Geen rechten om dit veld te bekijken",
  "components.RepeatableComponent.error-message": "Eén of meerdere componenten bevatten een fout",
  "components.Search.placeholder": "Zoek een item...",
  "components.Select.draft-info-title": "Status: Concept",
  "components.Select.publish-info-title": "Status: Gepubliceerd",
  "components.SettingsViewWrapper.pluginHeader.description.edit-settings": "Pas aan hoe de bewerkingsweergave eruit zal zien.",
  "components.SettingsViewWrapper.pluginHeader.description.list-settings": "Definieer de instellingen van de lijstweergave.",
  "components.SettingsViewWrapper.pluginHeader.title": "Configureer de weergave - {name}",
  "components.TableDelete.delete": "Verwijder alle",
  "components.TableDelete.deleteSelected": "Verwijder geselecteerde",
  "components.TableDelete.label": "{number, plural, one {# entry} other {# entries}} geselecteerd",
  "components.TableEmpty.withFilters": "Er zijn geen {contentType} met de geselecteerde filters...",
  "components.TableEmpty.withSearch": "Er zijn geen {contentType} die overeenkomen met de zoekopdracht ({search})...",
  "components.TableEmpty.withoutFilter": "Er zijn geen {contentType}...",
  "components.empty-repeatable": "Nog geen items. Klik op de knop hieronder om er een toe te voegen.",
  "components.notification.info.maximum-requirement": "Je hebt het maximale aantal velden al bereikt",
  "components.notification.info.minimum-requirement": "Een veld is toegevoegd om te voldoen aan de minimale voorwaarde",
  "components.repeatable.reorder.error": "Er is een fout opgetreden bij het opnieuw sorteren van het veld van je component, probeer het a.u.b. opnieuw",
  "components.reset-entry": "Reset invoer",
  "components.uid.apply": "pas toe",
  "components.uid.available": "Beschikbaar",
  "components.uid.regenerate": "Regenereer",
  "components.uid.suggested": "voorgesteld",
  "components.uid.unavailable": "Onbeschikbaar",
  "containers.Edit.Link.Layout": "Configureer de lay-out",
  "containers.Edit.Link.Model": "Pas het collectie-type aan",
  "containers.Edit.addAnItem": "Voeg een item toe...",
  "containers.Edit.clickToJump": "Klik om naar de invoer te springen",
  "containers.Edit.delete": "Verwijder",
  "containers.Edit.delete-entry": "Verwijder deze invoer",
  "containers.Edit.editing": "Aanpassen...",
  "containers.Edit.information": "Informatie",
  "containers.Edit.information.by": "Door",
  "containers.Edit.information.created": "Gecreëerd",
  "containers.Edit.information.draftVersion": "concept versie",
  "containers.Edit.information.editing": "Aan het bewerken",
  "containers.Edit.information.lastUpdate": "Laatste update",
  "containers.Edit.information.publishedVersion": "gepubliceerde versie",
  "containers.Edit.pluginHeader.title.new": "Voeg een invoer toe",
  "containers.Edit.reset": "Resetten",
  "containers.Edit.returnList": "Terug naar lijst",
  "containers.Edit.seeDetails": "Details",
  "containers.Edit.submit": "Opslaan",
  "containers.EditSettingsView.modal-form.edit-field": "Veld aanpassen",
  "containers.EditView.add.new-entry": "Voeg een invoer toe",
  "containers.EditView.notification.errors": "Het formulier bevat fouten",
  "containers.Home.introduction": "Om items aan te passen klik je op de link in het menu links boven. Deze plugin heeft nog geen goede manier om instellingen aan te passen en is nog in ontwikkeling.",
  "containers.Home.pluginHeaderDescription": "Onderhoud je data via een krachtig en mooie interface.",
  "containers.Home.pluginHeaderTitle": "Content Manager",
  "containers.List.draft": "Concept",
  "containers.List.errorFetchRecords": "Fout",
  "containers.List.published": "Gepubliceerd",
  "containers.list.displayedFields": "Weergegeven velden",
  "containers.list.items": "{number, plural, =0 {items} one {item} other {items}}",
  "containers.list.table-headers.publishedAt": "Status",
  "containers.ListSettingsView.modal-form.edit-label": "Pas {fieldName} aan",
  "containers.SettingPage.add.field": "Voeg nog een veld toe",
  "containers.SettingPage.attributes": "Attribuut velden",
  "containers.SettingPage.attributes.description": "Geef de volgorde van de attributen aan",
  "containers.SettingPage.editSettings.description": "Klik & sleep de velden om de lay-out te bouwen",
  "containers.SettingPage.editSettings.entry.title": "Invoer titel",
  "containers.SettingPage.editSettings.entry.title.description": "Stel het weergegeven veld van je invoer in",
  "containers.SettingPage.editSettings.relation-field.description": "Stel het weergegeven veld in voor zowel de bewerkings- als de lijstweergave",
  "containers.SettingPage.editSettings.title": "Weergave aanpassen (instellingen)",
  "containers.SettingPage.layout": "Lay-out",
  "containers.SettingPage.listSettings.description": "Configureer de opties voor dit collectie type",
  "containers.SettingPage.listSettings.title": "Lijstweergave (instellingen)",
  "containers.SettingPage.pluginHeaderDescription": "Configureer de specifieke instellingen voor dit collectie type",
  "containers.SettingPage.settings": "Instellingen",
  "containers.SettingPage.view": "Bekijk",
  "containers.SettingViewModel.pluginHeader.title": "Content Manager - {name}",
  "containers.SettingsPage.Block.contentType.description": "Configureer de specifieke instellingen",
  "containers.SettingsPage.Block.contentType.title": "Collectie Types",
  "containers.SettingsPage.Block.generalSettings.description": "Configureer de standaard instellingen voor je Collection Types",
  "containers.SettingsPage.Block.generalSettings.title": "Algemeen",
  "containers.SettingsPage.pluginHeaderDescription": "Configureer de instellingen voor je collectie types en groepen",
  "containers.SettingsView.list.subtitle": "Configureer de instellingen voor je collectie types en groepen",
  "containers.SettingsView.list.title": "Geef configuraties weer",
  "edit-settings-view.link-to-ctb.components": "Pas component aan",
  "edit-settings-view.link-to-ctb.content-types": "Pas het Content-Type aan",
  "emptyAttributes.button": "Ga naar collectie type bouwer",
  "emptyAttributes.description": "Voeg je eerste veld toe aan je Collectie Type",
  "emptyAttributes.title": "Er zijn nog geen velden",
  "error.attribute.key.taken": "Deze waarde bestaat al.",
  "error.attribute.sameKeyAndName": "Mag niet gelijk zijn.",
  "error.attribute.taken": "Deze veld naam bestaat al.",
  "error.contentTypeName.taken": "Deze naam bestaat al.",
  "error.model.fetch": "Er is een fout opgetreden tijdens het ophalen van de modellen.",
  "error.record.create": "Er is een fout opgetreden tijdens het maken van het item.",
  "error.record.delete": "Er is een fout opgetreden tijdens het verwijderen van het item.",
  "error.record.fetch": "Er is een fout opgetreden tijdens het ophalen van het item.",
  "error.record.update": "Er is een fout opgetreden tijdens het opslaan van het item.",
  "error.records.count": "Er is een fout opgetreden tijdens het tellen van de opgehaalde gegevens.",
  "error.records.fetch": "Er is een fout opgetreden tijdens het ophalen van de gegevens.",
  "error.schema.generation": "Er is een fout opgetreden tijdens het maken van het schema.",
  "error.validation.json": "Dit is geen JSON.",
  "error.validation.max": "De waarde is te hoog.",
  "error.validation.maxLength": "De waarde is te lang.",
  "error.validation.min": "De waarde is te laag.",
  "error.validation.minLength": "De waarde is te kort.",
  "error.validation.minSupMax": "Mag niet superieur zijn.",
  "error.validation.regex": "De waarde is niet gelijk aan de regex.",
  "error.validation.required": "Deze gegevens zijn verplicht.",
  "form.Input.bulkActions": "Schakel bulkacties in",
  "form.Input.defaultSort": "Standaard sorteringsattribuut",
  "form.Input.description": "Beschrijving",
  "form.Input.description.placeholder": "Weergavenaam in het profiel",
  "form.Input.editable": "Aanpasbaar veld",
  "form.Input.filters": "Schakel filters in",
  "form.Input.label": "Label",
  "form.Input.label.inputDescription": "Deze waarde overschrijft het label welke weergegeven wordt in het hoofd van de tabel",
  "form.Input.pageEntries": "Items per pagina",
  "form.Input.pageEntries.inputDescription": "Opmerking: Je kan deze waarde overschrijven in de Collectie Type instellingspagina",
  "form.Input.placeholder": "Placeholder",
  "form.Input.placeholder.placeholder": "Mijn geweldige waarde",
  "form.Input.search": "Schakel zoeken in",
  "form.Input.search.field": "Schakel zoeken in voor dit veld",
  "form.Input.sort.field": "Schakel sorteren in voor dit veld",
  "form.Input.sort.order": "Standaard sorteervolgorde",
  "form.Input.wysiwyg": "Weergeef als WYSIWYG",
  "global.displayedFields": "Weergegeven velden",
  groups,
  "groups.numbered": "Groepen ({number})",
  "header.name": "Content",
  "link-to-ctb": "Pas het model aan",
  models,
  "models.numbered": "Collectie Types ({number})",
  "notification.error.displayedFields": "Je hebt op z'n minst één weergegeven veld nodig.",
  "notification.error.relationship.fetch": "Er is een fout opgetreden tijdens het ophalen van de relaties.",
  "notification.info.SettingPage.disableSort": "Je hebt op z'n minst één attribuut nodig waar sorteren toegestaan is.",
  "notification.info.minimumFields": "Je hebt op z'n minst één weergegeven veld nodig.",
  "notification.upload.error": "Er is een fout opgetreden tijdens het uploaden van je bestanden",
  pageNotFound,
  "pages.ListView.header-subtitle": "{number, plural, =0 {# entries} one {# entry} other {# entries}} gevonden",
  "pages.NoContentType.button": "Creëer je eerste Content-Type",
  "pages.NoContentType.text": "Je hebt nog geen content, we raden je aan je eerste Content-Type te creëeren.",
  "permissions.not-allowed.create": "Je hebt niet de rechten om een document te maken",
  "permissions.not-allowed.update": "Je hebt niet de rechten om dit document te zien",
  "plugin.description.long": "Snelle manier om data te zien, aan te passen en te verwijderen in je database",
  "plugin.description.short": "Snelle manier om data te zien, aan te passen en te verwijderen in je database.",
  "popover.display-relations.label": "Geef gerelateerde content weer",
  "select.currently.selected": "{count} nu geselecteerd",
  "success.record.delete": "Verwijderd",
  "success.record.publish": "Gepubliceerd",
  "success.record.save": "Opgeslagen",
  "success.record.unpublish": "Depubliceren",
  "utils.data-loaded": "{number, plural, =1 {Het item is} other {De items zijn}} succesvol geladen!",
  "apiError.This attribute must be unique": "{field} moet uniek zijn",
  "popUpWarning.warning.has-draft-relations.title": "Bevestiging",
  "popUpWarning.warning.publish-question": "Wil je toch publiceren?",
  "popUpwarning.warning.has-draft-relations.button-confirm": "Ja, publiceren",
  "popUpwarning.warning.has-draft-relations.message": "<b>{count, plural, one { relatie is } other { relaties zijn } }</b> nog niet gepubliceerd en kan leiden tot onverwacht gedrag."
};
export {
  nl as default,
  groups,
  models,
  pageNotFound
};
//# sourceMappingURL=nl-D4R9gHx5.mjs.map

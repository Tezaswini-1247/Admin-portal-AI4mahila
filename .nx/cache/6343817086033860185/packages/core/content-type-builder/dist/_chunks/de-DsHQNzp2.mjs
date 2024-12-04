const configurations = "Konfigurationen";
const from = "von";
const de = {
  "attribute.boolean": "Boolean",
  "attribute.boolean.description": "Ja oder nein, 1 oder 0, wahr oder falsch",
  "attribute.component": "Komponente",
  "attribute.component.description": "Gruppierung an Feldern, die wiederholt und wiederbenutzt werden kann",
  "attribute.date": "Datum",
  "attribute.date.description": "Eine Datums-Auswahl mit Stunden, Minuten und Sekunden",
  "attribute.datetime": "Datum mit Uhrzeit",
  "attribute.dynamiczone": "Dynamische Zone",
  "attribute.dynamiczone.description": "Beliebige Komponenten beim Bearbeiten des Inhalts wählen",
  "attribute.email": "E-Mail",
  "attribute.email.description": "E-Mail-Feld mit Validierung",
  "attribute.enumeration": "Enumeration",
  "attribute.enumeration.description": "Aufzählung an Auswahlmöglichkeiten, von denen eine gewählt werden muss",
  "attribute.json": "JSON",
  "attribute.json.description": "Daten im JSON-Format",
  "attribute.media": "Medien",
  "attribute.media.description": "Dateien wie Bilder, Videos, etc",
  "attribute.null": " ",
  "attribute.number": "Zahl",
  "attribute.number.description": "Zahlen (ganzzahlig, Gleitkommazahl, dezimal)",
  "attribute.password": "Passwort",
  "attribute.password.description": "Passwort-Feld mit Verschlüsselung",
  "attribute.relation": "Beziehung",
  "attribute.relation.description": "Beziehung mit einem anderen Eintrag",
  "attribute.richtext": "Formatierter Text",
  "attribute.richtext.description": "Ein Text-Editor mit Formatierungsoptionen",
  "attribute.text": "Text",
  "attribute.text.description": "Ein- oder mehrzeiliger Text wie Titel oder Beschreibungen",
  "attribute.time": "Uhrzeit",
  "attribute.timestamp": "Zeitstempel",
  "attribute.uid": "UID",
  "attribute.uid.description": "Einzigartiger Identifier",
  "button.attributes.add.another": "Weiteres Feld hinzufügen",
  "button.component.add": "Komponente hinzufügen",
  "button.component.create": "Neue Komponente erstellen",
  "button.model.create": "Neue Sammlung erstellen",
  "button.single-types.create": "Neuen Einzel-Eintrag erstellen",
  "component.repeatable": "(wiederholbar)",
  "components.SelectComponents.displayed-value": "{number, plural, =0 {# Komponenten} one {# Komponente} other {# Komponenten}} ausgewählt",
  "components.componentSelect.no-component-available": "Du hast bereits alle Komponenten hinzugefügt",
  "components.componentSelect.no-component-available.with-search": "Es gibt keine Komponenten, die diesem Begriff entsprechen",
  "components.componentSelect.value-component": "{number} Komponente ausgewählt (Tippen um nach Komponente zu suchen)",
  "components.componentSelect.value-components": "{number} Komponenten ausgewählt",
  configurations,
  "contentType.apiId-plural.description": "API-ID im Plural",
  "contentType.apiId-plural.label": "Plural API ID",
  "contentType.apiId-singular.description": "Die UID wird verwendet, um API-Routen und Datenbank-Tabellen/-Sammlungen zu erstellen",
  "contentType.apiId-singular.label": "Singular API ID",
  "contentType.collectionName.description": "Nützlich wenn sich der Name der Sammlung und der Tabellenname unterscheiden",
  "contentType.collectionName.label": "Name der Sammlung",
  "contentType.displayName.label": "Anzeigename",
  "contentType.kind.change.warning": "Du hast die Art eines Inhaltstyps geändert: API wird resettet (Routen, Controller und Services werden überschrieben).",
  "error.attributeName.reserved-name": "Dieser Name kann nicht für Attribute genutzt werden, da er andere Funktionalitäten beeinträchtigen würde",
  "error.contentType.pluralName-used": "Dieser Wert kann nicht gleich sein wie der Singular-Wert",
  "error.contentType.singularName-used": "Dieser Wert kann nicht gleich sein wie der Plural-Wert",
  "error.contentTypeName.reserved-name": "Dieser Name kann nicht genutzt werden, da er andere Funktionalitäten beeinträchtigen würde",
  "error.validation.enum-duplicate": "Doppelte Werte sind nicht erlaubt",
  "error.validation.enum-empty-string": "Leere Werte sind nicht erlaubt",
  "error.validation.enum-number": "Werte können nicht mit einer Zahl beginnen",
  "error.validation.minSupMax": "Wert kann nicht höher sein",
  "error.validation.positive": "Muss eine positive Zahl sein",
  "error.validation.regex": "Regex-Pattern ist ungültig",
  "error.validation.relation.targetAttribute-taken": "Dieser Name existiert bereits im Ziel-Typ",
  "form.attribute.component.option.add": "Komponente hinzufügen",
  "form.attribute.component.option.create": "Neue Komponente erstellen",
  "form.attribute.component.option.create.description": "Eine Komponente ist überall verfügbar und wird unter Inhaltstypen und anderen Komponenten geteilt.",
  "form.attribute.component.option.repeatable": "Wiederholbare Komponenten",
  "form.attribute.component.option.repeatable.description": "Nützlich für mehrere Instanzen (Array) an Zutaten, Meta-Tags, etc...",
  "form.attribute.component.option.reuse-existing": "Bereits existierende Komponente nutzen",
  "form.attribute.component.option.reuse-existing.description": "Eine bereits erstellte Komponente benutzen, um Daten über Inhaltstypen hinweg konsistent zu halten.",
  "form.attribute.component.option.single": "Einzelne Komponente",
  "form.attribute.component.option.single.description": "Nützlich um Felder wie volle Addresse, Hauptinformationen, etc. zu grupppieren",
  "form.attribute.item.customColumnName": "Eigener Spaltenname",
  "form.attribute.item.customColumnName.description": "Dies ist nützlich, um Spalten in der Datenbank für Antworten der API umzubenennen",
  "form.attribute.item.date.type.date": "Datum (Bsp: 01.01.{currentYear})",
  "form.attribute.item.date.type.datetime": "Datum & Uhrzeit (Bsp: 01.01.{currentYear} 00:00)",
  "form.attribute.item.date.type.time": "Uhrzeit (Bsp: 00:00)",
  "form.attribute.item.defineRelation.fieldName": "Feldname",
  "form.attribute.item.enumeration.graphql": "Namensüberschreibung für GraphQL",
  "form.attribute.item.enumeration.graphql.description": "Ermöglicht, den standardmäßig generierten Namen für GraphQL zu überschreiben",
  "form.attribute.item.enumeration.placeholder": "Bsp:\nMorgen\nMittag\nAbend",
  "form.attribute.item.enumeration.rules": "Werte (einer pro Zeile)",
  "form.attribute.item.maximum": "Maximalwert",
  "form.attribute.item.maximumLength": "Maximallänge",
  "form.attribute.item.minimum": "Mindestwert",
  "form.attribute.item.minimumLength": "Mindestlänge",
  "form.attribute.item.number.type": "Zahlenformat",
  "form.attribute.item.number.type.biginteger": "große Ganzzahl (ex: 123456789)",
  "form.attribute.item.number.type.decimal": "dezimal (z.B.: 2.22)",
  "form.attribute.item.number.type.float": "Gleitkommazahl (z.B.: 3.33333333)",
  "form.attribute.item.number.type.integer": "ganzzahlig (z.B.: 10)",
  "form.attribute.item.privateField": "Privates Feld",
  "form.attribute.item.privateField.description": "Dieses Feld wird nicht in API-Abfragen angezeigt",
  "form.attribute.item.requiredField": "Benötigtes Feld",
  "form.attribute.item.requiredField.description": "Du wirst keinen Eintrag anlegen können, wenn dieses Feld leer ist",
  "form.attribute.item.text.regex": "RegExp-Pattern",
  "form.attribute.item.text.regex.description": "Der Text der Regular Expression",
  "form.attribute.item.uniqueField": "Einzigartiges Feld",
  "form.attribute.item.uniqueField.description": "Du wirst keinen Eintrag anlegen können, wenn es bereits einen Eintrag mit identischem Inhalt gibt",
  "form.attribute.media.allowed-types": "Wähle erlaubte Arten von Medien",
  "form.attribute.media.allowed-types.option-files": "Dateien",
  "form.attribute.media.allowed-types.option-images": "Bilder",
  "form.attribute.media.allowed-types.option-videos": "Videos",
  "form.attribute.media.option.multiple": "Mehrere Medien",
  "form.attribute.media.option.multiple.description": "Nützlich für Slider, Galerien oder Downloads von mehreren Dateien",
  "form.attribute.media.option.single": "Einzelne Medien-Datei",
  "form.attribute.media.option.single.description": "Nützlich für Profilbilder oder Cover-Bilder",
  "form.attribute.settings.default": "Standardwert",
  "form.attribute.text.option.long-text": "Mehrzeiliger Text",
  "form.attribute.text.option.long-text.description": "Nützlich für Beschreibungen, Biographien. Exakte Suche ist deaktiviert",
  "form.attribute.text.option.short-text": "Einzeiliger Text",
  "form.attribute.text.option.short-text.description": "Nützlich für Titel, Namen, Links (URL). Ermöglicht exakte Suche.",
  "form.button.add-components-to-dynamiczone": "Komponenten zur Zone hinzufügen",
  "form.button.add-field": "Weiteres Feld hinzufügen",
  "form.button.add-first-field-to-created-component": "Erstes Feld zur Komponente hinzufügen",
  "form.button.add.field.to.collectionType": "Weiteres Feld zur Sammlung hinzufügen",
  "form.button.add.field.to.component": "Weiteres Feld zur Komponente hinzufügen",
  "form.button.add.field.to.contentType": "Weiteres Feld zum Inhaltstyp hinzufügen",
  "form.button.add.field.to.singleType": "Weiteres Feld zum Einzel-Eintrag hinzufügen",
  "form.button.cancel": "Abbrechen",
  "form.button.collection-type.description": "Nützlich für mehrere Instanzen wie Artikel, Produkte, Kommentare, etc.",
  "form.button.collection-type.name": "Inhalts-Typ",
  "form.button.configure-component": "Komponente konfigurieren",
  "form.button.configure-view": "Ansicht konfigurieren",
  "form.button.select-component": "Komponente auswählen",
  "form.button.single-type.description": "Nützlich für einzelne Instanz wie Über uns, Startseite, etc.",
  "form.button.single-type.name": "Einzel-Eintrag",
  from,
  "listView.headerLayout.description": "Baue die Daten-Architektur deines Inhalts",
  "menu.section.components.name": "Komponenten",
  "menu.section.models.name": "Sammlungen",
  "menu.section.single-types.name": "Einzel-Einträge",
  "modalForm.attribute.form.base.name.description": "Leerzeichen sind im Name eines Attributs nicht erlaubt",
  "modalForm.attribute.form.base.name.placeholder": "z.B. slug, seoUrl, canonicalUrl",
  "modalForm.attribute.target-field": "Verknüpftes Feld",
  "modalForm.attributes.select-component": "Wähle eine Komponente",
  "modalForm.attributes.select-components": "Wähle die Komponenten",
  "modalForm.collectionType.header-create": "Erstelle einen Inhalts-Typ",
  "modalForm.component.header-create": "Erstelle eine Komponente",
  "modalForm.components.create-component.category.label": "Wähle Kategorie oder gebe neuen Namen ein, um eine zu erstellen",
  "modalForm.components.icon.label": "Icon",
  "modalForm.editCategory.base.name.description": "Leerzeichen sind im Name einer Kategorie nicht erlaubt",
  "modalForm.header-edit": "Bearbeite {name}",
  "modalForm.header.categories": "Kategorien",
  "modalForm.header.back": "Zurück",
  "modalForm.singleType.header-create": "Erstelle einen Einzel-Eintrag",
  "modalForm.sub-header.addComponentToDynamicZone": "Komponente zur dynamischen Zone hinzufügen",
  "modalForm.sub-header.attribute.create": "Erstelle neues {type}-Feld",
  "modalForm.sub-header.attribute.create.step": "Neue Komponente ({step}/2)",
  "modalForm.sub-header.attribute.edit": "Bearbeite {name}",
  "modalForm.sub-header.chooseAttribute.collectionType": "Wähle ein Feld für die Sammlung",
  "modalForm.sub-header.chooseAttribute.component": "Wähle ein Feld für die Komponente",
  "modalForm.sub-header.chooseAttribute.singleType": "Wähle ein Feld für den Einzel-Eintrag",
  "modelPage.attribute.relation-polymorphic": "Beziehung (polymorph)",
  "modelPage.attribute.relationWith": "Beziehung mit",
  "notification.error.dynamiczone-min.validation": "Eine dynamische Zone braucht mindestens eine Komponente, bevor sie gespeichert werden kann",
  "notification.info.autoreaload-disable": "Das autoReload-Feature wird für dieses Plugin benötigt. Starte deinen Server mit `strapi develop`",
  "notification.info.creating.notSaved": "Bitte speichere deine Arbeit bevor du einen neuen Inhaltstyp oder eine neue Komponente erstellst",
  "plugin.description.long": "Modelliere die Datenstruktur deiner API. Lege neue Felder und Beziehungen innerhalb von einer Minute an. Erforderliche Dateien werden automatisch in deinem Projekt angelegt und aktualisiert.",
  "plugin.description.short": "Modelliere die Datenstruktur deiner API.",
  "plugin.name": "Content-Type Builder",
  "popUpForm.navContainer.advanced": "Fortgeschrittene Einstellungen",
  "popUpForm.navContainer.base": "Grundeinstellungen",
  "popUpWarning.bodyMessage.cancel-modifications": "Bist du dir sicher, dass du alle deine Änderungen abbrechen willst?",
  "popUpWarning.bodyMessage.cancel-modifications.with-components": "Bist du dir sicher, dass du alle deine Änderungen abbrechen willst? Es wurden Komponenten erstellt oder bearbeitet...",
  "popUpWarning.bodyMessage.category.delete": "Bist du dir sicher, dass du diese Kategorie löschen willst? Alle dazugehörigen Komponenten werden ebenfalls gelöscht.",
  "popUpWarning.bodyMessage.component.delete": "Bist du dir sicher, dass du diese Komponente löschen willst?",
  "popUpWarning.bodyMessage.contentType.delete": "Bist du sicher, dass du diesen Inhaltstyp löschen willst?",
  "popUpWarning.draft-publish.button.confirm": "Ja, deaktivieren",
  "popUpWarning.draft-publish.message": "Wenn du das Entwurf/Veröffentlichen-System deaktivierst werden alle Entwürfe gelöscht.",
  "popUpWarning.draft-publish.second-message": "Bist du dir sicher, dass du es deaktivieren willst?",
  "prompt.unsaved": "Bist du dir sicher, dass du diese Seite verlassen willst? Deine Änderungen werden verworfen.",
  "relation.attributeName.placeholder": "z.B.: Autor, Kategorie",
  "relation.manyToMany": "hat und gehört zu vielen",
  "relation.manyToOne": "hat viele",
  "relation.manyWay": "hat viele",
  "relation.oneToMany": "gehört zu vielen",
  "relation.oneToOne": "hat und gehört zu ein(-er/-em)",
  "relation.oneWay": "hat ein(-e/-en)",
  "table.button.no-fields": "Neues Feld hinzufügen",
  "table.content.create-first-content-type": "Erstelle deinen ersten Inhalts-Typ",
  "table.content.no-fields.collection-type": "Füge diesem Inhalts-Typ das erstes Feld hinzu",
  "table.content.no-fields.component": "Füge dieser Komponente das erstes Feld hinzu"
};
export {
  configurations,
  de as default,
  from
};
//# sourceMappingURL=de-DsHQNzp2.mjs.map

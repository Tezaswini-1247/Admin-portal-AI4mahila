"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const groups = "그룹";
const models = "콜렉션 타입";
const pageNotFound = "페이지를 찾을 수 없습니다.";
const ko = {
  "App.schemas.data-loaded": "스키마를 불러왔습니다.",
  "ListViewTable.relation-loaded": "릴레이션을 불러왔습니다.",
  "EditRelations.title": "관계 데이터",
  "HeaderLayout.button.label-add-entry": "새 항목 추가",
  "api.id": "API ID",
  "components.AddFilterCTA.add": "필터",
  "components.AddFilterCTA.hide": "필터",
  "components.DragHandle-label": "드래그",
  "components.DraggableAttr.edit": "클릭하여 수정",
  "components.DraggableCard.delete.field": "{item} 삭제",
  "components.DraggableCard.edit.field": "{item} 수정",
  "components.DraggableCard.move.field": "{item} 이동",
  "components.ListViewTable.row-line": "item line {number}",
  "components.DynamicZone.ComponentPicker-label": "Pick one component",
  "components.DynamicZone.add-component": "Add a component to {componentName}",
  "components.DynamicZone.delete-label": "{name} 삭제",
  "components.DynamicZone.error-message": "The component contains error(s)",
  "components.DynamicZone.missing-components": "{number, plural, =0 {# 개} one {is # 개} other {are # 개}}의 누락된 컴포넌트가 있습니다.",
  "components.DynamicZone.move-down-label": "컴포넌트 아래로 이동",
  "components.DynamicZone.move-up-label": "컴포넌트 위로 이동",
  "components.DynamicZone.pick-compo": "Pick one component",
  "components.DynamicZone.required": "컴포넌트는 필수 항목입니다.",
  "components.EmptyAttributesBlock.button": "설정 페이지 이동",
  "components.EmptyAttributesBlock.description": "설정을 변경할 수 있습니다.",
  "components.FieldItem.linkToComponentLayout": "컴포넌트 레이아웃 설정",
  "components.FieldSelect.label": "필드 추가",
  "components.FilterOptions.button.apply": "적용",
  "components.FiltersPickWrapper.PluginHeader.actions.apply": "적용",
  "components.FiltersPickWrapper.PluginHeader.actions.clearAll": "모두 재설정",
  "components.FiltersPickWrapper.PluginHeader.description": "필터링 조건을 설정하세요.",
  "components.FiltersPickWrapper.PluginHeader.title.filter": "필터",
  "components.FiltersPickWrapper.hide": "숨김",
  "components.LeftMenu.Search.label": "콘텐츠 타입 검색",
  "components.LeftMenu.collection-types": "콜렉션 타입",
  "components.LeftMenu.single-types": "싱글 타입",
  "components.LimitSelect.itemsPerPage": "항목 수 / 페이지",
  "components.NotAllowedInput.text": "이 필드를 볼 수 있는 권한이 없습니다.",
  "components.RepeatableComponent.error-message": "The component(s) contain error(s)",
  "components.Search.placeholder": "검색 중입니다...",
  "components.Select.draft-info-title": "상태: 초안",
  "components.Select.publish-info-title": "상태: 발행됨",
  "components.SettingsViewWrapper.pluginHeader.description.edit-settings": "편집 보기 화면을 구성합니다.",
  "components.SettingsViewWrapper.pluginHeader.description.list-settings": "목록 보기 화면을 구성합니다.",
  "components.SettingsViewWrapper.pluginHeader.title": "보기 설정 - {name}",
  "components.TableDelete.delete": "모두 삭제",
  "components.TableDelete.deleteSelected": "선택항목 삭제",
  "components.TableDelete.label": "{number, plural, one {# 개} other {# 개}}의 항목이 선택됨",
  "components.TableEmpty.withFilters": "필터 조건에 맞는 {contentType} 목록이 없습니다.",
  "components.TableEmpty.withSearch": '"{search}" 검색. {contentType} 목록이 없습니다.',
  "components.TableEmpty.withoutFilter": "{contentType} 목록이 없습니다.",
  "components.empty-repeatable": "항목이 없습니다. 항목을 추가하려면 아래 버튼을 클릭해주세요.",
  "components.notification.info.maximum-requirement": "이미 최대 필드 수에 도달했습니다.",
  "components.notification.info.minimum-requirement": "최소 요구 사항과 일치하도록 필드가 추가되었습니다.",
  "components.repeatable.reorder.error": "컴포넌트 필드를 재정렬하는 중에 오류가 발생했습니다. 다시 시도하십시오.",
  "components.reset-entry": "Reset entry",
  "components.uid.apply": "적용",
  "components.uid.available": "사용 가능",
  "components.uid.regenerate": "재생성",
  "components.uid.suggested": "제안됨",
  "components.uid.unavailable": "사용 불가",
  "containers.Edit.Link.Layout": "레이아웃 설정",
  "containers.Edit.Link.Model": "콜렉션 타입 수정",
  "containers.Edit.addAnItem": "추가할 항목...",
  "containers.Edit.clickToJump": "해당 항목으로 이동하려면 클릭",
  "containers.Edit.delete": "삭제",
  "containers.Edit.delete-entry": "이 항목 삭제",
  "containers.Edit.editing": "수정 중...",
  "containers.Edit.information": "정보",
  "containers.Edit.information.by": "편집자",
  "containers.Edit.information.draftVersion": "초안 버전",
  "containers.Edit.information.editing": "수정중 -",
  "containers.Edit.information.lastUpdate": "최근 업데이트",
  "containers.Edit.information.publishedVersion": "발행 버전",
  "containers.Edit.pluginHeader.title.new": "항목 생성",
  "containers.Edit.reset": "초기화",
  "containers.Edit.returnList": "목록",
  "containers.Edit.seeDetails": "세부 사항",
  "containers.Edit.submit": "저장",
  "containers.EditSettingsView.modal-form.edit-field": "필드 수정",
  "containers.EditView.add.new-entry": "항목 추가",
  "containers.EditView.notification.errors": "잘못 입력된 필드가 존재합니다.",
  "containers.Home.introduction": "항목을 수정하려면 왼편 링크를 클릭하세요. 이 플러그인은 설정을 편집할 수 있는 방법을 개발 중입니다.",
  "containers.Home.pluginHeaderDescription": "쉽고 강력한 UI를 통해 항목들을 관리 하세요.",
  "containers.Home.pluginHeaderTitle": "콘텐츠 관리",
  "containers.List.draft": "초안",
  "containers.List.errorFetchRecords": "에러",
  "containers.List.published": "발행됨",
  "containers.list.displayedFields": "표시 필드",
  "containers.list.items": "{number, plural, =0 {items} one {item} other {items}}",
  "containers.list.table-headers.publishedAt": "상태",
  "containers.ListSettingsView.modal-form.edit-label": "{fieldName} 수정",
  "containers.SettingPage.add.field": "다른 필드 추가",
  "containers.SettingPage.attributes": "속성",
  "containers.SettingPage.attributes.description": "속성의 순서를 지정합니다",
  "containers.SettingPage.editSettings.description": "레이아웃을 구성하려면 필드를 드래그 & 드롭하세요.",
  "containers.SettingPage.editSettings.entry.title": "항목 제목",
  "containers.SettingPage.editSettings.entry.title.description": "제목으로 보여줄 필드를 선택하세요.",
  "containers.SettingPage.editSettings.relation-field.description": "편집 및 목록 보기 화면에 모두 표시되는 필드를 설정합니다.",
  "containers.SettingPage.editSettings.title": "화면 수정 (설정)",
  "containers.SettingPage.layout": "레이아웃",
  "containers.SettingPage.listSettings.description": "이 컬렉션 타입에 대한 옵션을 구성합니다.",
  "containers.SettingPage.listSettings.title": "목록 (설정)",
  "containers.SettingPage.pluginHeaderDescription": "이 컬렉션 타입에 대한 특정 설정을 구성합니다.",
  "containers.SettingPage.settings": "설정",
  "containers.SettingPage.view": "보기",
  "containers.SettingViewModel.pluginHeader.title": "콘텐츠 매니저 - {name}",
  "containers.SettingsPage.Block.contentType.description": "특정 설정을 구성합니다.",
  "containers.SettingsPage.Block.contentType.title": "콜렉션 타입",
  "containers.SettingsPage.Block.generalSettings.description": "콜렉션 타입에 대한 기본 옵션을 구성합니다.",
  "containers.SettingsPage.Block.generalSettings.title": "일반",
  "containers.SettingsPage.pluginHeaderDescription": "모든 콘텐츠 타입 및 그룹에 대한 설정을 구성합니다.",
  "containers.SettingsView.list.subtitle": "콘텐츠 타입 및 그룹의 레이아웃과 표시를 구성합니다.",
  "containers.SettingsView.list.title": "표시 설정",
  "edit-settings-view.link-to-ctb.components": "컴포넌트 수정",
  "edit-settings-view.link-to-ctb.content-types": "콘텐츠 타입 수정",
  "emptyAttributes.button": "콜렉션 타입 빌더로 이동",
  "emptyAttributes.description": "콜렉션 타입에 첫 필드를 추가해보세요.",
  "emptyAttributes.title": "아직 필드가 없습니다.",
  "error.attribute.key.taken": "이미 사용중인 키입니다.",
  "error.attribute.sameKeyAndName": "같은 값을 사용할 수 없습니다.",
  "error.attribute.taken": "이미 사용중인 이름입니다.",
  "error.contentTypeName.taken": "이미 사용중인 이름입니다.",
  "error.model.fetch": "모델 설정을 가져오는 도중 에러가 발생했습니다.",
  "error.record.create": "데이터를 생성하는 도중 에러가 발생했습니다.",
  "error.record.delete": "데이터를 삭제하는 도중 에러가 발생했습니다.",
  "error.record.fetch": "데이터를 가져오는 도중 에러가 발생했습니다.",
  "error.record.update": "데이터를 업데이트하는 도중 에러가 발생했습니다.",
  "error.records.count": "데이터 수를 가져오는 도중 에러가 발생했습니다.",
  "error.records.fetch": "데이터를 가져오는 도중 에러가 발생했습니다.",
  "error.schema.generation": "스키마를 생성하는 도중 에러가 발생했습니다.",
  "error.validation.json": "JSON 형식이 아닙니다.",
  "error.validation.max": "입력한 내용이 너무 큽니다.",
  "error.validation.maxLength": "입력한 내용이 너무 깁니다.",
  "error.validation.min": "입력한 내용이 너무 작습니다.",
  "error.validation.minLength": "입력한 내용이 너무 짧습니다.",
  "error.validation.minSupMax": "이 보다 더 클 수 없습니다.",
  "error.validation.regex": "입력한 내용이 맞지 않습니다.",
  "error.validation.required": "내용을 입력해 주세요.",
  "form.Input.bulkActions": "대규모 액션 활성화",
  "form.Input.defaultSort": "기본 정렬 속성",
  "form.Input.description": "설명",
  "form.Input.description.placeholder": "Display name in the profile",
  "form.Input.editable": "필드 수정가능 여부",
  "form.Input.filters": "필더 활성화",
  "form.Input.label": "라벨",
  "form.Input.label.inputDescription": "이 값은 테이블 머리에 표시된 라벨을 덮어씌웁니다.",
  "form.Input.pageEntries": "페이지 당 요소",
  "form.Input.pageEntries.inputDescription": "참고: 콘텐츠 타입 설정 페이지에서 이 값을 재정의(override)할 수 있습니다.",
  "form.Input.placeholder": "Placeholder",
  "form.Input.placeholder.placeholder": "My awesome value",
  "form.Input.search": "검색 활성화",
  "form.Input.search.field": "이 필드에 검색 활성화",
  "form.Input.sort.field": "이 필드에 정렬 활성화",
  "form.Input.sort.order": "기본 정렬 순서",
  "form.Input.wysiwyg": "WYSIWYG로 보기",
  "global.displayedFields": "표시 필드",
  groups,
  "groups.numbered": "그룹 ({number}개)",
  "header.name": "콘텐츠",
  "link-to-ctb": "모델 수정",
  models,
  "models.numbered": "콜렉션 타입 ({number})",
  "notification.error.displayedFields": "표시될 필드가 최소 하나 이상 필요합니다.",
  "notification.error.relationship.fetch": "데이터 관계를 가져오는 도중 에러가 발생했습니다.",
  "notification.info.SettingPage.disableSort": "정렬이 활성화된 한 개의 속성이 필요합니다.",
  "notification.info.minimumFields": "표시될 필드가 최소 하나 이상 필요합니다.",
  "notification.upload.error": "파일 업로드 중에 에러가 발생했습니다.",
  pageNotFound,
  "pages.ListView.header-subtitle": "{number, plural, =0 {# 개} one {# 개} other {# 개}} 항목을 찾았습니다.",
  "pages.NoContentType.button": "첫 콘텐츠 타입 생성하기",
  "pages.NoContentType.text": "아직 콘텐츠가 없습니다. 첫 콘텐츠 타입을 생성해보세요.",
  "permissions.not-allowed.create": "문서를 생성할 수 있는 권한이 없습니다.",
  "permissions.not-allowed.update": "이 문서를 볼 수 있는 권한이 없습니다.",
  "plugin.description.long": "데이터를 쉽게 확인 하고 수정, 삭제 할 수 있습니다.",
  "plugin.description.short": "데이터를 쉽게 확인 하고 수정, 삭제 할 수 있습니다.",
  "popover.display-relations.label": "Display relations",
  "success.record.delete": "삭제",
  "success.record.publish": "발행됨",
  "success.record.save": "저장",
  "success.record.unpublish": "발행이 취소됨",
  "utils.data-loaded": "The {number, plural, =1 {개} other {개}}의 항목을 불러왔습니다.",
  "popUpWarning.warning.publish-question": "정말 발행하시겠습니까?",
  "popUpwarning.warning.has-draft-relations.button-confirm": "네, 발행합니다."
};
exports.default = ko;
exports.groups = groups;
exports.models = models;
exports.pageNotFound = pageNotFound;
//# sourceMappingURL=ko-woFZPmLk.js.map

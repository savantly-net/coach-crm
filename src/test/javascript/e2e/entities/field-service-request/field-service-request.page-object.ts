import { element, by, ElementFinder } from 'protractor';

export class FieldServiceRequestComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-service-request div table .btn-danger'));
    title = element.all(by.css('jhi-field-service-request div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FieldServiceRequestUpdatePage {
    pageTitle = element(by.id('jhi-field-service-request-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    statusSelect = element(by.id('field_status'));
    contractDateInput = element(by.id('field_contractDate'));
    startDateInput = element(by.id('field_startDate'));
    finishDateInput = element(by.id('field_finishDate'));
    descriptionInput = element(by.id('field_description'));
    totalInput = element(by.id('field_total'));
    requestorSelect = element(by.id('field_requestor'));
    fieldServiceTypeSelect = element(by.id('field_fieldServiceType'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setContractDateInput(contractDate) {
        await this.contractDateInput.sendKeys(contractDate);
    }

    async getContractDateInput() {
        return this.contractDateInput.getAttribute('value');
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setFinishDateInput(finishDate) {
        await this.finishDateInput.sendKeys(finishDate);
    }

    async getFinishDateInput() {
        return this.finishDateInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setTotalInput(total) {
        await this.totalInput.sendKeys(total);
    }

    async getTotalInput() {
        return this.totalInput.getAttribute('value');
    }

    async requestorSelectLastOption() {
        await this.requestorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async requestorSelectOption(option) {
        await this.requestorSelect.sendKeys(option);
    }

    getRequestorSelect(): ElementFinder {
        return this.requestorSelect;
    }

    async getRequestorSelectedOption() {
        return this.requestorSelect.element(by.css('option:checked')).getText();
    }

    async fieldServiceTypeSelectLastOption() {
        await this.fieldServiceTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async fieldServiceTypeSelectOption(option) {
        await this.fieldServiceTypeSelect.sendKeys(option);
    }

    getFieldServiceTypeSelect(): ElementFinder {
        return this.fieldServiceTypeSelect;
    }

    async getFieldServiceTypeSelectedOption() {
        return this.fieldServiceTypeSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class FieldServiceRequestDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldServiceRequest-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldServiceRequest'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

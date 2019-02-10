import { element, by, ElementFinder } from 'protractor';

export class UploadComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-upload div table .btn-danger'));
    title = element.all(by.css('jhi-upload div h2#page-heading span')).first();

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

export class UploadUpdatePage {
    pageTitle = element(by.id('jhi-upload-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    fileInput = element(by.id('file_file'));
    fieldServiceRequestSelect = element(by.id('field_fieldServiceRequest'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setFileInput(file) {
        await this.fileInput.sendKeys(file);
    }

    async getFileInput() {
        return this.fileInput.getAttribute('value');
    }

    async fieldServiceRequestSelectLastOption() {
        await this.fieldServiceRequestSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async fieldServiceRequestSelectOption(option) {
        await this.fieldServiceRequestSelect.sendKeys(option);
    }

    getFieldServiceRequestSelect(): ElementFinder {
        return this.fieldServiceRequestSelect;
    }

    async getFieldServiceRequestSelectedOption() {
        return this.fieldServiceRequestSelect.element(by.css('option:checked')).getText();
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

export class UploadDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-upload-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-upload'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

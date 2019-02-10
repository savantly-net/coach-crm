import { element, by, ElementFinder } from 'protractor';

export class ContactPhoneComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-contact-phone div table .btn-danger'));
    title = element.all(by.css('jhi-contact-phone div h2#page-heading span')).first();

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

export class ContactPhoneUpdatePage {
    pageTitle = element(by.id('jhi-contact-phone-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    numberInput = element(by.id('field_number'));
    smsInput = element(by.id('field_sms'));
    contactSelect = element(by.id('field_contact'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNumberInput(number) {
        await this.numberInput.sendKeys(number);
    }

    async getNumberInput() {
        return this.numberInput.getAttribute('value');
    }

    getSmsInput() {
        return this.smsInput;
    }

    async contactSelectLastOption() {
        await this.contactSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async contactSelectOption(option) {
        await this.contactSelect.sendKeys(option);
    }

    getContactSelect(): ElementFinder {
        return this.contactSelect;
    }

    async getContactSelectedOption() {
        return this.contactSelect.element(by.css('option:checked')).getText();
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

export class ContactPhoneDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-contactPhone-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-contactPhone'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

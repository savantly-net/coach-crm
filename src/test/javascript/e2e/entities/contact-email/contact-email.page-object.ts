import { element, by, ElementFinder } from 'protractor';

export class ContactEmailComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-contact-email div table .btn-danger'));
    title = element.all(by.css('jhi-contact-email div h2#page-heading span')).first();

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

export class ContactEmailUpdatePage {
    pageTitle = element(by.id('jhi-contact-email-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    addressInput = element(by.id('field_address'));
    confirmedInput = element(by.id('field_confirmed'));
    primaryInput = element(by.id('field_primary'));
    contactSelect = element(by.id('field_contact'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setAddressInput(address) {
        await this.addressInput.sendKeys(address);
    }

    async getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    getConfirmedInput() {
        return this.confirmedInput;
    }
    getPrimaryInput() {
        return this.primaryInput;
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

export class ContactEmailDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-contactEmail-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-contactEmail'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

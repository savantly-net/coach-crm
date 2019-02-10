import { element, by, ElementFinder } from 'protractor';

export class SiteComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-site div table .btn-danger'));
    title = element.all(by.css('jhi-site div h2#page-heading span')).first();

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

export class SiteUpdatePage {
    pageTitle = element(by.id('jhi-site-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    phoneNumberInput = element(by.id('field_phoneNumber'));
    altPhoneNumberInput = element(by.id('field_altPhoneNumber'));
    faxInput = element(by.id('field_fax'));
    websiteInput = element(by.id('field_website'));
    industryInput = element(by.id('field_industry'));
    primaryContactSelect = element(by.id('field_primaryContact'));
    otherContactsSelect = element(by.id('field_otherContacts'));
    addressSelect = element(by.id('field_address'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setPhoneNumberInput(phoneNumber) {
        await this.phoneNumberInput.sendKeys(phoneNumber);
    }

    async getPhoneNumberInput() {
        return this.phoneNumberInput.getAttribute('value');
    }

    async setAltPhoneNumberInput(altPhoneNumber) {
        await this.altPhoneNumberInput.sendKeys(altPhoneNumber);
    }

    async getAltPhoneNumberInput() {
        return this.altPhoneNumberInput.getAttribute('value');
    }

    async setFaxInput(fax) {
        await this.faxInput.sendKeys(fax);
    }

    async getFaxInput() {
        return this.faxInput.getAttribute('value');
    }

    async setWebsiteInput(website) {
        await this.websiteInput.sendKeys(website);
    }

    async getWebsiteInput() {
        return this.websiteInput.getAttribute('value');
    }

    async setIndustryInput(industry) {
        await this.industryInput.sendKeys(industry);
    }

    async getIndustryInput() {
        return this.industryInput.getAttribute('value');
    }

    async primaryContactSelectLastOption() {
        await this.primaryContactSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async primaryContactSelectOption(option) {
        await this.primaryContactSelect.sendKeys(option);
    }

    getPrimaryContactSelect(): ElementFinder {
        return this.primaryContactSelect;
    }

    async getPrimaryContactSelectedOption() {
        return this.primaryContactSelect.element(by.css('option:checked')).getText();
    }

    async otherContactsSelectLastOption() {
        await this.otherContactsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async otherContactsSelectOption(option) {
        await this.otherContactsSelect.sendKeys(option);
    }

    getOtherContactsSelect(): ElementFinder {
        return this.otherContactsSelect;
    }

    async getOtherContactsSelectedOption() {
        return this.otherContactsSelect.element(by.css('option:checked')).getText();
    }

    async addressSelectLastOption() {
        await this.addressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async addressSelectOption(option) {
        await this.addressSelect.sendKeys(option);
    }

    getAddressSelect(): ElementFinder {
        return this.addressSelect;
    }

    async getAddressSelectedOption() {
        return this.addressSelect.element(by.css('option:checked')).getText();
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

export class SiteDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-site-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-site'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

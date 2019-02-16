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
    emailAddressInput = element(by.id('field_emailAddress'));
    phoneNumberInput = element(by.id('field_phoneNumber'));
    altPhoneNumberInput = element(by.id('field_altPhoneNumber'));
    faxInput = element(by.id('field_fax'));
    websiteInput = element(by.id('field_website'));
    industryInput = element(by.id('field_industry'));
    streetInput = element(by.id('field_street'));
    cityInput = element(by.id('field_city'));
    stateInput = element(by.id('field_state'));
    zipcodeInput = element(by.id('field_zipcode'));
    countryInput = element(by.id('field_country'));
    primaryContactSelect = element(by.id('field_primaryContact'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setEmailAddressInput(emailAddress) {
        await this.emailAddressInput.sendKeys(emailAddress);
    }

    async getEmailAddressInput() {
        return this.emailAddressInput.getAttribute('value');
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

    async setStreetInput(street) {
        await this.streetInput.sendKeys(street);
    }

    async getStreetInput() {
        return this.streetInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setStateInput(state) {
        await this.stateInput.sendKeys(state);
    }

    async getStateInput() {
        return this.stateInput.getAttribute('value');
    }

    async setZipcodeInput(zipcode) {
        await this.zipcodeInput.sendKeys(zipcode);
    }

    async getZipcodeInput() {
        return this.zipcodeInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
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

import { element, by, ElementFinder } from 'protractor';

export class ContactComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-contact div table .btn-danger'));
    title = element.all(by.css('jhi-contact div h2#page-heading span')).first();

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

export class ContactUpdatePage {
    pageTitle = element(by.id('jhi-contact-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    phoneNumberInput = element(by.id('field_phoneNumber'));
    emailAddressInput = element(by.id('field_emailAddress'));
    dobInput = element(by.id('field_dob'));
    statusSelect = element(by.id('field_status'));
    companyNameInput = element(by.id('field_companyName'));
    jobRoleInput = element(by.id('field_jobRole'));
    positionInput = element(by.id('field_position'));
    linkedInInput = element(by.id('field_linkedIn'));
    faxInput = element(by.id('field_fax'));
    departmentInput = element(by.id('field_department'));
    streetInput = element(by.id('field_street'));
    cityInput = element(by.id('field_city'));
    stateInput = element(by.id('field_state'));
    zipcodeInput = element(by.id('field_zipcode'));
    countryInput = element(by.id('field_country'));
    siteSelect = element(by.id('field_site'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setPhoneNumberInput(phoneNumber) {
        await this.phoneNumberInput.sendKeys(phoneNumber);
    }

    async getPhoneNumberInput() {
        return this.phoneNumberInput.getAttribute('value');
    }

    async setEmailAddressInput(emailAddress) {
        await this.emailAddressInput.sendKeys(emailAddress);
    }

    async getEmailAddressInput() {
        return this.emailAddressInput.getAttribute('value');
    }

    async setDobInput(dob) {
        await this.dobInput.sendKeys(dob);
    }

    async getDobInput() {
        return this.dobInput.getAttribute('value');
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

    async setCompanyNameInput(companyName) {
        await this.companyNameInput.sendKeys(companyName);
    }

    async getCompanyNameInput() {
        return this.companyNameInput.getAttribute('value');
    }

    async setJobRoleInput(jobRole) {
        await this.jobRoleInput.sendKeys(jobRole);
    }

    async getJobRoleInput() {
        return this.jobRoleInput.getAttribute('value');
    }

    async setPositionInput(position) {
        await this.positionInput.sendKeys(position);
    }

    async getPositionInput() {
        return this.positionInput.getAttribute('value');
    }

    async setLinkedInInput(linkedIn) {
        await this.linkedInInput.sendKeys(linkedIn);
    }

    async getLinkedInInput() {
        return this.linkedInInput.getAttribute('value');
    }

    async setFaxInput(fax) {
        await this.faxInput.sendKeys(fax);
    }

    async getFaxInput() {
        return this.faxInput.getAttribute('value');
    }

    async setDepartmentInput(department) {
        await this.departmentInput.sendKeys(department);
    }

    async getDepartmentInput() {
        return this.departmentInput.getAttribute('value');
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

    async siteSelectLastOption() {
        await this.siteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async siteSelectOption(option) {
        await this.siteSelect.sendKeys(option);
    }

    getSiteSelect(): ElementFinder {
        return this.siteSelect;
    }

    async getSiteSelectedOption() {
        return this.siteSelect.element(by.css('option:checked')).getText();
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

export class ContactDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-contact-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-contact'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

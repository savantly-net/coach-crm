/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactComponentsPage, ContactDeleteDialog, ContactUpdatePage } from './contact.page-object';

const expect = chai.expect;

describe('Contact e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let contactUpdatePage: ContactUpdatePage;
    let contactComponentsPage: ContactComponentsPage;
    let contactDeleteDialog: ContactDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Contacts', async () => {
        await navBarPage.goToEntity('contact');
        contactComponentsPage = new ContactComponentsPage();
        await browser.wait(ec.visibilityOf(contactComponentsPage.title), 5000);
        expect(await contactComponentsPage.getTitle()).to.eq('coachApp.contact.home.title');
    });

    it('should load create Contact page', async () => {
        await contactComponentsPage.clickOnCreateButton();
        contactUpdatePage = new ContactUpdatePage();
        expect(await contactUpdatePage.getPageTitle()).to.eq('coachApp.contact.home.createOrEditLabel');
        await contactUpdatePage.cancel();
    });

    it('should create and save Contacts', async () => {
        const nbButtonsBeforeCreate = await contactComponentsPage.countDeleteButtons();

        await contactComponentsPage.clickOnCreateButton();
        await promise.all([
            contactUpdatePage.setFirstNameInput('firstName'),
            contactUpdatePage.setLastNameInput('lastName'),
            contactUpdatePage.setPhoneNumberInput('phoneNumber'),
            contactUpdatePage.setEmailAddressInput('emailAddress'),
            contactUpdatePage.setDobInput('2000-12-31'),
            contactUpdatePage.statusSelectLastOption(),
            contactUpdatePage.setCompanyNameInput('companyName'),
            contactUpdatePage.setJobRoleInput('jobRole'),
            contactUpdatePage.setPositionInput('position'),
            contactUpdatePage.setLinkedInInput('linkedIn'),
            contactUpdatePage.setFaxInput('fax'),
            contactUpdatePage.setDepartmentInput('department'),
            contactUpdatePage.setStreetInput('street'),
            contactUpdatePage.setCityInput('city'),
            contactUpdatePage.setStateInput('state'),
            contactUpdatePage.setZipcodeInput('zipcode'),
            contactUpdatePage.setCountryInput('country'),
            contactUpdatePage.siteSelectLastOption()
        ]);
        expect(await contactUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await contactUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await contactUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber');
        expect(await contactUpdatePage.getEmailAddressInput()).to.eq('emailAddress');
        expect(await contactUpdatePage.getDobInput()).to.eq('2000-12-31');
        expect(await contactUpdatePage.getCompanyNameInput()).to.eq('companyName');
        expect(await contactUpdatePage.getJobRoleInput()).to.eq('jobRole');
        expect(await contactUpdatePage.getPositionInput()).to.eq('position');
        expect(await contactUpdatePage.getLinkedInInput()).to.eq('linkedIn');
        expect(await contactUpdatePage.getFaxInput()).to.eq('fax');
        expect(await contactUpdatePage.getDepartmentInput()).to.eq('department');
        expect(await contactUpdatePage.getStreetInput()).to.eq('street');
        expect(await contactUpdatePage.getCityInput()).to.eq('city');
        expect(await contactUpdatePage.getStateInput()).to.eq('state');
        expect(await contactUpdatePage.getZipcodeInput()).to.eq('zipcode');
        expect(await contactUpdatePage.getCountryInput()).to.eq('country');
        await contactUpdatePage.save();
        expect(await contactUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Contact', async () => {
        const nbButtonsBeforeDelete = await contactComponentsPage.countDeleteButtons();
        await contactComponentsPage.clickOnLastDeleteButton();

        contactDeleteDialog = new ContactDeleteDialog();
        expect(await contactDeleteDialog.getDialogTitle()).to.eq('coachApp.contact.delete.question');
        await contactDeleteDialog.clickOnConfirmButton();

        expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

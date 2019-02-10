/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactEmailComponentsPage, ContactEmailDeleteDialog, ContactEmailUpdatePage } from './contact-email.page-object';

const expect = chai.expect;

describe('ContactEmail e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let contactEmailUpdatePage: ContactEmailUpdatePage;
    let contactEmailComponentsPage: ContactEmailComponentsPage;
    let contactEmailDeleteDialog: ContactEmailDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ContactEmails', async () => {
        await navBarPage.goToEntity('contact-email');
        contactEmailComponentsPage = new ContactEmailComponentsPage();
        await browser.wait(ec.visibilityOf(contactEmailComponentsPage.title), 5000);
        expect(await contactEmailComponentsPage.getTitle()).to.eq('coachApp.contactEmail.home.title');
    });

    it('should load create ContactEmail page', async () => {
        await contactEmailComponentsPage.clickOnCreateButton();
        contactEmailUpdatePage = new ContactEmailUpdatePage();
        expect(await contactEmailUpdatePage.getPageTitle()).to.eq('coachApp.contactEmail.home.createOrEditLabel');
        await contactEmailUpdatePage.cancel();
    });

    it('should create and save ContactEmails', async () => {
        const nbButtonsBeforeCreate = await contactEmailComponentsPage.countDeleteButtons();

        await contactEmailComponentsPage.clickOnCreateButton();
        await promise.all([contactEmailUpdatePage.setAddressInput('address'), contactEmailUpdatePage.contactSelectLastOption()]);
        expect(await contactEmailUpdatePage.getAddressInput()).to.eq('address');
        const selectedConfirmed = contactEmailUpdatePage.getConfirmedInput();
        if (await selectedConfirmed.isSelected()) {
            await contactEmailUpdatePage.getConfirmedInput().click();
            expect(await contactEmailUpdatePage.getConfirmedInput().isSelected()).to.be.false;
        } else {
            await contactEmailUpdatePage.getConfirmedInput().click();
            expect(await contactEmailUpdatePage.getConfirmedInput().isSelected()).to.be.true;
        }
        const selectedPrimary = contactEmailUpdatePage.getPrimaryInput();
        if (await selectedPrimary.isSelected()) {
            await contactEmailUpdatePage.getPrimaryInput().click();
            expect(await contactEmailUpdatePage.getPrimaryInput().isSelected()).to.be.false;
        } else {
            await contactEmailUpdatePage.getPrimaryInput().click();
            expect(await contactEmailUpdatePage.getPrimaryInput().isSelected()).to.be.true;
        }
        await contactEmailUpdatePage.save();
        expect(await contactEmailUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await contactEmailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ContactEmail', async () => {
        const nbButtonsBeforeDelete = await contactEmailComponentsPage.countDeleteButtons();
        await contactEmailComponentsPage.clickOnLastDeleteButton();

        contactEmailDeleteDialog = new ContactEmailDeleteDialog();
        expect(await contactEmailDeleteDialog.getDialogTitle()).to.eq('coachApp.contactEmail.delete.question');
        await contactEmailDeleteDialog.clickOnConfirmButton();

        expect(await contactEmailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactPhoneComponentsPage, ContactPhoneDeleteDialog, ContactPhoneUpdatePage } from './contact-phone.page-object';

const expect = chai.expect;

describe('ContactPhone e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let contactPhoneUpdatePage: ContactPhoneUpdatePage;
    let contactPhoneComponentsPage: ContactPhoneComponentsPage;
    let contactPhoneDeleteDialog: ContactPhoneDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ContactPhones', async () => {
        await navBarPage.goToEntity('contact-phone');
        contactPhoneComponentsPage = new ContactPhoneComponentsPage();
        await browser.wait(ec.visibilityOf(contactPhoneComponentsPage.title), 5000);
        expect(await contactPhoneComponentsPage.getTitle()).to.eq('coachApp.contactPhone.home.title');
    });

    it('should load create ContactPhone page', async () => {
        await contactPhoneComponentsPage.clickOnCreateButton();
        contactPhoneUpdatePage = new ContactPhoneUpdatePage();
        expect(await contactPhoneUpdatePage.getPageTitle()).to.eq('coachApp.contactPhone.home.createOrEditLabel');
        await contactPhoneUpdatePage.cancel();
    });

    it('should create and save ContactPhones', async () => {
        const nbButtonsBeforeCreate = await contactPhoneComponentsPage.countDeleteButtons();

        await contactPhoneComponentsPage.clickOnCreateButton();
        await promise.all([contactPhoneUpdatePage.setNumberInput('number'), contactPhoneUpdatePage.contactSelectLastOption()]);
        expect(await contactPhoneUpdatePage.getNumberInput()).to.eq('number');
        const selectedSms = contactPhoneUpdatePage.getSmsInput();
        if (await selectedSms.isSelected()) {
            await contactPhoneUpdatePage.getSmsInput().click();
            expect(await contactPhoneUpdatePage.getSmsInput().isSelected()).to.be.false;
        } else {
            await contactPhoneUpdatePage.getSmsInput().click();
            expect(await contactPhoneUpdatePage.getSmsInput().isSelected()).to.be.true;
        }
        await contactPhoneUpdatePage.save();
        expect(await contactPhoneUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await contactPhoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ContactPhone', async () => {
        const nbButtonsBeforeDelete = await contactPhoneComponentsPage.countDeleteButtons();
        await contactPhoneComponentsPage.clickOnLastDeleteButton();

        contactPhoneDeleteDialog = new ContactPhoneDeleteDialog();
        expect(await contactPhoneDeleteDialog.getDialogTitle()).to.eq('coachApp.contactPhone.delete.question');
        await contactPhoneDeleteDialog.clickOnConfirmButton();

        expect(await contactPhoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

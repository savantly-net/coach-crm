/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SiteComponentsPage, SiteDeleteDialog, SiteUpdatePage } from './site.page-object';

const expect = chai.expect;

describe('Site e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let siteUpdatePage: SiteUpdatePage;
    let siteComponentsPage: SiteComponentsPage;
    let siteDeleteDialog: SiteDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Sites', async () => {
        await navBarPage.goToEntity('site');
        siteComponentsPage = new SiteComponentsPage();
        await browser.wait(ec.visibilityOf(siteComponentsPage.title), 5000);
        expect(await siteComponentsPage.getTitle()).to.eq('coachApp.site.home.title');
    });

    it('should load create Site page', async () => {
        await siteComponentsPage.clickOnCreateButton();
        siteUpdatePage = new SiteUpdatePage();
        expect(await siteUpdatePage.getPageTitle()).to.eq('coachApp.site.home.createOrEditLabel');
        await siteUpdatePage.cancel();
    });

    it('should create and save Sites', async () => {
        const nbButtonsBeforeCreate = await siteComponentsPage.countDeleteButtons();

        await siteComponentsPage.clickOnCreateButton();
        await promise.all([
            siteUpdatePage.setNameInput('name'),
            siteUpdatePage.setPhoneNumberInput('phoneNumber'),
            siteUpdatePage.setAltPhoneNumberInput('altPhoneNumber'),
            siteUpdatePage.setFaxInput('fax'),
            siteUpdatePage.setWebsiteInput('website'),
            siteUpdatePage.setIndustryInput('industry'),
            siteUpdatePage.primaryContactSelectLastOption(),
            siteUpdatePage.otherContactsSelectLastOption(),
            siteUpdatePage.addressSelectLastOption()
        ]);
        expect(await siteUpdatePage.getNameInput()).to.eq('name');
        expect(await siteUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber');
        expect(await siteUpdatePage.getAltPhoneNumberInput()).to.eq('altPhoneNumber');
        expect(await siteUpdatePage.getFaxInput()).to.eq('fax');
        expect(await siteUpdatePage.getWebsiteInput()).to.eq('website');
        expect(await siteUpdatePage.getIndustryInput()).to.eq('industry');
        await siteUpdatePage.save();
        expect(await siteUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await siteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Site', async () => {
        const nbButtonsBeforeDelete = await siteComponentsPage.countDeleteButtons();
        await siteComponentsPage.clickOnLastDeleteButton();

        siteDeleteDialog = new SiteDeleteDialog();
        expect(await siteDeleteDialog.getDialogTitle()).to.eq('coachApp.site.delete.question');
        await siteDeleteDialog.clickOnConfirmButton();

        expect(await siteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

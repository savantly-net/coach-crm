/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FieldServiceTypeComponentsPage, FieldServiceTypeDeleteDialog, FieldServiceTypeUpdatePage } from './field-service-type.page-object';

const expect = chai.expect;

describe('FieldServiceType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldServiceTypeUpdatePage: FieldServiceTypeUpdatePage;
    let fieldServiceTypeComponentsPage: FieldServiceTypeComponentsPage;
    let fieldServiceTypeDeleteDialog: FieldServiceTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldServiceTypes', async () => {
        await navBarPage.goToEntity('field-service-type');
        fieldServiceTypeComponentsPage = new FieldServiceTypeComponentsPage();
        await browser.wait(ec.visibilityOf(fieldServiceTypeComponentsPage.title), 5000);
        expect(await fieldServiceTypeComponentsPage.getTitle()).to.eq('coachApp.fieldServiceType.home.title');
    });

    it('should load create FieldServiceType page', async () => {
        await fieldServiceTypeComponentsPage.clickOnCreateButton();
        fieldServiceTypeUpdatePage = new FieldServiceTypeUpdatePage();
        expect(await fieldServiceTypeUpdatePage.getPageTitle()).to.eq('coachApp.fieldServiceType.home.createOrEditLabel');
        await fieldServiceTypeUpdatePage.cancel();
    });

    it('should create and save FieldServiceTypes', async () => {
        const nbButtonsBeforeCreate = await fieldServiceTypeComponentsPage.countDeleteButtons();

        await fieldServiceTypeComponentsPage.clickOnCreateButton();
        await promise.all([fieldServiceTypeUpdatePage.setNameInput('name'), fieldServiceTypeUpdatePage.setDescriptionInput('description')]);
        expect(await fieldServiceTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await fieldServiceTypeUpdatePage.getDescriptionInput()).to.eq('description');
        await fieldServiceTypeUpdatePage.save();
        expect(await fieldServiceTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldServiceTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldServiceType', async () => {
        const nbButtonsBeforeDelete = await fieldServiceTypeComponentsPage.countDeleteButtons();
        await fieldServiceTypeComponentsPage.clickOnLastDeleteButton();

        fieldServiceTypeDeleteDialog = new FieldServiceTypeDeleteDialog();
        expect(await fieldServiceTypeDeleteDialog.getDialogTitle()).to.eq('coachApp.fieldServiceType.delete.question');
        await fieldServiceTypeDeleteDialog.clickOnConfirmButton();

        expect(await fieldServiceTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

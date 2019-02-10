/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    FieldServiceRequestComponentsPage,
    FieldServiceRequestDeleteDialog,
    FieldServiceRequestUpdatePage
} from './field-service-request.page-object';

const expect = chai.expect;

describe('FieldServiceRequest e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldServiceRequestUpdatePage: FieldServiceRequestUpdatePage;
    let fieldServiceRequestComponentsPage: FieldServiceRequestComponentsPage;
    let fieldServiceRequestDeleteDialog: FieldServiceRequestDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldServiceRequests', async () => {
        await navBarPage.goToEntity('field-service-request');
        fieldServiceRequestComponentsPage = new FieldServiceRequestComponentsPage();
        await browser.wait(ec.visibilityOf(fieldServiceRequestComponentsPage.title), 5000);
        expect(await fieldServiceRequestComponentsPage.getTitle()).to.eq('coachApp.fieldServiceRequest.home.title');
    });

    it('should load create FieldServiceRequest page', async () => {
        await fieldServiceRequestComponentsPage.clickOnCreateButton();
        fieldServiceRequestUpdatePage = new FieldServiceRequestUpdatePage();
        expect(await fieldServiceRequestUpdatePage.getPageTitle()).to.eq('coachApp.fieldServiceRequest.home.createOrEditLabel');
        await fieldServiceRequestUpdatePage.cancel();
    });

    it('should create and save FieldServiceRequests', async () => {
        const nbButtonsBeforeCreate = await fieldServiceRequestComponentsPage.countDeleteButtons();

        await fieldServiceRequestComponentsPage.clickOnCreateButton();
        await promise.all([
            fieldServiceRequestUpdatePage.statusSelectLastOption(),
            fieldServiceRequestUpdatePage.setContractDateInput('2000-12-31'),
            fieldServiceRequestUpdatePage.setStartDateInput('2000-12-31'),
            fieldServiceRequestUpdatePage.setFinishDateInput('2000-12-31'),
            fieldServiceRequestUpdatePage.setDescriptionInput('description'),
            fieldServiceRequestUpdatePage.setTotalInput('5'),
            fieldServiceRequestUpdatePage.requestorSelectLastOption(),
            fieldServiceRequestUpdatePage.fieldServiceTypeSelectLastOption()
        ]);
        expect(await fieldServiceRequestUpdatePage.getContractDateInput()).to.eq('2000-12-31');
        expect(await fieldServiceRequestUpdatePage.getStartDateInput()).to.eq('2000-12-31');
        expect(await fieldServiceRequestUpdatePage.getFinishDateInput()).to.eq('2000-12-31');
        expect(await fieldServiceRequestUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await fieldServiceRequestUpdatePage.getTotalInput()).to.eq('5');
        await fieldServiceRequestUpdatePage.save();
        expect(await fieldServiceRequestUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldServiceRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldServiceRequest', async () => {
        const nbButtonsBeforeDelete = await fieldServiceRequestComponentsPage.countDeleteButtons();
        await fieldServiceRequestComponentsPage.clickOnLastDeleteButton();

        fieldServiceRequestDeleteDialog = new FieldServiceRequestDeleteDialog();
        expect(await fieldServiceRequestDeleteDialog.getDialogTitle()).to.eq('coachApp.fieldServiceRequest.delete.question');
        await fieldServiceRequestDeleteDialog.clickOnConfirmButton();

        expect(await fieldServiceRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

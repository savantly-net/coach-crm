/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UploadComponentsPage, UploadDeleteDialog, UploadUpdatePage } from './upload.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Upload e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let uploadUpdatePage: UploadUpdatePage;
    let uploadComponentsPage: UploadComponentsPage;
    let uploadDeleteDialog: UploadDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Uploads', async () => {
        await navBarPage.goToEntity('upload');
        uploadComponentsPage = new UploadComponentsPage();
        await browser.wait(ec.visibilityOf(uploadComponentsPage.title), 5000);
        expect(await uploadComponentsPage.getTitle()).to.eq('coachApp.upload.home.title');
    });

    it('should load create Upload page', async () => {
        await uploadComponentsPage.clickOnCreateButton();
        uploadUpdatePage = new UploadUpdatePage();
        expect(await uploadUpdatePage.getPageTitle()).to.eq('coachApp.upload.home.createOrEditLabel');
        await uploadUpdatePage.cancel();
    });

    it('should create and save Uploads', async () => {
        const nbButtonsBeforeCreate = await uploadComponentsPage.countDeleteButtons();

        await uploadComponentsPage.clickOnCreateButton();
        await promise.all([
            uploadUpdatePage.setNameInput('name'),
            uploadUpdatePage.setDescriptionInput('description'),
            uploadUpdatePage.setFileInput(absolutePath),
            uploadUpdatePage.fieldServiceRequestSelectLastOption()
        ]);
        expect(await uploadUpdatePage.getNameInput()).to.eq('name');
        expect(await uploadUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await uploadUpdatePage.getFileInput()).to.endsWith(fileNameToUpload);
        await uploadUpdatePage.save();
        expect(await uploadUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await uploadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Upload', async () => {
        const nbButtonsBeforeDelete = await uploadComponentsPage.countDeleteButtons();
        await uploadComponentsPage.clickOnLastDeleteButton();

        uploadDeleteDialog = new UploadDeleteDialog();
        expect(await uploadDeleteDialog.getDialogTitle()).to.eq('coachApp.upload.delete.question');
        await uploadDeleteDialog.clickOnConfirmButton();

        expect(await uploadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

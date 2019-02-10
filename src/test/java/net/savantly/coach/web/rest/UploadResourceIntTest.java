package net.savantly.coach.web.rest;

import net.savantly.coach.CoachApp;

import net.savantly.coach.domain.Upload;
import net.savantly.coach.repository.UploadRepository;
import net.savantly.coach.repository.search.UploadSearchRepository;
import net.savantly.coach.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static net.savantly.coach.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UploadResource REST controller.
 *
 * @see UploadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CoachApp.class)
public class UploadResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FILE_CONTENT_TYPE = "image/png";

    @Autowired
    private UploadRepository uploadRepository;

    /**
     * This repository is mocked in the net.savantly.coach.repository.search test package.
     *
     * @see net.savantly.coach.repository.search.UploadSearchRepositoryMockConfiguration
     */
    @Autowired
    private UploadSearchRepository mockUploadSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUploadMockMvc;

    private Upload upload;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UploadResource uploadResource = new UploadResource(uploadRepository, mockUploadSearchRepository);
        this.restUploadMockMvc = MockMvcBuilders.standaloneSetup(uploadResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Upload createEntity(EntityManager em) {
        Upload upload = new Upload()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .file(DEFAULT_FILE)
            .fileContentType(DEFAULT_FILE_CONTENT_TYPE);
        return upload;
    }

    @Before
    public void initTest() {
        upload = createEntity(em);
    }

    @Test
    @Transactional
    public void createUpload() throws Exception {
        int databaseSizeBeforeCreate = uploadRepository.findAll().size();

        // Create the Upload
        restUploadMockMvc.perform(post("/api/uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(upload)))
            .andExpect(status().isCreated());

        // Validate the Upload in the database
        List<Upload> uploadList = uploadRepository.findAll();
        assertThat(uploadList).hasSize(databaseSizeBeforeCreate + 1);
        Upload testUpload = uploadList.get(uploadList.size() - 1);
        assertThat(testUpload.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUpload.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUpload.getFile()).isEqualTo(DEFAULT_FILE);
        assertThat(testUpload.getFileContentType()).isEqualTo(DEFAULT_FILE_CONTENT_TYPE);

        // Validate the Upload in Elasticsearch
        verify(mockUploadSearchRepository, times(1)).save(testUpload);
    }

    @Test
    @Transactional
    public void createUploadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uploadRepository.findAll().size();

        // Create the Upload with an existing ID
        upload.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUploadMockMvc.perform(post("/api/uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(upload)))
            .andExpect(status().isBadRequest());

        // Validate the Upload in the database
        List<Upload> uploadList = uploadRepository.findAll();
        assertThat(uploadList).hasSize(databaseSizeBeforeCreate);

        // Validate the Upload in Elasticsearch
        verify(mockUploadSearchRepository, times(0)).save(upload);
    }

    @Test
    @Transactional
    public void getAllUploads() throws Exception {
        // Initialize the database
        uploadRepository.saveAndFlush(upload);

        // Get all the uploadList
        restUploadMockMvc.perform(get("/api/uploads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(upload.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].fileContentType").value(hasItem(DEFAULT_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].file").value(hasItem(Base64Utils.encodeToString(DEFAULT_FILE))));
    }
    
    @Test
    @Transactional
    public void getUpload() throws Exception {
        // Initialize the database
        uploadRepository.saveAndFlush(upload);

        // Get the upload
        restUploadMockMvc.perform(get("/api/uploads/{id}", upload.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(upload.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.fileContentType").value(DEFAULT_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.file").value(Base64Utils.encodeToString(DEFAULT_FILE)));
    }

    @Test
    @Transactional
    public void getNonExistingUpload() throws Exception {
        // Get the upload
        restUploadMockMvc.perform(get("/api/uploads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUpload() throws Exception {
        // Initialize the database
        uploadRepository.saveAndFlush(upload);

        int databaseSizeBeforeUpdate = uploadRepository.findAll().size();

        // Update the upload
        Upload updatedUpload = uploadRepository.findById(upload.getId()).get();
        // Disconnect from session so that the updates on updatedUpload are not directly saved in db
        em.detach(updatedUpload);
        updatedUpload
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .file(UPDATED_FILE)
            .fileContentType(UPDATED_FILE_CONTENT_TYPE);

        restUploadMockMvc.perform(put("/api/uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUpload)))
            .andExpect(status().isOk());

        // Validate the Upload in the database
        List<Upload> uploadList = uploadRepository.findAll();
        assertThat(uploadList).hasSize(databaseSizeBeforeUpdate);
        Upload testUpload = uploadList.get(uploadList.size() - 1);
        assertThat(testUpload.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUpload.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUpload.getFile()).isEqualTo(UPDATED_FILE);
        assertThat(testUpload.getFileContentType()).isEqualTo(UPDATED_FILE_CONTENT_TYPE);

        // Validate the Upload in Elasticsearch
        verify(mockUploadSearchRepository, times(1)).save(testUpload);
    }

    @Test
    @Transactional
    public void updateNonExistingUpload() throws Exception {
        int databaseSizeBeforeUpdate = uploadRepository.findAll().size();

        // Create the Upload

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUploadMockMvc.perform(put("/api/uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(upload)))
            .andExpect(status().isBadRequest());

        // Validate the Upload in the database
        List<Upload> uploadList = uploadRepository.findAll();
        assertThat(uploadList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Upload in Elasticsearch
        verify(mockUploadSearchRepository, times(0)).save(upload);
    }

    @Test
    @Transactional
    public void deleteUpload() throws Exception {
        // Initialize the database
        uploadRepository.saveAndFlush(upload);

        int databaseSizeBeforeDelete = uploadRepository.findAll().size();

        // Delete the upload
        restUploadMockMvc.perform(delete("/api/uploads/{id}", upload.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Upload> uploadList = uploadRepository.findAll();
        assertThat(uploadList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Upload in Elasticsearch
        verify(mockUploadSearchRepository, times(1)).deleteById(upload.getId());
    }

    @Test
    @Transactional
    public void searchUpload() throws Exception {
        // Initialize the database
        uploadRepository.saveAndFlush(upload);
        when(mockUploadSearchRepository.search(queryStringQuery("id:" + upload.getId())))
            .thenReturn(Collections.singletonList(upload));
        // Search the upload
        restUploadMockMvc.perform(get("/api/_search/uploads?query=id:" + upload.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(upload.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].fileContentType").value(hasItem(DEFAULT_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].file").value(hasItem(Base64Utils.encodeToString(DEFAULT_FILE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Upload.class);
        Upload upload1 = new Upload();
        upload1.setId(1L);
        Upload upload2 = new Upload();
        upload2.setId(upload1.getId());
        assertThat(upload1).isEqualTo(upload2);
        upload2.setId(2L);
        assertThat(upload1).isNotEqualTo(upload2);
        upload1.setId(null);
        assertThat(upload1).isNotEqualTo(upload2);
    }
}

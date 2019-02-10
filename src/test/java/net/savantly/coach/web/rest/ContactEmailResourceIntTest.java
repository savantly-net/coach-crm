package net.savantly.coach.web.rest;

import net.savantly.coach.CoachApp;

import net.savantly.coach.domain.ContactEmail;
import net.savantly.coach.repository.ContactEmailRepository;
import net.savantly.coach.repository.search.ContactEmailSearchRepository;
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
 * Test class for the ContactEmailResource REST controller.
 *
 * @see ContactEmailResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CoachApp.class)
public class ContactEmailResourceIntTest {

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CONFIRMED = false;
    private static final Boolean UPDATED_CONFIRMED = true;

    private static final Boolean DEFAULT_PRIMARY = false;
    private static final Boolean UPDATED_PRIMARY = true;

    @Autowired
    private ContactEmailRepository contactEmailRepository;

    /**
     * This repository is mocked in the net.savantly.coach.repository.search test package.
     *
     * @see net.savantly.coach.repository.search.ContactEmailSearchRepositoryMockConfiguration
     */
    @Autowired
    private ContactEmailSearchRepository mockContactEmailSearchRepository;

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

    private MockMvc restContactEmailMockMvc;

    private ContactEmail contactEmail;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactEmailResource contactEmailResource = new ContactEmailResource(contactEmailRepository, mockContactEmailSearchRepository);
        this.restContactEmailMockMvc = MockMvcBuilders.standaloneSetup(contactEmailResource)
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
    public static ContactEmail createEntity(EntityManager em) {
        ContactEmail contactEmail = new ContactEmail()
            .address(DEFAULT_ADDRESS)
            .confirmed(DEFAULT_CONFIRMED)
            .primary(DEFAULT_PRIMARY);
        return contactEmail;
    }

    @Before
    public void initTest() {
        contactEmail = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactEmail() throws Exception {
        int databaseSizeBeforeCreate = contactEmailRepository.findAll().size();

        // Create the ContactEmail
        restContactEmailMockMvc.perform(post("/api/contact-emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactEmail)))
            .andExpect(status().isCreated());

        // Validate the ContactEmail in the database
        List<ContactEmail> contactEmailList = contactEmailRepository.findAll();
        assertThat(contactEmailList).hasSize(databaseSizeBeforeCreate + 1);
        ContactEmail testContactEmail = contactEmailList.get(contactEmailList.size() - 1);
        assertThat(testContactEmail.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testContactEmail.isConfirmed()).isEqualTo(DEFAULT_CONFIRMED);
        assertThat(testContactEmail.isPrimary()).isEqualTo(DEFAULT_PRIMARY);

        // Validate the ContactEmail in Elasticsearch
        verify(mockContactEmailSearchRepository, times(1)).save(testContactEmail);
    }

    @Test
    @Transactional
    public void createContactEmailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactEmailRepository.findAll().size();

        // Create the ContactEmail with an existing ID
        contactEmail.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactEmailMockMvc.perform(post("/api/contact-emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactEmail)))
            .andExpect(status().isBadRequest());

        // Validate the ContactEmail in the database
        List<ContactEmail> contactEmailList = contactEmailRepository.findAll();
        assertThat(contactEmailList).hasSize(databaseSizeBeforeCreate);

        // Validate the ContactEmail in Elasticsearch
        verify(mockContactEmailSearchRepository, times(0)).save(contactEmail);
    }

    @Test
    @Transactional
    public void getAllContactEmails() throws Exception {
        // Initialize the database
        contactEmailRepository.saveAndFlush(contactEmail);

        // Get all the contactEmailList
        restContactEmailMockMvc.perform(get("/api/contact-emails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactEmail.getId().intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].confirmed").value(hasItem(DEFAULT_CONFIRMED.booleanValue())))
            .andExpect(jsonPath("$.[*].primary").value(hasItem(DEFAULT_PRIMARY.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getContactEmail() throws Exception {
        // Initialize the database
        contactEmailRepository.saveAndFlush(contactEmail);

        // Get the contactEmail
        restContactEmailMockMvc.perform(get("/api/contact-emails/{id}", contactEmail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactEmail.getId().intValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.confirmed").value(DEFAULT_CONFIRMED.booleanValue()))
            .andExpect(jsonPath("$.primary").value(DEFAULT_PRIMARY.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingContactEmail() throws Exception {
        // Get the contactEmail
        restContactEmailMockMvc.perform(get("/api/contact-emails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactEmail() throws Exception {
        // Initialize the database
        contactEmailRepository.saveAndFlush(contactEmail);

        int databaseSizeBeforeUpdate = contactEmailRepository.findAll().size();

        // Update the contactEmail
        ContactEmail updatedContactEmail = contactEmailRepository.findById(contactEmail.getId()).get();
        // Disconnect from session so that the updates on updatedContactEmail are not directly saved in db
        em.detach(updatedContactEmail);
        updatedContactEmail
            .address(UPDATED_ADDRESS)
            .confirmed(UPDATED_CONFIRMED)
            .primary(UPDATED_PRIMARY);

        restContactEmailMockMvc.perform(put("/api/contact-emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactEmail)))
            .andExpect(status().isOk());

        // Validate the ContactEmail in the database
        List<ContactEmail> contactEmailList = contactEmailRepository.findAll();
        assertThat(contactEmailList).hasSize(databaseSizeBeforeUpdate);
        ContactEmail testContactEmail = contactEmailList.get(contactEmailList.size() - 1);
        assertThat(testContactEmail.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testContactEmail.isConfirmed()).isEqualTo(UPDATED_CONFIRMED);
        assertThat(testContactEmail.isPrimary()).isEqualTo(UPDATED_PRIMARY);

        // Validate the ContactEmail in Elasticsearch
        verify(mockContactEmailSearchRepository, times(1)).save(testContactEmail);
    }

    @Test
    @Transactional
    public void updateNonExistingContactEmail() throws Exception {
        int databaseSizeBeforeUpdate = contactEmailRepository.findAll().size();

        // Create the ContactEmail

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactEmailMockMvc.perform(put("/api/contact-emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactEmail)))
            .andExpect(status().isBadRequest());

        // Validate the ContactEmail in the database
        List<ContactEmail> contactEmailList = contactEmailRepository.findAll();
        assertThat(contactEmailList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ContactEmail in Elasticsearch
        verify(mockContactEmailSearchRepository, times(0)).save(contactEmail);
    }

    @Test
    @Transactional
    public void deleteContactEmail() throws Exception {
        // Initialize the database
        contactEmailRepository.saveAndFlush(contactEmail);

        int databaseSizeBeforeDelete = contactEmailRepository.findAll().size();

        // Delete the contactEmail
        restContactEmailMockMvc.perform(delete("/api/contact-emails/{id}", contactEmail.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactEmail> contactEmailList = contactEmailRepository.findAll();
        assertThat(contactEmailList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ContactEmail in Elasticsearch
        verify(mockContactEmailSearchRepository, times(1)).deleteById(contactEmail.getId());
    }

    @Test
    @Transactional
    public void searchContactEmail() throws Exception {
        // Initialize the database
        contactEmailRepository.saveAndFlush(contactEmail);
        when(mockContactEmailSearchRepository.search(queryStringQuery("id:" + contactEmail.getId())))
            .thenReturn(Collections.singletonList(contactEmail));
        // Search the contactEmail
        restContactEmailMockMvc.perform(get("/api/_search/contact-emails?query=id:" + contactEmail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactEmail.getId().intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].confirmed").value(hasItem(DEFAULT_CONFIRMED.booleanValue())))
            .andExpect(jsonPath("$.[*].primary").value(hasItem(DEFAULT_PRIMARY.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactEmail.class);
        ContactEmail contactEmail1 = new ContactEmail();
        contactEmail1.setId(1L);
        ContactEmail contactEmail2 = new ContactEmail();
        contactEmail2.setId(contactEmail1.getId());
        assertThat(contactEmail1).isEqualTo(contactEmail2);
        contactEmail2.setId(2L);
        assertThat(contactEmail1).isNotEqualTo(contactEmail2);
        contactEmail1.setId(null);
        assertThat(contactEmail1).isNotEqualTo(contactEmail2);
    }
}

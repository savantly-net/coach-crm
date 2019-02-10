package net.savantly.coach.web.rest;

import net.savantly.coach.CoachApp;

import net.savantly.coach.domain.ContactPhone;
import net.savantly.coach.repository.ContactPhoneRepository;
import net.savantly.coach.repository.search.ContactPhoneSearchRepository;
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
 * Test class for the ContactPhoneResource REST controller.
 *
 * @see ContactPhoneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CoachApp.class)
public class ContactPhoneResourceIntTest {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SMS = false;
    private static final Boolean UPDATED_SMS = true;

    @Autowired
    private ContactPhoneRepository contactPhoneRepository;

    /**
     * This repository is mocked in the net.savantly.coach.repository.search test package.
     *
     * @see net.savantly.coach.repository.search.ContactPhoneSearchRepositoryMockConfiguration
     */
    @Autowired
    private ContactPhoneSearchRepository mockContactPhoneSearchRepository;

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

    private MockMvc restContactPhoneMockMvc;

    private ContactPhone contactPhone;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactPhoneResource contactPhoneResource = new ContactPhoneResource(contactPhoneRepository, mockContactPhoneSearchRepository);
        this.restContactPhoneMockMvc = MockMvcBuilders.standaloneSetup(contactPhoneResource)
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
    public static ContactPhone createEntity(EntityManager em) {
        ContactPhone contactPhone = new ContactPhone()
            .number(DEFAULT_NUMBER)
            .sms(DEFAULT_SMS);
        return contactPhone;
    }

    @Before
    public void initTest() {
        contactPhone = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactPhone() throws Exception {
        int databaseSizeBeforeCreate = contactPhoneRepository.findAll().size();

        // Create the ContactPhone
        restContactPhoneMockMvc.perform(post("/api/contact-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPhone)))
            .andExpect(status().isCreated());

        // Validate the ContactPhone in the database
        List<ContactPhone> contactPhoneList = contactPhoneRepository.findAll();
        assertThat(contactPhoneList).hasSize(databaseSizeBeforeCreate + 1);
        ContactPhone testContactPhone = contactPhoneList.get(contactPhoneList.size() - 1);
        assertThat(testContactPhone.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testContactPhone.isSms()).isEqualTo(DEFAULT_SMS);

        // Validate the ContactPhone in Elasticsearch
        verify(mockContactPhoneSearchRepository, times(1)).save(testContactPhone);
    }

    @Test
    @Transactional
    public void createContactPhoneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactPhoneRepository.findAll().size();

        // Create the ContactPhone with an existing ID
        contactPhone.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactPhoneMockMvc.perform(post("/api/contact-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPhone)))
            .andExpect(status().isBadRequest());

        // Validate the ContactPhone in the database
        List<ContactPhone> contactPhoneList = contactPhoneRepository.findAll();
        assertThat(contactPhoneList).hasSize(databaseSizeBeforeCreate);

        // Validate the ContactPhone in Elasticsearch
        verify(mockContactPhoneSearchRepository, times(0)).save(contactPhone);
    }

    @Test
    @Transactional
    public void getAllContactPhones() throws Exception {
        // Initialize the database
        contactPhoneRepository.saveAndFlush(contactPhone);

        // Get all the contactPhoneList
        restContactPhoneMockMvc.perform(get("/api/contact-phones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactPhone.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].sms").value(hasItem(DEFAULT_SMS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getContactPhone() throws Exception {
        // Initialize the database
        contactPhoneRepository.saveAndFlush(contactPhone);

        // Get the contactPhone
        restContactPhoneMockMvc.perform(get("/api/contact-phones/{id}", contactPhone.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactPhone.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.sms").value(DEFAULT_SMS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingContactPhone() throws Exception {
        // Get the contactPhone
        restContactPhoneMockMvc.perform(get("/api/contact-phones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactPhone() throws Exception {
        // Initialize the database
        contactPhoneRepository.saveAndFlush(contactPhone);

        int databaseSizeBeforeUpdate = contactPhoneRepository.findAll().size();

        // Update the contactPhone
        ContactPhone updatedContactPhone = contactPhoneRepository.findById(contactPhone.getId()).get();
        // Disconnect from session so that the updates on updatedContactPhone are not directly saved in db
        em.detach(updatedContactPhone);
        updatedContactPhone
            .number(UPDATED_NUMBER)
            .sms(UPDATED_SMS);

        restContactPhoneMockMvc.perform(put("/api/contact-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactPhone)))
            .andExpect(status().isOk());

        // Validate the ContactPhone in the database
        List<ContactPhone> contactPhoneList = contactPhoneRepository.findAll();
        assertThat(contactPhoneList).hasSize(databaseSizeBeforeUpdate);
        ContactPhone testContactPhone = contactPhoneList.get(contactPhoneList.size() - 1);
        assertThat(testContactPhone.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testContactPhone.isSms()).isEqualTo(UPDATED_SMS);

        // Validate the ContactPhone in Elasticsearch
        verify(mockContactPhoneSearchRepository, times(1)).save(testContactPhone);
    }

    @Test
    @Transactional
    public void updateNonExistingContactPhone() throws Exception {
        int databaseSizeBeforeUpdate = contactPhoneRepository.findAll().size();

        // Create the ContactPhone

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactPhoneMockMvc.perform(put("/api/contact-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPhone)))
            .andExpect(status().isBadRequest());

        // Validate the ContactPhone in the database
        List<ContactPhone> contactPhoneList = contactPhoneRepository.findAll();
        assertThat(contactPhoneList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ContactPhone in Elasticsearch
        verify(mockContactPhoneSearchRepository, times(0)).save(contactPhone);
    }

    @Test
    @Transactional
    public void deleteContactPhone() throws Exception {
        // Initialize the database
        contactPhoneRepository.saveAndFlush(contactPhone);

        int databaseSizeBeforeDelete = contactPhoneRepository.findAll().size();

        // Delete the contactPhone
        restContactPhoneMockMvc.perform(delete("/api/contact-phones/{id}", contactPhone.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactPhone> contactPhoneList = contactPhoneRepository.findAll();
        assertThat(contactPhoneList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ContactPhone in Elasticsearch
        verify(mockContactPhoneSearchRepository, times(1)).deleteById(contactPhone.getId());
    }

    @Test
    @Transactional
    public void searchContactPhone() throws Exception {
        // Initialize the database
        contactPhoneRepository.saveAndFlush(contactPhone);
        when(mockContactPhoneSearchRepository.search(queryStringQuery("id:" + contactPhone.getId())))
            .thenReturn(Collections.singletonList(contactPhone));
        // Search the contactPhone
        restContactPhoneMockMvc.perform(get("/api/_search/contact-phones?query=id:" + contactPhone.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactPhone.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].sms").value(hasItem(DEFAULT_SMS.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactPhone.class);
        ContactPhone contactPhone1 = new ContactPhone();
        contactPhone1.setId(1L);
        ContactPhone contactPhone2 = new ContactPhone();
        contactPhone2.setId(contactPhone1.getId());
        assertThat(contactPhone1).isEqualTo(contactPhone2);
        contactPhone2.setId(2L);
        assertThat(contactPhone1).isNotEqualTo(contactPhone2);
        contactPhone1.setId(null);
        assertThat(contactPhone1).isNotEqualTo(contactPhone2);
    }
}
